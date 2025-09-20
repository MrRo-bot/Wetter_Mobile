import useAqiData from "@/src/hooks/useAqiData";
import useWeatherData from "@/src/hooks/useWeatherData";
import { aqiStore } from "@/src/store/aqiStore";
import { locationStore } from "@/src/store/locationStore";
import { useSettingsStore } from "@/src/store/settingsStore";
import { weatherStore } from "@/src/store/weatherStore";
import { AQIType, ToastRef, WeatherDataType } from "@/src/types/types";
import {
  alertIcon,
  closestTimestamp,
  degConv,
  weatherCodeConv,
} from "@/src/utils/math";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

//notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
    priority: Notifications.AndroidNotificationPriority.HIGH,
  }),
});

//notification permissions
const configureNotifications = async () => {
  Platform.OS === "android" &&
    (await Notifications.setNotificationChannelAsync("weather-alerts", {
      name: "Weather Alerts",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    }));

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync({
        ios: { allowAlert: true, allowSound: true, allowBadge: false },
      });
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return "Enable notifications to receive weather alerts.";
    }

    return true;
  } else {
    return "Use a physical device for notifications.";
  }
};

//check if data is stale beyond 16 days or not
const isDataStale = async (timestamp: number): Promise<boolean> => {
  const firstDate = new Date(timestamp);
  const now = new Date();
  const daysDiff =
    (now.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysDiff > 16;
};

//notification for stale data
const scheduleStaleDataNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Weather and AQI Data Outdated",
      body: "Please open the app to refresh your weather forecast.",
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60,
    },
  });
};

