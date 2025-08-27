import { useState } from "react";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
export const PrecipitationChart = ({
  precipitationData,
  theme,
}: {
  precipitationData: {
    value: number;
    label: string;
  }[];
  theme: string | null | undefined;
}) => {
  const [parentWidth] = useState(Dimensions.get("window").width);

  return (
    <LineChart
      areaChart
      curved
      isAnimated
      animateOnDataChange
      animationDuration={1200}
      onDataChangeAnimationDuration={300}
      disableScroll
      data={precipitationData}
      width={parentWidth}
      hideDataPoints
      spacing={50}
      color="hsl(213, 100%, 70%)"
      thickness={2}
      startFillColor="hsla(213, 100%, 70%,0.3)"
      endFillColor="hsla(213, 100%, 70%,0.1)"
      startOpacity={0.9}
      endOpacity={0.2}
      initialSpacing={0}
      noOfSections={2}
      maxValue={100}
      rulesType=""
      rulesColor=""
      yAxisLabelSuffix="%"
      yAxisThickness={0}
      yAxisTextStyle={{
        color: theme === "dark" ? "black" : "gray",
        fontSize: 12,
        width: 40,
      }}
      xAxisThickness={0}
      xAxisColor=""
      xAxisLabelsVerticalShift={5}
      xAxisLabelTextStyle={{
        color: theme === "dark" ? "black" : "gray",
        fontSize: 10,
        textAlign: "right",
      }}
    />
  );
};
