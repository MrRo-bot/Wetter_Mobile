import React, { useState } from "react";
import { Dimensions, Text, useColorScheme, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { weatherStore } from "../../store/weatherStore";
import { unixConv } from "../../utils/math";

const UVChart = () => {
  let theme = useColorScheme();
  const { weather } = weatherStore();
  const [parentWidth, setParentWidth] = useState(
    Dimensions.get("window").width
  );

  const windData = Array.from({ length: 24 }, (_, i) => {
    return {
      value: weather?.hourly.uv_index[i],
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
          UV INDEX
        </Text>
      </View>

      <View onLayout={handleLayout}>
        <BarChart
          showGradient
          hideRules
          isAnimated
          adjustToWidth
          roundedTop
          roundedBottom
          width={parentWidth * 0.9}
          noOfSections={5}
          data={windData}
          gradientColor={"#1B6BB0"}
          frontColor={"#d559a220"}
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

export default UVChart;
