import { aqiStore } from "@/src/store/aqiStore";
import { AQIHourlyType } from "@/src/types/types";
import { closestTimestamp } from "@/src/utils/math";
import React from "react";
import { Text, useColorScheme, View } from "react-native";
import HourlyAQI from "./charts/HourlyAQI";

const HourlyAqiCharts = () => {
  let theme = useColorScheme();

  const { aqi } = aqiStore();

  const currentTimeIndex = aqi?.hourly?.time.indexOf(
    aqi?.current?.time &&
      closestTimestamp(aqi?.current?.time, aqi?.hourly?.time)
  );

  const aqiForecast: AQIHourlyType = {
    us_aqi: aqi?.hourly?.us_aqi?.slice(currentTimeIndex, currentTimeIndex + 24),
    carbon_monoxide: aqi?.hourly?.carbon_monoxide?.slice(
      currentTimeIndex,
      currentTimeIndex + 24
    ),
    nitrogen_dioxide: aqi?.hourly?.nitrogen_dioxide?.slice(
      currentTimeIndex,
      currentTimeIndex + 24
    ),
    ozone: aqi?.hourly?.ozone?.slice(currentTimeIndex, currentTimeIndex + 24),
    pm10: aqi?.hourly?.pm10?.slice(currentTimeIndex, currentTimeIndex + 24),
    pm2_5: aqi?.hourly?.pm2_5?.slice(currentTimeIndex, currentTimeIndex + 24),
    sulphur_dioxide: aqi?.hourly?.sulphur_dioxide?.slice(
      currentTimeIndex,
      currentTimeIndex + 24
    ),
    time: aqi?.hourly?.time?.slice(currentTimeIndex, currentTimeIndex + 24),
  };

  return (
    <View className="flex gap-8">
      <Text
        className={`font-orbitron-bold my-6 text-xl ${theme === "dark" ? "text-light" : "text-dark"}`}
      >
        Hourly AQI Data
      </Text>
      <HourlyAQI
        aqiForecast={aqiForecast?.us_aqi}
        timestamp={aqiForecast?.time}
        name="AQI"
        color="#7ed0f1"
      />
      <HourlyAQI
        aqiForecast={aqiForecast?.pm10}
        timestamp={aqiForecast?.time}
        name="PM10"
        color="#f17e8c"
        isCurved={true}
      />
      <HourlyAQI
        aqiForecast={aqiForecast?.pm2_5}
        timestamp={aqiForecast?.time}
        name="pm2.5"
        color="#ae7ef1"
      />
      <HourlyAQI
        aqiForecast={aqiForecast?.ozone}
        timestamp={aqiForecast?.time}
        name="O3"
        color="#f19d7e"
        isCurved={true}
      />
      <HourlyAQI
        aqiForecast={aqiForecast?.sulphur_dioxide}
        timestamp={aqiForecast?.time}
        name="SO2"
        color="#7ea1f1"
      />
      <HourlyAQI
        aqiForecast={aqiForecast?.nitrogen_dioxide}
        timestamp={aqiForecast?.time}
        name="NO2"
        color="#cbf17e"
        isCurved={true}
      />
      <HourlyAQI
        aqiForecast={aqiForecast?.carbon_monoxide}
        timestamp={aqiForecast?.time}
        name="CO"
        color="#b0303f"
      />
    </View>
  );
};

export default HourlyAqiCharts;
