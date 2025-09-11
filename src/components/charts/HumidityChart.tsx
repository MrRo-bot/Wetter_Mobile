import React, { useState } from "react";
import { Dimensions, Text, useColorScheme, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { weatherStore } from "../../store/weatherStore";
import { unixConv } from "../../utils/math";

const HumidityChart = () => {
  let theme = useColorScheme();

  const [parentWidth, setParentWidth] = useState(
    Dimensions.get("window").width
  );

  const { weather } = weatherStore();

  const humidityData = Array.from({ length: 24 }, (_, i) => {
    return {
      value: weather?.hourly?.relative_humidity_2m[i],
      label:
        (i + 1) % 4 === 0
          ? unixConv?.timeStamp(
              new Date(weather?.hourly?.time[i]).getTime() / 1000
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
          HUMIDITY (%)
        </Text>
      </View>

      <View
        accessible={true}
        accessibilityLabel="Hourly humidity chart"
        accessibilityRole="image"
        onLayout={handleLayout}
      >
        <BarChart
          hideRules
          isAnimated
          adjustToWidth
          width={parentWidth * 0.9}
          noOfSections={5}
          data={humidityData}
          frontColor={theme === "dark" ? "#b0303f" : "#ff8b39"}
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

export default HumidityChart;
