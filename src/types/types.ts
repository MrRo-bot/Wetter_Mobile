import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { LocationGeocodedAddress, LocationObject } from "expo-location";
import { RefObject } from "react";
import {
  ColorSchemeName,
  GestureResponderEvent,
  ImageSourcePropType,
} from "react-native";
import { ImageColorsResult } from "react-native-image-colors";

export interface LocationDataType {
  id: string;
  locationCoords: LocationObject;
  geoAddress: LocationGeocodedAddress[];
}

export interface LocationStoreType {
  locations: LocationDataType[];
  locationToShow: string;
  addLocation: (location: LocationDataType) => void;
  removeLocation: (locationId: string) => void;
  addLocationToShow: (locationId: string) => void;
  updateLocationName: (locationId: string, name: any) => void;
  getLocationById: (locationId: string) => LocationDataType | undefined;
}

export interface LocationSearchItemType {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: number[];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
}
export interface LocationSearchType {
  results: LocationSearchItemType[];
  generationtime_ms: number;
}

export interface WeatherStoreType {
  weather: WeatherDataType;
  addWeather: (weatherData: WeatherDataType) => void;
}

export interface AqiStoreType {
  aqi: AQIType;
  addAQI: (aqiData: AQIType) => void;
}

export interface MainButtonType {
  onPressFunc: null | ((event: GestureResponderEvent) => void) | undefined;
  buttonText: string;
  darkColor: string;
  lightColor: string;
  theme: ColorSchemeName;
  darkBgColor: string;
  lightBgColor: string;
  accessibilityLabel: string;
  accessibilityHint: string;
}

export interface WeatherDataType {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: "iso8601";
    interval: "seconds";
    temperature_2m: "°C" | "" | "°F";
    apparent_temperature: "°C" | "" | "°F";
    relative_humidity_2m: "%";
    is_day: "0" | "" | "1";
    weather_code: "wmo code";
    surface_pressure: "hPa";
    precipitation: "mm" | "" | "inch";
    rain: "mm" | "" | "inch";
    showers: "mm" | "" | "inch";
    snowfall: "cm" | "" | "inch";
    wind_speed_10m: "km/h" | "" | "kn" | "" | "mp/h" | "" | "m/s";
    wind_gusts_10m: "km/h" | "" | "kn" | "" | "mp/h" | "" | "m/s";
    wind_direction_10m: "°";
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    weather_code: number;
    surface_pressure: number;
    precipitation: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
    wind_direction_10m: number;
  };
  hourly_units: {
    is_day: "0" | "" | "1";
    time: "iso8601";
    dew_point_2m: "°C" | "" | "°F";
    precipitation_probability: "%";
    precipitation: "mm" | "" | "inch";
    visibility: "m";
    uv_index: "";
    temperature_2m: "°C" | "" | "°F";
    relative_humidity_2m: "%";
    apparent_temperature: "°C" | "" | "°F";
    weather_code: "wmo code";
    surface_pressure: "hPa";
    cloud_cover: "%";
    wind_speed_10m: "km/h" | "" | "kn" | "" | "mp/h" | "" | "m/s";
    wind_direction_10m: "°";
    wind_gusts_10m: "km/h" | "" | "kn" | "" | "mp/h" | "" | "m/s";
    soil_temperature_0cm: "°C" | "" | "°F";
    sunshine_duration: "s";
    direct_normal_irradiance: "W/m²";
  };
  hourly: {
    time: string[];
    is_day: [];
    dew_point_2m: number[];
    precipitation_probability: number[];
    precipitation: number[];
    visibility: number[];
    uv_index: number[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    weather_code: number[];
    surface_pressure: number[];
    cloud_cover: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    wind_gusts_10m: number[];
    soil_temperature_0cm: number[];
    sunshine_duration: number[];
    direct_normal_irradiance: number[];
  };
  daily_units: {
    time: "iso8601";
    weather_code: "wmo code";
    temperature_2m_max: "°C" | "" | "°F";
    temperature_2m_min: "°C" | "" | "°F";
    precipitation_sum: "mm" | "" | "inch";
    precipitation_hours: "h";
    precipitation_probability_max: "%";
    sunrise: "iso8601";
    sunset: "iso8601";
    sunshine_duration: "s";
    daylight_duration: "s";
    uv_index_max: "";
    winddirection_10m_dominant: "°";
    wind_speed_10m_max: "km/h" | "" | "mp/h" | "" | "kn" | "" | "m/s";
    wind_gusts_10m_max: "km/h" | "" | "mp/h" | "" | "kn" | "" | "m/s";
    shortwave_radiation_sum: "MJ/m²";
    dew_point_2m_mean: "°C" | "" | "°F";
    surface_pressure_mean: "hPa";
  };
  daily: {
    winddirection_10m_dominant: number[];
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_hours: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
    sunshine_duration: number[];
    daylight_duration: number[];
    uv_index_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    shortwave_radiation_sum: number[];
    dew_point_2m_mean: number[];
    surface_pressure_mean: number[];
  };
}