//daily forecast alert at particular time
const scheduleDailyWeatherNotification = async (
  time: string,
  dailyNotification: boolean,
  weather: WeatherDataType
) => {
  const timestamp: string[] = time.split(":");

  if (await isDataStale(weather.generationtime_ms)) {
    await scheduleStaleDataNotification();
    await Notifications.cancelAllScheduledNotificationsAsync();
    return;
  }

  if (!dailyNotification) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    return;
  }

  const todayWeatherIndex = weather?.daily?.time.indexOf(
    closestTimestamp(
      new Date().toISOString().slice(0, 10),
      weather?.daily?.time
    )
  );

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${weatherCodeConv(weather.daily.weather_code[todayWeatherIndex])}, High: ${weather.daily.temperature_2m_max[todayWeatherIndex]}º - Low: ${weather.daily.temperature_2m_min[todayWeatherIndex]}º`,
      body: `Today - ${weatherCodeConv(weather.daily.weather_code[todayWeatherIndex])}, High ${weather.daily.temperature_2m_max[todayWeatherIndex]}º. Wind ${degConv(weather.daily.winddirection_10m_dominant[todayWeatherIndex])} at ${weather.daily.wind_speed_10m_max[todayWeatherIndex]} ${weather.daily_units?.wind_speed_10m_max === "kn" ? "knots" : weather.daily_units?.wind_speed_10m_max}. Chance of precipitation ${weather.daily.precipitation_probability_max[todayWeatherIndex]}%, ${weather.daily.precipitation_sum[todayWeatherIndex]}${weather.daily_units?.precipitation_sum}.`,
      sound: "default",
      vibrate: [0, 250, 250, 250],
      data: {
        screen: "WeatherDailyDetails",
        date: timestamp[0] + ":" + timestamp[1],
        condition: weatherCodeConv(
          weather.daily.weather_code[todayWeatherIndex]
        ),
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      channelId: Platform.OS === "android" ? "weather-alerts" : undefined,
      hour: +timestamp[0],
      minute: +timestamp[1],
    },
  });
};

//weather alert based notification
const scheduleSevereWeatherAlerts = async (weather: WeatherDataType) => {
  if (await isDataStale(weather.generationtime_ms)) {
    await scheduleStaleDataNotification();
    return;
  }

  const todayAlerts = weather?.hourly?.time
    .map((timestamp, index) => {
      const date = timestamp.split("T")[0];
      const weatherCode = weather.hourly.weather_code[index];
      if (
        date === new Date().toISOString().split("T")[0] &&
        alertIcon(weatherCode) === "alert"
      ) {
        return { timestamp, weatherCode, index };
      }
      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const limitedAlerts = todayAlerts.slice(0, 50);

  limitedAlerts.map(async (al) => {
    const weatherDateTime = new Date(
      `${al.timestamp.split("T")[0]}T${al.timestamp.split("T")[1]}:00`
    );
    if (weatherDateTime > new Date()) {
      const locationStoreObj = locationStore();
      const locationName =
        locationStoreObj
          ?.getLocationById(locationStoreObj?.locationToShow)
          ?.geoAddress[0]?.city?.toUpperCase() ??
        locationStoreObj
          ?.getLocationById(locationStoreObj?.locationToShow)
          ?.geoAddress[0]?.street?.toUpperCase() ??
        locationStoreObj
          ?.getLocationById(locationStoreObj?.locationToShow)
          ?.geoAddress[0]?.district?.toUpperCase() ??
        locationStoreObj
          ?.getLocationById(locationStoreObj?.locationToShow)
          ?.geoAddress[0]?.name?.toUpperCase() ??
        locationStoreObj
          ?.getLocationById(locationStoreObj?.locationToShow)
          ?.geoAddress[0]?.subregion?.toUpperCase() ??
        "Unknown Location";

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `⚠️ SEVERE ALERTS FOR ${locationName}`,
          body: `${weatherCodeConv(al.weatherCode)} possible at ${al.timestamp.split("T")[1]}, probability ${weather.hourly.precipitation_probability[al.index]}%`,
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.MAX,
          data: {
            screen: "WeatherAlertDetails",
            date: al.timestamp.split("T")[0],
            condition: weatherCodeConv(al.weatherCode),
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: weatherDateTime,
          channelId: Platform.OS === "android" ? "weather-alerts" : undefined,
        },
      });
    }
  });
};

//aqi alert based notification
const scheduleSevereAqiAlerts = async (aqi: AQIType) => {
  if (await isDataStale(aqi.generationtime_ms)) {
    await scheduleStaleDataNotification();
    return;
  }

  const todayAlerts = aqi?.hourly?.time
    .map((timestamp, index) => {
      const date = timestamp.split("T")[0];
      const aqiCode = aqi.hourly.us_aqi[index];
      if (date === new Date().toISOString().split("T")[0] && aqiCode > 100) {
        return { timestamp, aqiCode, index };
      }
      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const limitedAlerts = todayAlerts.slice(0, 50);

  limitedAlerts.map(async (al) => {
    const aqiDate = new Date(
      `${al.timestamp.split("T")[0]}T${al.timestamp.split("T")[1]}:00`
    );
    if (aqiDate > new Date()) {
      const locationStoreObj = locationStore();
      const locationName =
        locationStoreObj
          ?.getLocationById(locationStoreObj?.locationToShow)
          ?.geoAddress[0]?.city?.toUpperCase() ??
        locationStoreObj
          ?.getLocationById(locationStoreObj?.locationToShow)
          ?.geoAddress[0]?.street?.toUpperCase() ??
        locationStoreObj
          ?.getLocationById(locationStoreObj?.locationToShow)
          ?.geoAddress[0]?.district?.toUpperCase() ??
        locationStoreObj
          ?.getLocationById(locationStoreObj?.locationToShow)
          ?.geoAddress[0]?.name?.toUpperCase() ??
        locationStoreObj
          ?.getLocationById(locationStoreObj?.locationToShow)
          ?.geoAddress[0]?.subregion?.toUpperCase() ??
        "Unknown Location";

      await Notifications.scheduleNotificationAsync({
        content: {
          title:
            al.aqiCode >= 100
              ? `⚠️ Caution for ${locationName}: Sensitive Groups`
              : al.aqiCode >= 150
                ? `🚨 Poor Air in ${locationName}: Take Cover`
                : al.aqiCode >= 200 && al.aqiCode <= 300
                  ? `🔴 Emergency AQI levels for ${locationName}: Air Alert`
                  : `🛑 Extreme AQI levels for ${locationName}: Danger`,
          body:
            al.aqiCode >= 100
              ? `AQI ${al.aqiCode} – Unhealthy for kids, elderly, or those with asthma. Stay indoors during peak hours. Use air purifiers.`
              : al.aqiCode >= 150
                ? `AQI ${al.aqiCode} - Everyone at risk. Avoid outdoors; wear N95 masks if outside. Check updates hourly`
                : al.aqiCode >= 200 && al.aqiCode <= 300
                  ? `AQI ${al.aqiCode} – Severe pollution. Stay inside, seal windows, and use HEPA filters. Seek medical help if symptoms worsen.`
                  : `AQI ${al.aqiCode} – Life-threatening levels. Evacuate if possible; all should remain indoors. Monitor official warnings.`,
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.MAX,
          data: {
            screen: "AQIAlertDetails",
            date: al.timestamp.split("T")[0],
            condition: al.aqiCode,
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: aqiDate,
          channelId: Platform.OS === "android" ? "weather-alerts" : undefined,
        },
      });
    }
  });
};

//notification component
const NotificationSetup = () => {
  const toastRef = useRef<ToastRef>(null);

  const locationStoreObj = locationStore();
  const { weather } = weatherStore();
  const { aqi } = aqiStore();
  const { alerts } = useSettingsStore();

  const currentLocObj = locationStoreObj?.getLocationById(
    locationStoreObj?.locationToShow
  )?.locationCoords.coords ??
    locationStoreObj?.locations[0]?.locationCoords.coords ?? {
      latitude: 0,
      longitude: 0,
    };

  const { isLoading: weatherLoading, refetch: weatherRefetch } =
    useWeatherData(currentLocObj);

  const { isLoading: aqiLoading, refetch: aqiRefetch } =
    useAqiData(currentLocObj);

  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const notificationListener = useRef<Notifications.EventSubscription>(null);
  const responseListener = useRef<Notifications.EventSubscription>(null);

  useEffect(() => {
    configureNotifications()
      .then((granted) => {
        if (granted) {
          !weatherLoading &&
            weather &&
            alerts.dailyNotification &&
            scheduleDailyWeatherNotification(
              alerts.time,
              alerts.dailyNotification,
              weather
            );
          !weatherLoading && weather && scheduleSevereWeatherAlerts(weather);

          !aqiLoading && aqi && scheduleSevereAqiAlerts(aqi);
        }
      })
      .catch((error) => {
        toastRef.current?.show({
          type: "error",
          description: `${error} 😭`,
          accessibilityLiveRegion: "assertive",
        });
      });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((nf) => {
        setNotification(nf);
        console.log("Notification received:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification tapped:", response);
        weatherRefetch();
        aqiRefetch();
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [weather, aqi, alerts]);

  return null;
};

export default NotificationSetup;
