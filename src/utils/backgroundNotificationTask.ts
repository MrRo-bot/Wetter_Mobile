import { QueryClient } from "@tanstack/react-query";
import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { locationStore } from "../store/locationStore";

const queryClient = new QueryClient();

export const BACKGROUND_REFRESH_TASK = "background-data-task";

TaskManager.defineTask(BACKGROUND_REFRESH_TASK, async () => {
  try {
    console.log("Background task started...");
    const locationStoreObj = locationStore();
    const currentLocObj = locationStoreObj?.getLocationById(
      locationStoreObj?.locationToShow
    )?.locationCoords.coords ?? {
      latitude: 0,
      longitude: 0,
    };

    await queryClient.refetchQueries({
      queryKey: ["openMeteo_weather", currentLocObj],
      type: "active",
      exact: true,
    });

    await queryClient.refetchQueries({
      queryKey: ["openMeteo_AQI", currentLocObj],
      type: "active",
      exact: true,
    });

    console.log("Background task completed successfully");
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch (error) {
    console.error("Background task failed: ", error);
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export const backgroundNotificationTask = async () => {
  const status = await BackgroundTask.getStatusAsync();
  if (status !== BackgroundTask.BackgroundTaskStatus.Restricted) {
    await BackgroundTask.registerTaskAsync(BACKGROUND_REFRESH_TASK, {
      minimumInterval: 30 * 60,
    });

    console.log("Background task registered");
  }
};

export const unregisterBackgroundTask = async () => {
  await BackgroundTask.unregisterTaskAsync(BACKGROUND_REFRESH_TASK);
  console.log("Background task unregistered");
};