export interface AQIHourlyType {
  us_aqi: number[];
  time: string[];
  pm10: number[];
  pm2_5: number[];
  ozone: number[];
  sulphur_dioxide: number[];
  nitrogen_dioxide: number[];
  carbon_monoxide: number[];
}

export interface AQIType {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: "iso8601";
    interval: "seconds";
    pm10: "μg/m³";
    pm2_5: "μg/m³";
    carbon_monoxide: "μg/m³";
    nitrogen_dioxide: "μg/m³";
    sulphur_dioxide: "μg/m³";
    ozone: "μg/m³";
    us_aqi: "USAQI";
  };
  current: {
    time: string;
    interval: number;
    pm10: number;
    pm2_5: number;
    carbon_monoxide: number;
    nitrogen_dioxide: number;
    sulphur_dioxide: number;
    ozone: number;
    us_aqi: number;
  };
  hourly_units: {
    us_aqi: "USAQI";
    time: "iso8601";
    pm10: "μg/m³";
    pm2_5: "μg/m³";
    ozone: "μg/m³";
    sulphur_dioxide: "μg/m³";
    nitrogen_dioxide: "μg/m³";
    carbon_monoxide: "μg/m³";
  };
  hourly: AQIHourlyType;
}

export interface UnsplashType {
  total: number;
  total_pages: number;
  results: {
    id: string;
    created_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    likes: number;
    liked_by_user: boolean;
    description: string | null;
    user: {
      id: string;
      username: string;
      name: string;
      first_name: string;
      last_name?: string;
      instagram_username?: string;
      twitter_username?: string;
      portfolio_url?: string;
      profile_image: {
        small: string;
        medium: string;
        large: string;
      };
      links: {
        self: string;
        html: string;
        photos: string;
        likes: string;
      };
    };
    current_user_collections: any[];
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
    links: {
      self: string;
      html: string;
      download: string;
    };
  }[];
}

export interface HourlyWeatherObjectType {
  id: number;
  currentTemp: string;
  weatherIcon: string[] | string;
  weatherCode: number;
  weatherMain: string;
  windSpeed: string;
  wind: string;
  windDirection: number;
  hourStamp: string;
  precipitationAmount?: string;
  soilTemp?: string;
  radiation?: string;
  precipitation?: string;
  visibility?: string;
  uvIndex?: string;
  pressure?: string;
  feels_like?: string;
  gust?: string;
  clouds?: string;
  humidity?: string;
  dewPoint?: string;
  is_day?: number;
}

export interface DailyWeatherObjectType {
  id: number;
  maxTemp: string;
  minTemp: string;
  precipitation: string;
  weatherCode: number;
  weatherIcon: string[] | string;
  windSpeed: string;
  windDirection: number;
  dateStamp: string;
  sunrise: string;
  sunset: string;
  summary: string;
  weatherMain: string;
  hourStamp: string;
  surfacePressure?: string;
  daylightDuration?: string;
  shortwaveRadiation?: string;
  uvIndex?: string;
}

