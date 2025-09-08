import * as PhoneLocation from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { LocationDataType } from "../types/types";

export default function useLocation(autoFetch: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationDataType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getLocation = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const status = await PhoneLocation.requestForegroundPermissionsAsync();

      if (status.status !== "granted") {
        throw new Error("Location permisssion denied");
      }

      const locationCoords = await PhoneLocation.getCurrentPositionAsync({
        accuracy: PhoneLocation.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 20,
      });

      const geoAddress = await PhoneLocation.reverseGeocodeAsync({
        latitude: locationCoords?.coords?.latitude,
        longitude: locationCoords?.coords?.longitude,
      });

      if (geoAddress.length > 0) {
        const newLocation: LocationDataType = {
          id: `${geoAddress[0].city}_${geoAddress[0].district ?? geoAddress[0].region ?? geoAddress[0].street}-${locationCoords?.coords?.latitude}-${locationCoords?.coords?.longitude}`,
          locationCoords: locationCoords,
          geoAddress: geoAddress,
        };
        setLocation(newLocation);
        return newLocation;
      } else {
        throw new Error("Unable to retrieve address");
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Failed to retrieve location");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) getLocation();
  }, [autoFetch, getLocation]);

  return { location, isLoading, getLocation, errorMsg };
}
