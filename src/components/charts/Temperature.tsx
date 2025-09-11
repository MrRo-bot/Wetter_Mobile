import React, { useState } from "react";
import { Dimensions, Text, useColorScheme, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { LinearGradient, Stop } from "react-native-svg";
import { weatherStore } from "../../store/weatherStore";
import { unixConv } from "../../utils/math";

const Temperature = () => {
  let theme = useColorScheme();

  const [parentWidth, setParentWidth] = useState(
    Dimensions.get("window").width
  );

  const { weather } = weatherStore();

  const windData = Array.from({ length: 24 }, (_, i) => {
    return {
      value: weather?.hourly?.temperature_2m[i],
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
          TEMPERATURE (C)
        </Text>
      </View>

      <View
        accessible={true}
        accessibilityLabel="Hourly temperature chart"
        accessibilityRole="image"
        onLayout={handleLayout}
      >
        <LineChart
          curved
          isAnimated
          hideDataPoints
          hideRules
          adjustToWidth
          lineGradient
          lineGradientId="windGradient"
          lineGradientComponent={() => {
            return (
              <LinearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={"red"} />
                <Stop offset="0.25" stopColor={"orange"} />
                <Stop offset="0.5" stopColor={"yellow"} />
                <Stop offset="0.75" stopColor={"green"} />
                <Stop offset="1" stopColor={"lime"} />
              </LinearGradient>
            );
          }}
          initialSpacing={0}
          width={parentWidth * 0.85}
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

export default Temperature;
