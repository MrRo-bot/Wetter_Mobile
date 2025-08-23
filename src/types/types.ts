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
    temperature_2m: "°C" | "" | "°F";
    apparent_temperature: "°C" | "" | "°F";
    relative_humidity_2m: "%";
    is_day: "0" | "" | "1";
    weather_code: "wmo code";
    surface_pressure: "hPa";
    precipitation: "mm" | "" | "inch";
    rain: "mm" | "" | "inch";
    showers: "mm" | "" | "inch";
    snowfall: "cm" | "" | "inch";
    wind_speed_10m: "km/h" | "" | "knots" | "" | "mph" | "" | "m/s";
    wind_gusts_10m: "km/h" | "" | "knots" | "" | "mph" | "" | "m/s";
    wind_direction_10m: "°";
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    weather_code: number;
    surface_pressure: number;
    precipitation: number;
    wind_speed_10m: number;
    wind_gusts_10m: number;
    wind_direction_10m: number;
  };
  hourly_units: {
    time: "iso8601";
    dew_point_2m: "°C" | "" | "°F";
    precipitation_probability: "%";
    precipitation: "mm" | "" | "inch";
    visibility: "m";
    uv_index: "";
    temperature_2m: "°C" | "" | "°F";
    relative_humidity_2m: "%";
    apparent_temperature: "°C" | "" | "°F";
    weather_code: "wmo code";
    surface_pressure: "hPa";
    wind_speed_10m: "km/h" | "" | "knots" | "" | "mph" | "" | "m/s";
    wind_direction_10m: "°";
    wind_gusts_10m: "km/h" | "" | "knots" | "" | "mph" | "" | "m/s";
    soil_temperature_0cm: "°C" | "" | "°F";
    sunshine_duration: "s";
    direct_normal_irradiance: "W/m²";
  };
  hourly: {
    time: string[];
    dew_point_2m: number[];
    precipitation_probability: number[];
    precipitation: number[];
    visibility: number[];
    uv_index: number[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    apparent_temperature: number[];
    weather_code: number[];
    surface_pressure: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    wind_gusts_10m: number[];
    soil_temperature_0cm: number[];
    sunshine_duration: number[];
    direct_normal_irradiance: number[];
  };
  daily_units: {
    time: "iso8601";
    weather_code: "wmo code";
    temperature_2m_max: "°C" | "" | "°F";
    temperature_2m_min: "°C" | "" | "°F";
    precipitation_sum: "mm" | "" | "inch";
    precipitation_hours: "h";
    precipitation_probability_max: "%";
    sunrise: "iso8601";
    sunset: "iso8601";
    sunshine_duration: "s";
    daylight_duration: "s";
    uv_index_max: "";
    wind_speed_10m_max: "km/h" | "" | "mph" | "" | "knots" | "" | "ms";
    wind_gusts_10m_max: "km/h" | "" | "mph" | "" | "knots" | "" | "ms";
    shortwave_radiation_sum: "MJ/m²";
    dew_point_2m_mean: "°C" | "" | "°F";
    surface_pressure_mean: "hPa";
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_hours: number[];
    precipitation_probability_max: number[];
    sunrise: string[];
    sunset: string[];
    sunshine_duration: number[];
    daylight_duration: number[];
    uv_index_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    shortwave_radiation_sum: number[];
    dew_point_2m_mean: number[];
    surface_pressure_mean: number[];
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
export interface UnsplashType {
  total: number;
  total_pages: number;
  results: {
    id: string;
    created_at: string;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    likes: number;
    liked_by_user: boolean;
    description: string | null;
    user: {
      id: string;
      username: string;
      name: string;
      first_name: string;
      last_name?: string;
      instagram_username?: string;
      twitter_username?: string;
      portfolio_url?: string;
      profile_image: {
        small: string;
        medium: string;
        large: string;
      };
      links: {
        self: string;
        html: string;
        photos: string;
        likes: string;
      };
    };
    current_user_collections: any[];
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
    };
    links: {
      self: string;
      html: string;
      download: string;
    };
    [key: string]: any;
  }[];
}
