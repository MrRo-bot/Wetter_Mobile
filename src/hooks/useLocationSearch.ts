import { useQuery } from "@tanstack/react-query";
import { LocationSearchType } from "../types/types";

const useLocationSearch = (search: string) => {
  const paramsObj: {
    name: string;
    count: string;
    language: "en" | "de" | "fr" | "es" | "it" | "pt" | "ru" | "tr" | "hi";
    format: "json" | "photobuf";
    // countryCode:string;
  } = {
    name: "",
    count: "10",
    language: "en",
    format: "json",
    // countryCode:''
  };

  if (search && typeof search === "string") {
    paramsObj.name = search;
  }

  const queryString = new URLSearchParams(paramsObj).toString();
  const finalUrl = `https://geocoding-api.open-meteo.com/v1/search?${queryString}`;

  const fetchLocationResults = async ({ signal }: { signal: AbortSignal }) => {
    const response = await fetch(finalUrl, { signal });
    if (!response.ok) throw new Error("Failed while getting location");
    return response.json() as Promise<LocationSearchType>;
  };

  return useQuery<LocationSearchType>({
    queryKey: ["openMeteo_geocoding", search],
    queryFn: fetchLocationResults,
    enabled: !!search && search.length > 3,
    staleTime: 15 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
};

export default useLocationSearch;
