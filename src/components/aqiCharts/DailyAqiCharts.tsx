import { aqiStore } from "@/src/store/aqiStore";
import { AQIHourlyType } from "@/src/types/types";

import React from "react";
import { Text, useColorScheme, View } from "react-native";
import DailyAQI from "./charts/DailyAQI";

const DailyAqiCharts = () => {
  let theme = useColorScheme();
  const { aqi } = aqiStore();

  const aqiForecast: AQIHourlyType[] = [];

  for (let i = 1; i <= 5; i++) {
    const start = (i - 1) * 24;
    const end = i * 24;
    aqiForecast.push({
      us_aqi: aqi?.hourly?.us_aqi?.slice(start, end),
      carbon_monoxide: aqi?.hourly?.carbon_monoxide?.slice(start, end),
      nitrogen_dioxide: aqi?.hourly?.nitrogen_dioxide?.slice(start, end),
      ozone: aqi?.hourly?.ozone?.slice(start, end),
      pm10: aqi?.hourly?.pm10?.slice(start, end),
      pm2_5: aqi?.hourly?.pm2_5?.slice(start, end),
      sulphur_dioxide: aqi?.hourly?.sulphur_dioxide?.slice(start, end),
      time: aqi?.hourly?.time?.slice(start, end),
    });
  }

  return (
    <View className="flex gap-8 pt-5">
      <Text
        className={`font-orbitron-bold text-xl ${theme === "dark" ? "text-light" : "text-dark"}`}
      >
        Daily AQI Data
      </Text>
      <DailyAQI aqiForecast={aqiForecast} name="AQI" aqiParameter="us_aqi" />
      <DailyAQI aqiForecast={aqiForecast} name="PM10" aqiParameter="pm10" />
      <DailyAQI aqiForecast={aqiForecast} name="pm2.5" aqiParameter="pm2_5" />
      <DailyAQI aqiForecast={aqiForecast} name="O3" aqiParameter="ozone" />
      <DailyAQI
        aqiForecast={aqiForecast}
        name="SO2"
        aqiParameter="sulphur_dioxide"
      />
      <DailyAQI
        aqiForecast={aqiForecast}
        name="NO2"
        aqiParameter="nitrogen_dioxide"
      />
      <DailyAQI
        aqiForecast={aqiForecast}
        name="CO"
        aqiParameter="carbon_monoxide"
      />
    </View>
  );
};

export default DailyAqiCharts;
