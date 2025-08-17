import { LocationGeocodedAddress, LocationObject } from "expo-location";
import { ColorSchemeName, GestureResponderEvent } from "react-native";

export interface LocationDataType {
  id: string;
  locationCoords: LocationObject;
  geoAddress: LocationGeocodedAddress[];
}

export interface LocationStoreType {
  locations: LocationDataType[];
  addLocation: (location: LocationDataType) => void;
}

export interface MainButtonType {
  onPressFunc: null | ((event: GestureResponderEvent) => void) | undefined;
  buttonText: string;
  darkColor: string;
  lightColor: string;
  colorScheme: ColorSchemeName;
  darkBgColor: string;
  lightBgColor: string;
}
