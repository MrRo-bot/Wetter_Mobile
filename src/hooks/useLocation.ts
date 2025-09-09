import * as PhoneLocation from "expo-location";
import { useEffect, useState } from "react";
import { LocationDataType } from "../types/types";

export default function useLocation(autoFetch: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationDataType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const getLocation = async (): Promise<LocationDataType | null> => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const status = await PhoneLocation.requestForegroundPermissionsAsync();

      if (status.status !== "granted") {
        const message =
          status.status === "denied"
            ? "Enable Location permissions."
            : "Location permission not granted.";
        setErrorMsg(message);
        return null;
      }

      const locationCoords = await PhoneLocation.getCurrentPositionAsync({
        accuracy: PhoneLocation.Accuracy.High,
        // timeInterval: 10000,
        // distanceInterval: 20,
      });

      if (!locationCoords?.coords) {
        throw new Error("Failed to retrieve coordinates.");
      }

      const geoAddress = await PhoneLocation.reverseGeocodeAsync({
        latitude: locationCoords?.coords?.latitude,
        longitude: locationCoords?.coords?.longitude,
      });

      if (geoAddress.length === 0) {
        throw new Error("Unable to retrieve address.");
      }

      const newLocation: LocationDataType = {
        id: `${geoAddress[0].city ?? geoAddress[0].street ?? geoAddress[0].district}-${locationCoords?.coords?.latitude}-${locationCoords?.coords?.longitude}`
          .replace(/\s+/g, "_")
          .toLowerCase(),
        locationCoords,
        geoAddress,
      };

      setLocation(newLocation);
      return newLocation;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to retrieve location";
      setErrorMsg(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (autoFetch) {
      getLocation().catch(() => {
        if (isMounted) {
          setErrorMsg("Automatic location fetch failed.");
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [autoFetch]);

  return { location, isLoading, getLocation, errorMsg };
}
