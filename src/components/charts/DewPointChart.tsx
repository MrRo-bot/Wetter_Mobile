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

  const dewPointData = Array.from({ length: 24 }, (_, i) => {
    return {
      value: weather?.hourly?.dew_point_2m[i],
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
          DEW POINT (৹)
        </Text>
      </View>

      <View onLayout={handleLayout}>
        <BarChart
          hideRules
          isAnimated
          adjustToWidth
          cappedBars
          data={dewPointData}
          barWidth={35}
          capColor={theme === "dark" ? "rgb(178,65,105)" : "rgb(78, 0, 142)"}
          capThickness={4}
          // frontColor={"rgba(219, 182, 249,0.2)"}
          // gradientColor={"rgba(200, 100, 244,0.8)"}
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