export interface WeatherIconsType {
  alert: ImageSourcePropType;
  aqi_meter: ImageSourcePropType;
  blades: ImageSourcePropType;
  direction: ImageSourcePropType;
  hot_alert: ImageSourcePropType;
  intro: ImageSourcePropType;
  location: ImageSourcePropType;
  search: ImageSourcePropType;
  wind_mill: ImageSourcePropType;
  clock: ImageSourcePropType;
  dew_point: ImageSourcePropType;
  humidity: ImageSourcePropType;
  pressure: ImageSourcePropType;
  sunrise: ImageSourcePropType;
  sunset: ImageSourcePropType;
  thermometer: ImageSourcePropType;
  uv: ImageSourcePropType;
  visibility: ImageSourcePropType;
  clear_day: ImageSourcePropType;
  clear_night: ImageSourcePropType;
  partly_cloudy_day: ImageSourcePropType;
  partly_cloudy_night: ImageSourcePropType;
  overcast: ImageSourcePropType;
  fog: ImageSourcePropType;
  moderate_drizzle: ImageSourcePropType;
  dense_drizzle: ImageSourcePropType;
  freezing_drizzle: ImageSourcePropType;
  slight_rain: ImageSourcePropType;
  moderate_rain: ImageSourcePropType;
  heavy_rain: ImageSourcePropType;
  slight_snow: ImageSourcePropType;
  moderate_snow: ImageSourcePropType;
  heavy_snow: ImageSourcePropType;
  thunderstorm: ImageSourcePropType;
  slight_thunder_with_hail: ImageSourcePropType;
  heavy_thunder_with_hail: ImageSourcePropType;
  toast_icon_dark: ImageSourcePropType;
  toast_icon_light: ImageSourcePropType;
  default: ImageSourcePropType;
}

export type ToastType = "success" | "error" | "pending";

export interface ToastConfig {
  accessibilityLiveRegion?: "none" | "polite" | "assertive" | undefined;
  id: string;
  isVisible: boolean;
  type: ToastType;
  text?: string;
  description?: string;
  timeout?: number;
}

export interface ShowToastParams {
  type: ToastType;
  text?: string;
  description?: string;
  timeout?: number | 4000;
  accessibilityLiveRegion?: "none" | "polite" | "assertive" | undefined;
}

export interface ToastRef {
  show: (params: ShowToastParams) => void;
}

export interface BriefType {
  weatherRefetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<WeatherDataType, Error>>;
  lastUpdated: number;
  toast: RefObject<ToastRef | null>;
  queryStatus: "fetching" | "idle" | "paused";
  error: Error | null;
  imageColorsLoading: boolean;
  imageColorsData:
    | {
        imageIndex: number;
        url: string;
        imageColors: ImageColorsResult;
      }
    | undefined;
  unsplashLoading: boolean;
}

export interface UnitOptionsType {
  name: string;
  key: keyof UnitSettingType;
  options: {
    label: string;
    value: string;
  }[];
}

export interface UnitSettingType {
  time: "12-hour" | "24-hour";
  temperature: "fahrenheit" | "celsius";
  distance: "km" | "mi";
  speed: "kmh" | "mph" | "ms" | "kn";
  pressure: "mBar" | "inHg" | "hPa" | "bar" | "mmHg" | "psi";
  precipitation: "mm" | "in";
}

export interface AlertsType {
  weatherAlerts: {
    severe: boolean;
    advisory: boolean;
  };
  rainAndSnow: boolean;
  chanceOfPrecipitation: string;
  aqi: string;
  dailyNotification: boolean;
  time: string;
}

export interface SettingsStateType {
  units: UnitSettingType;
  alerts: AlertsType;
  updateFreq: string;
  setUnits: (key: string, value: string) => void;
  setWeatherAlert: (type: "severe" | "advisory") => void;
  toggleRainAndSnow: () => void;
  setChanceOfPrecipitation: (value: string) => void;
  setAQI: (value: string) => void;
  toggleDailyNotification: () => void;
  setTime: (value: string) => void;
  setUpdateFreq: (updateFreq: string) => void;
}

export interface AqiColorsType {
  green: string;
  yellow: string;
  orange: string;
  red: string;
  purple: string;
  maroon: string;
  default: string;
  [key: string]: string;
}

export interface LocationParamsType {
  name: string;
  count: string;
  language: "en" | "de" | "fr" | "es" | "it" | "pt" | "ru" | "tr" | "hi";
  format: "json" | "photobuf";
  // countryCode:string;
  [key: string]: string;
}

export interface DailyAQIProps {
  aqiForecast: AQIHourlyType[];
  aqiParameter: string;
  name: string;
}

export interface HourlyAQIType {
  aqiForecast: number[];
  timestamp: string[];
  name: string;
  isCurved?: boolean;
  color: string;
}
