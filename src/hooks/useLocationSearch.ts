import { useQuery } from "@tanstack/react-query";
import { LocationParamsType, LocationSearchType } from "../types/types";

const useLocationSearch = (search: string) => {
  const GEOCODING_PARAMS: LocationParamsType = {
    name: "",
    count: "50",
    language: "en",
    format: "json",
    // countryCode:''
  };

  if (search && typeof search === "string") {
    GEOCODING_PARAMS.name = search?.trim();
  }

  const queryString = new URLSearchParams(GEOCODING_PARAMS).toString();

  const finalUrl = `https://geocoding-api.open-meteo.com/v1/search?${queryString}`;

  const fetchLocationResults = async ({ signal }: { signal: AbortSignal }) => {
    if (!finalUrl) throw new Error("Invalid search query");
    try {
      const response = await fetch(finalUrl, { signal });
      if (!response.ok)
        throw new Error("Failed while getting location: " + response.status);
      return response.json() as Promise<LocationSearchType>;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Request was canceled");
      }
      throw error instanceof Error
        ? error
        : new Error("An unexpected error occurred");
    }
  };

  return useQuery<LocationSearchType>({
    queryKey: ["openMeteo_geocoding", search],
    queryFn: fetchLocationResults,
    enabled: !!search && GEOCODING_PARAMS.name.length > 3,
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useLocationSearch;
