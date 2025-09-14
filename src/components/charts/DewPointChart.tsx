import React, { useState } from "react";
import { Dimensions, Text, useColorScheme, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { weatherStore } from "../../store/weatherStore";
import { unixConv } from "../../utils/math";

const DewPointChart = () => {
  let theme = useColorScheme();

  const [parentWidth, setParentWidth] = useState(
    Dimensions.get("window").width
  );

  const { weather } = weatherStore();

  const dewPointData = Array.from({ length: 24 }, (_, index) => {
    return {
      value: weather?.hourly?.dew_point_2m[index],
      label:
        (index + 1) % 4 === 0
          ? unixConv?.timeStamp(
              new Date(weather?.hourly?.time[index]).getTime() / 1000
            ).hour2
          : "",
    };
  });

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
          DEW POINT (°)
        </Text>
      </View>

      <View
        accessible={true}
        accessibilityLabel="Hourly dew point chart"
        accessibilityRole="image"
        onLayout={handleLayout}
      >
        <BarChart
          hideRules
          isAnimated
          adjustToWidth
          cappedBars
          data={dewPointData}
          barWidth={35}
          capColor={theme === "dark" ? "rgb(178,65,105)" : "rgb(78, 0, 142)"}
          capThickness={4}
          frontColor={
            theme === "dark" ? "rgba(178, 65, 105,0.4)" : "rgba(78,0,142,0.2)"
          }
          width={parentWidth * 0.9}
          noOfSections={5}
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
          }}
        />
      </View>
    </View>
  );
};

export default DewPointChart;
