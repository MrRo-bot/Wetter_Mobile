import { unixConv } from "@/src/utils/math";
import React, { useState } from "react";
import { Dimensions, Text, useColorScheme, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface HourlyAQIType {
  aqiForecast: number[];
  timestamp: string[];
  name: string;
  isCurved?: boolean;
  color: string;
}

const HourlyAQI = ({
  aqiForecast,
  timestamp,
  name,
  isCurved,
  color,
}: HourlyAQIType) => {
  let theme = useColorScheme();

  const [parentWidth, setParentWidth] = useState(
    Dimensions.get("window").width
  );

  const aqiHourlyData = aqiForecast.map((dataPoint: number, index: number) => ({
    value: dataPoint,
    label:
      (index + 1) % 2 === 0
        ? unixConv?.timeStamp(new Date(timestamp[index]).getTime() / 1000).hour2
        : "",
  }));

  const handleLayout = (event: { nativeEvent: { layout: { width: any } } }) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };

  return (
    <>
      <View className="p-2" onLayout={handleLayout}>
        <LineChart
          areaChart
          curved={isCurved}
          isAnimated
          adjustToWidth
          animateOnDataChange
          hideDataPoints
          hideRules
          data={aqiHourlyData}
          height={150}
          width={parentWidth * 0.86}
          spacing={parentWidth / 10}
          thickness={5}
          startFillColor={color}
          startOpacity={1}
          endOpacity={0.3}
          initialSpacing={0}
          noOfSections={5}
          showVerticalLines
          verticalLinesColor={`${color}50`}
          color={color}
          yAxisColor={color}
          yAxisTextStyle={{
            color: theme === "dark" ? "gray" : "black",
          }}
          xAxisColor={color}
          xAxisLabelTextStyle={{
            color: theme === "dark" ? "gray" : "black",
            fontSize: parentWidth * 0.03,
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

export default HourlyAQI;
