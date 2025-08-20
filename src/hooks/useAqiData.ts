import { useLocationStore } from "../store/locationStore";

const useAqiData = () => {
  //in future will send this data in params of this function
  const locationData = useLocationStore((state) => state.locations);

  const aqiKey = process.env.EXPO_PUBLIC_AIR_VISUAL_KEY;

  const aqiUrl = `https://api.airvisual.com/v2/nearest_city?lat=${locationData[0].locationCoords.coords.latitude}&lon=${locationData[0].locationCoords.coords.longitude}&key=${aqiKey}`;
  return {};
};

export default useAqiData;
