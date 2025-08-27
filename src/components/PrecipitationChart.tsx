import { useState } from "react";
import { Dimensions, View } from "react-native";
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
  const [parentWidth, setParentWidth] = useState(
    Dimensions.get("window").width
  );

  // Handle layout changes to update container width
  const handleLayout = (event: { nativeEvent: { layout: { width: any } } }) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };

  return (
    <View className="justify-center w-screen p-2" onLayout={handleLayout}>
      <LineChart
        areaChart
        curved
        isAnimated
        adjustToWidth
        animateOnDataChange
        hideDataPoints
        disableScroll
        data={precipitationData}
        height={200}
        width={parentWidth * 0.9}
        spacing={parentWidth * 0.13}
        color="hsl(213, 100%, 70%)"
        thickness={2}
        startFillColor="hsla(213, 100%, 70%,0.3)"
        endFillColor="hsla(213, 100%, 70%,0.1)"
        startOpacity={0.9}
        endOpacity={0.3}
        endSpacing={0}
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
          width: 30,
        }}
        xAxisThickness={0}
        xAxisColor=""
        xAxisLabelsVerticalShift={0}
        xAxisLabelTextStyle={{
          color: theme === "dark" ? "black" : "gray",
          fontSize: parentWidth * 0.025,
          textAlign: "right",
        }}
      />
    </View>
  );
};
