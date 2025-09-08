import { LocationObjectCoords, reverseGeocodeAsync } from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { LocationDataType } from "../types/types";

export default function useCustomLocation(autoFetch: boolean = false) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<LocationDataType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  interface LocationObject {
    coords: LocationObjectCoords;
    mocked: boolean;
    timestamp: number;
  }

  const getLocation = useCallback(
    async (latitude: number = 0, longitude: number = 0) => {
      setIsLoading(true);
      setErrorMsg(null);

      try {
        const geoAddress = await reverseGeocodeAsync({
          latitude: latitude,
          longitude: longitude,
        });

        const locationCoords: LocationObject = {
          coords: {
            latitude: latitude,
            longitude: longitude,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          mocked: true,
          timestamp: Date.now(),
        };

        if (geoAddress.length > 0) {
          const newLocation: LocationDataType = {
            id: `${geoAddress[0].name ?? geoAddress[0].city ?? geoAddress[0].district}-${latitude}-${longitude}`,
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
