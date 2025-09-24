import { PressableProps, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import {
  AnimatedProps,
  ReduceMotion,
  SlideInUp,
} from "react-native-reanimated";

import { useSettingsStore } from "@/src/store/settingsStore";

const RainAndSnowSection = ({
  theme,
  themeColor,
  AnimatedComponent,
}: {
  theme: string | null | undefined;
  themeColor: string;
  AnimatedComponent: React.FunctionComponent<
    AnimatedProps<PressableProps & React.RefAttributes<View>>
  >;
}) => {
  const { alerts, toggleRainAndSnow } = useSettingsStore();

  return (
    <AnimatedComponent
      onPress={() => toggleRainAndSnow()}
      entering={SlideInUp.duration(500)
        .delay(200)
        .reduceMotion(ReduceMotion.System)}
      accessibilityRole="togglebutton"
      accessibilityLabel="Toggle rain and snow alarm"
      className={`py-8 flex-row items-center  border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
    >
      <View className="w-9/12">
        <Text
          className={`font-orbitron-bold text-lg ${theme === "dark" ? " text-light/80" : "text-dark/80"}`}
        >
          Rain & Snow Alarm
        </Text>
        <Text
          className={`font-genos-regular text-xl leading-none mt-1 ${theme === "dark" ? " text-light/30" : "text-dark/30"}`}
        >
          Alerts you when rain or snow is approaching
        </Text>
      </View>
      <View className="w-3/12">
        <Switch
          color={themeColor}
          value={alerts.rainAndSnow}
          onValueChange={() => toggleRainAndSnow()}
        />
      </View>
    </AnimatedComponent>
  );
};

export default RainAndSnowSection;
