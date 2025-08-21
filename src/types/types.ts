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

export interface WeatherStoreType {
  weather: WeatherDataType;
  addWeather: (weatherData: WeatherDataType) => void;
}

export interface AqiStoreType {
  aqi: AQIType;
  addAQI: (aqiData: AQIType) => void;
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

export interface WeatherDataType {
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

export interface AQIType {
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
    pm10: "μg/m³";
    pm2_5: "μg/m³";
    carbon_monoxide: "μg/m³";
    nitrogen_dioxide: "μg/m³";
    sulphur_dioxide: "μg/m³";
    ozone: "μg/m³";
    us_aqi: "USAQI";
  };
  current: {
    time: string;
    interval: number;
    pm10: number;
    pm2_5: number;
    carbon_monoxide: number;
    nitrogen_dioxide: number;
    sulphur_dioxide: number;
    ozone: number;
    us_aqi: number;
  };
  hourly_units: {
    time: "iso8601";
    pm10: "μg/m³";
    pm2_5: "μg/m³";
    ozone: "μg/m³";
    sulphur_dioxide: "μg/m³";
    nitrogen_dioxide: "μg/m³";
    carbon_monoxide: "μg/m³";
  };
  hourly: {
    time: string[];
    pm10: number[];
    pm2_5: number[];
    ozone: number[];
    sulphur_dioxide: number[];
    nitrogen_dioxide: number[];
    carbon_monoxide: number[];
  };
}
