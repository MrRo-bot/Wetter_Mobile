import { useSettingsStore } from "@/src/store/settingsStore";
import { AQIHourlyType, DailyAQIProps } from "@/src/types/types";
import { aqiDetailColors, unixConv } from "@/src/utils/math";
import React, { useState } from "react";
import { Dimensions, Text, useColorScheme, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const DailyAQI = ({ aqiForecast, aqiParameter, name }: DailyAQIProps) => {
  let theme = useColorScheme();

  const { units: unitSettings } = useSettingsStore();

  const [parentWidth, setParentWidth] = useState(
    Dimensions.get("window").width
  );

  const aqiChartData = Array.from({ length: 5 }, (_, index) => {
    const aqiDay = aqiForecast[index];
    const aqiDayObj = (
      aqiDay[aqiParameter as keyof AQIHourlyType] as number[]
    ).filter((x: null | number) => x !== null);

    return {
      stacks: [
        {
          value: Math.min(...aqiDayObj),
          color: "#ffffff00",
        },
        {
          value: Math.max(...aqiDayObj) - Math.min(...aqiDayObj),
          color: aqiDetailColors({
            title: aqiParameter,
            value: Math.max(...aqiDayObj),
          }).bgColor,
        },
      ],
      label: unixConv
        ?.timeStamp(
          new Date(aqiDay?.time[index]).getTime() / 1000,
          unitSettings.time
        )
        .day.slice(0, 3),
    };
  });

  const handleLayout = (event: { nativeEvent: { layout: { width: any } } }) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };

  return (
    <>
      <View
        accessible={true}
        accessibilityLabel={`Daily ${name} chart`}
        accessibilityRole="image"
        className="p-2"
        onLayout={handleLayout}
      >
        <BarChart
          hideRules
          adjustToWidth
          height={150}
          barWidth={10}
          noOfSections={5}
          spacing={parentWidth / 8}
          width={parentWidth * 0.9}
          stackData={aqiChartData}
          barBorderRadius={8}
          yAxisThickness={0}
          yAxisColor={theme === "dark" ? "gray" : "black"}
          yAxisLabelWidth={parentWidth * 0.09}
          yAxisTextStyle={{
            color: theme === "dark" ? "gray" : "black",
            fontSize: 12,
          }}
          xAxisThickness={0}
          xAxisColor={theme === "dark" ? "gray" : "black"}
          xAxisLabelTextStyle={{
            color: theme === "dark" ? "azure" : "black",
            fontSize: 12,
            left: -7,
          }}
        />
      </View>
      <Text
        className={`text-right py-2 pr-2 uppercase w-max leading-none font-orbitron-bold ${theme === "dark" ? "text-slate-200" : "text-slate-900"}`}
      >
        {name}
      </Text>
    </>
  );
};

export default DailyAQI;
