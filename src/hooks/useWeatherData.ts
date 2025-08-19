import { useLocationStore } from "../store/locationStore";

const useWeatherData = () => {
  //in future will send this data in params of this function
  const locationData = useLocationStore((state) => state.locations);

  const aqiKey = process.env.EXPO_PUBLIC_AIR_VISUAL_KEY;

  const weatherUrl = "https://api.open-meteo.com/v1/forecast";
  const weatherParams = {
    latitude: locationData[0].locationCoords.coords.latitude,
    longitude: locationData[0].locationCoords.coords.longitude,
    hourly: [
      "temperature_2m",
      "relativehumidity_2m",
      "dewpoint_2m",
      "apparent_temperature",
      "precipitation_probability",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "snow_depth",
      "weathercode",
      "surface_pressure",
      "cloudcover",
      "visibility",
      "windspeed_10m",
      "winddirection_10m",
      "windgusts_10m",
      "uv_index",
      "is_day",
    ],
    daily: [
      "weathercode",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "sunrise",
      "sunset",
      "uv_index_max",
      "precipitation_sum",
      "rain_sum",
      "showers_sum",
      "snowfall_sum",
      "precipitation_hours",
      "precipitation_probability_max",
      "windspeed_10m_max",
      "windgusts_10m_max",
    ],
  };

  const aqiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${locationData[0].locationCoords.coords.latitude}&lon=${locationData[0].locationCoords.coords.longitude}&key=${aqiKey}`;

  return {};
};
export default useWeatherData;
