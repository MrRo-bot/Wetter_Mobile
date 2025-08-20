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

export interface IosImageColorsType {
  background: string;
  primary: string;
  secondary: string;
  detail: string;
  platform: "ios";
}

//android example

export interface AndroidImageColorsType {
  dominant: string;
  average: string;
  vibrant: string;
  darkVibrant: string;
  lightVibrant: string;
  darkMuted: string;
  lightMuted: string;
  muted: string;
  platform: "android";
}

export interface weatherDataType {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: "iso8601";
    interval: "seconds";
    temperature_2m: "°C";
    apparent_temperature: "°C";
    relative_humidity_2m: "%";
    is_day: "";
    weather_code: "wmo code";
    surface_pressure: "hPa";
    precipitation: "mm";
    rain: "mm";
    showers: "mm";
    snowfall: "cm";
    wind_speed_10m: "km/h";
    wind_direction_10m: "°";
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    is_day: number;
    weather_code: number;
    surface_pressure: number;
    precipitation: number;
    rain: number;
    showers: number;
    snowfall: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
  hourly_units: {
    time: "iso8601";
    dew_point_2m: "°C";
    precipitation_probability: "%";
    precipitation: "mm";
    visibility: "m";
    uv_index: "";
  };
  hourly: {
    time: string[];
    dew_point_2m: number[];
    precipitation_probability: number[];
    precipitation: number[];
    visibility: number[];
    uv_index: number[];
  };
}
