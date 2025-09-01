import React, { useState } from "react";
import { Dimensions, Text, useColorScheme, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { LinearGradient, Stop } from "react-native-svg";
import { weatherStore } from "../../store/weatherStore";
import { unixConv } from "../../utils/math";

const WindChart = () => {
  let theme = useColorScheme();
  const { weather } = weatherStore();
  const [parentWidth, setParentWidth] = useState(
    Dimensions.get("window").width
  );

  const windData = Array.from({ length: 24 }, (_, i) => {
    return {
      value: weather?.hourly.wind_speed_10m[i],
      label:
        (i + 1) % 4 === 0
          ? unixConv?.timeStamp(
              new Date(weather?.hourly.time[i]).getTime() / 1000
            ).hour2
          : "",
    };
  });

  // Handle layout changes to update container width
  const handleLayout = (event: { nativeEvent: { layout: { width: any } } }) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };
  return (
    <View className="gap-4">
      <View className="pl-2">
        <Text
          className={`font-orbitron-bold  leading-none text-lg ${theme === "dark" ? "text-light" : "text-dark"}`}
        >
          WIND (KM/H)
        </Text>
      </View>

      <View onLayout={handleLayout}>
        <LineChart
          areaChart
          curved
          isAnimated
          hideDataPoints
          hideRules
          adjustToWidth
          lineGradient
          startFillColor={"rgb(84,219,234)"}
          endFillColor={"rgb(84,219,234)"}
          thickness={theme === "dark" ? 2 : 3}
          startOpacity={0.7}
          endOpacity={0.1}
          lineGradientId="windGradient"
          lineGradientComponent={() => {
            return (
              <LinearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={"red"} />
                <Stop offset="0.5" stopColor={"orange"} />
                <Stop offset="1" stopColor={"green"} />
              </LinearGradient>
            );
          }}
          initialSpacing={0}
          width={parentWidth * 0.9}
          noOfSections={5}
          data={windData}
          yAxisColor={theme === "dark" ? "gray" : "black"}
          yAxisLabelWidth={parentWidth * 0.09}
          yAxisTextStyle={{
            color: theme === "dark" ? "gray" : "black",
            fontSize: 12,
          }}
          xAxisColor={theme === "dark" ? "gray" : "black"}
          xAxisLabelTextStyle={{
            color: theme === "dark" ? "gray" : "black",
            fontSize: parentWidth * 0.025,
            width: 30,
          }}
        />
      </View>
    </View>
  );
};

export default WindChart;
