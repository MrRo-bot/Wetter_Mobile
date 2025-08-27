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
      // If location services are enabled
      const providerStatus = await PhoneLocation.getProviderStatusAsync();
      if (!providerStatus.locationServicesEnabled) {
        throw new Error(
          "Location services are disabled. Please enable them in device settings."
        );
      }

      //asking for location access
      const status = await PhoneLocation.requestForegroundPermissionsAsync();

      //if permission denied
      if (status.status !== "granted") {
        throw new Error("permisssion denied");
      }

      //if permission given, getting location coordinates
      const locationCoords = await PhoneLocation.getCurrentPositionAsync({
        accuracy: PhoneLocation.Accuracy.High, // Try higher accuracy
        timeInterval: 10000, // Minimum time to wait (in milliseconds)
        distanceInterval: 20, //every 20 meters
      });

      //getting postal address of location from coords
      const geoAddress = await PhoneLocation.reverseGeocodeAsync({
        latitude: locationCoords?.coords?.latitude,
        longitude: locationCoords?.coords?.longitude,
      });

      //if geoAddress is available then send data to user
      if (geoAddress.length)
        setLocation({
          id: `${geoAddress[0].city}-${locationCoords?.coords?.latitude}-${locationCoords?.coords?.longitude}`,
          locationCoords: locationCoords,
          geoAddress: geoAddress,
        });
      else {
        throw new Error("Unable to retrieve address from coordinates");
      }
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.message || "Failed to retrieve location");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    autoFetch && getLocation();
  }, [autoFetch, getLocation]);

  return { location, isLoading, getLocation, errorMsg };
}
