import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import React, { useEffect } from "react";

const Loader = () => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.5);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);
  }, [rotation]);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, [scale]);

  const infiniteRotation = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const infiniteScale = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading animation component"
      accessibilityState={{ busy: true }}
      style={[infiniteRotation]}
      className="relative mx-auto rounded-full w-14 h-14 bg-redDark"
    >
      <Animated.View
        style={[infiniteScale]}
        className="absolute w-4 h-4 rounded-full top-2 left-2 bg-greenLight"
      ></Animated.View>
      <Animated.View
        style={[
          infiniteScale,
          {
            animationDelay: "500ms",
          },
        ]}
        className="absolute w-4 h-4 rounded-full bottom-2 right-2 bg-greenLight"
      ></Animated.View>
    </Animated.View>
  );
};

export default Loader;
