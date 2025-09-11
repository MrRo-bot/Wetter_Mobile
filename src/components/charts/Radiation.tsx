import React, { useState } from "react";
import { Dimensions, Text, useColorScheme, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { LinearGradient, Stop } from "react-native-svg";
import { weatherStore } from "../../store/weatherStore";
import { unixConv } from "../../utils/math";

const Radiation = () => {
  let theme = useColorScheme();

  const [parentWidth, setParentWidth] = useState(
    Dimensions.get("window").width
  );

  const { weather } = weatherStore();

  const radiationData = Array.from({ length: 24 }, (_, i) => {
    return {
      value: weather?.hourly?.direct_normal_irradiance[i],
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
          NORMAL RADIATION (W/m²)
        </Text>
      </View>

      <View
        accessible={true}
        accessibilityLabel="Hourly direct normal irradiance chart"
        accessibilityRole="image"
        onLayout={handleLayout}
      >
        <LineChart
          data={radiationData}
          areaChart
          curved
          hideRules
          isAnimated
          adjustToWidth
          hideDataPoints
          color="transparent"
          areaGradientId="radGradient"
          areaGradientComponent={() => {
            return (
              <LinearGradient id="radGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="1" stopColor={"lime"} />
                <Stop offset="0.8" stopColor={"green"} />
                <Stop offset="0.6" stopColor={"yellow"} />
                <Stop offset="0.3" stopColor={"orange"} />
                <Stop offset="0" stopColor={"red"} />
              </LinearGradient>
            );
          }}
          width={parentWidth * 0.9}
          spacing={15}
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
            width: 30,
          }}
        />
      </View>
    </View>
  );
};

export default Radiation;
