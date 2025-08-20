import { useEffect, useState } from "react";
import { getColors, ImageColorsResult } from "react-native-image-colors";

const useImageColors = (url: string) => {
  const [colors, setColors] = useState<ImageColorsResult | null>(null);

  useEffect(() => {
    getColors(url, {
      fallback: "#44444420",
      cache: true,
      quality: "high",
      key: url,
    }).then((clrs) => setColors(clrs));
  }, [url]);

  return colors;
};

export default useImageColors;
