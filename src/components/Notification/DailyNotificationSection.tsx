import { PressableProps, Text, View } from "react-native";
import { Switch } from "react-native-paper";
import {
  AnimatedProps,
  ReduceMotion,
  SlideInUp,
} from "react-native-reanimated";

import { useSettingsStore } from "@/src/store/settingsStore";

const DailyNotificationSection = ({
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
  const { alerts, toggleDailyNotification } = useSettingsStore();

  return (
    <AnimatedComponent
      onPress={() => toggleDailyNotification()}
      entering={SlideInUp.duration(500)
        .delay(500)
        .reduceMotion(ReduceMotion.System)}
      accessibilityRole="togglebutton"
      accessibilityLabel="Toggle daily notification"
      className={`py-8 flex-row items-center justify-between border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
    >
      <View>
        <Text
          className={`font-orbitron-bold text-lg ${theme === "dark" ? " text-light/80" : "text-dark/70"}`}
        >
          Daily Notification
        </Text>
        <Text
          className={`font-genos-regular text-xl leading-none mt-1 ${theme === "dark" ? " text-light/30" : "text-dark/30"}`}
        >
          {alerts.dailyNotification ? "On" : "Off"}
        </Text>
      </View>
      <View>
        <Switch
          color={themeColor}
          value={alerts.dailyNotification}
          onValueChange={() => toggleDailyNotification()}
        />
      </View>
    </AnimatedComponent>
  );
};

export default DailyNotificationSection;
