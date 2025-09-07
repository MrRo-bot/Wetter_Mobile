import * as PhoneLocation from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { LocationDataType } from "../types/types";

export default function useCustomLocation(autoFetch: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationDataType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getLocation = useCallback(
    async (latitude: number = 0, longitude: number = 0) => {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        const geoAddress = await PhoneLocation.reverseGeocodeAsync({
          latitude: latitude,
          longitude: longitude,
        });

        const locationCoords = await PhoneLocation.getCurrentPositionAsync({
          accuracy: PhoneLocation.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 20,
        });

        if (geoAddress.length > 0) {
          const newLocation: LocationDataType = {
            id: `${geoAddress[0].city || "unknown"}-${latitude}-${longitude}`,
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
    },
    []
  );

  useEffect(() => {
    if (autoFetch) getLocation();
  }, [autoFetch, getLocation]);

  return { location, isLoading, getLocation, errorMsg };
}
