import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, PressableProps, Text, View } from "react-native";
import {
  AnimatedProps,
  ReduceMotion,
  SlideInUp,
} from "react-native-reanimated";

import { useSettingsStore } from "@/src/store/settingsStore";

const TimeSection = ({
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
  const { alerts, setTime } = useSettingsStore();

  const [timeModal, setTimeModal] = useState(false);

  const timeThemeIos = Platform.OS === "ios" && {
    textColor: themeColor,
    accentColor: themeColor,
    themeVariant: theme,
  };

  return (
    <AnimatedComponent
      onPress={() => setTimeModal(!timeModal)}
      entering={SlideInUp.duration(500)
        .delay(600)
        .reduceMotion(ReduceMotion.System)}
      accessibilityLabel="Setting time of the day to get notification every day"
      className={`py-8 flex-row items-center justify-between border-b-[1px] border-solid ${theme === "dark" ? "border-b-light/5" : "border-b-dark/5"}`}
    >
      <View>
        <Text
          className={`font-orbitron-bold text-lg ${theme === "dark" ? " text-light/80" : "text-dark/70"}`}
        >
          Time
        </Text>
        <Text
          className={`font-genos-regular text-xl leading-none mt-1 ${theme === "dark" ? " text-light/30" : "text-dark/30"}`}
        >
          {alerts.time}
        </Text>
      </View>
      <View>
        {timeModal && (
          <DateTimePicker
            {...timeThemeIos}
            positiveButton={{ label: "Set", textColor: themeColor }}
            negativeButton={{ label: "Cancel", textColor: themeColor }}
            value={new Date()}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "android" ? "clock" : "default"}
            onChange={(timeVal) => {
              const timeValue = new Date(
                timeVal.nativeEvent.timestamp
              ).toTimeString();
              setTime(timeValue.slice(0, 5));
              setTimeModal(!timeModal);
            }}
          />
        )}
      </View>
    </AnimatedComponent>
  );
};

export default TimeSection;
