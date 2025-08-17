import * as PhoneLocation from "expo-location";
import { ToastAndroid } from "react-native";

import { useCallback, useEffect, useState } from "react";
import { LocationDataType } from "../types/types";

export default function useLocation(autoFetch: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationDataType | null>(null);

  const getLocation = useCallback(async () => {
    setIsLoading(true);
    try {
      //asking for location access
      const { status } =
        await PhoneLocation.requestForegroundPermissionsAsync();

      //if permission denied
      if (status !== "granted") {
        setIsLoading(false);
        throw new Error("permisssion denied");
      }

      //if permission given, getting location coordinates
      const locationCoords = await PhoneLocation.getCurrentPositionAsync({
        accuracy: PhoneLocation.Accuracy.Balanced,
      });

      //getting postal address of location from coords
      const geoAddress = await PhoneLocation.reverseGeocodeAsync({
        latitude: locationCoords.coords.latitude,
        longitude: locationCoords.coords.longitude,
      });

      //if geoAddress is available then send data to user
      if (geoAddress.length)
        setLocation({
          id: `${geoAddress[0].city}-${locationCoords.coords.latitude}-${locationCoords.coords.longitude}`,
          locationCoords: locationCoords,
          geoAddress: geoAddress,
        });
    } catch (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.BOTTOM);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    autoFetch && getLocation();
  }, [autoFetch, getLocation]);

  return { location, isLoading, getLocation };
}
