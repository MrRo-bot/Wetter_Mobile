//WIND DIRECTION IN CARDINAL AND IN DEGREES
export const degConv = (deg: number) => {
  // Normalize degrees to [0, 360)
  while (deg < 0) deg += 360;
  while (deg >= 360) deg -= 360;

  // Cardinal direction calculation
  const val = Math.round((deg - 11.25) / 22.5);
  const cardinal = [
    "North",
    "North-northeast",
    "North-east",
    "East-northeast",
    "East",
    "East-southeast",
    "South-east",
    "South-southeast",
    "South",
    "South-southwest",
    "South-west",
    "West-southwest",
    "West",
    "West-northwest",
    "North-west",
    "North-northwest",
  ];

  // Rotation for icon (wind blowing direction: add 180°)
  const rotationDeg = (deg + 180) % 360;

  return {
    cardinal: cardinal[val % 16], // Ensure index is in range
    rotationDeg,
  };
};

//Rounding figures
export const valRound = (value: number): number => Math.floor(+value);

//METER DISTANCE AND SPEED CONVERSION
export const lenAndSpdConv = {
  mi: (value: number) => Math.round(value / 1609.344),
  km: (value: number) => Math.round(value / 1000),
  mph: (value: number) => Math.round(value * 2.237),
};

//EPOCH TIME TO READABLE FORMAT
export const unixConv = {
  weekdays: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  timeStamp: (value: number, time: string) => {
    const epoch = new Date(value * 1000);
    let year = epoch.getFullYear();
    let month = unixConv.months[epoch.getMonth()];
    let day = unixConv.weekdays[epoch.getDay()];
    let date = epoch.getDate();
    let hour = epoch.getHours();
    let hour2 = epoch.toLocaleString("en-US", {
      hour: "numeric",
      hour12: time === "12-hour",
    });
    let clockTime = epoch.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: time === "12-hour",
    });
    return { year, month, day, date, hour, hour2, clockTime };
  },
};

//AQI DESCRIPTION
export const aqiDesc = (
  value: number
): { level: string; desc: string; color: string } => {
  switch (true) {
    case value >= 1 && value <= 50:
      return {
        level: "Good",
        desc: "Air quality is satisfactory.",
        color: "green",
      };
    case value >= 51 && value <= 100:
      return {
        level: "Moderate",
        desc: "Air quality is acceptable.",
        color: "yellow",
      };
    case value >= 101 && value <= 150:
      return {
        level: "Sensitive",
        desc: "Unhealthy for sensitive people.",
        color: "orange",
      };
    case value >= 151 && value <= 200:
      return {
        level: "Unhealthy",
        desc: "Serious health effects for sensitive people.",
        color: "red",
      };
    case value >= 201 && value <= 300:
      return {
        level: "Very Unhealthy",
        desc: "Health alert: The risk of health effects is increased.",
        color: "purple",
      };
    case value > 300:
      return {
        level: "Hazardous",
        desc: "Health warning: everyone is more likely to be affected.",
        color: "red",
      };
    default:
      return {
        level: "Nil",
        desc: "Not Found",
        color: "grey",
      };
  }
};

//other aqi parameters
export const aqiDetailColors = ({
  title,
  value,
}: {
  title: string;
  value: number;
}): { textColor: string; bgColor: string } => {
  switch (true) {
    case title === "PM2.5"
      ? value >= 0 && value <= 12
      : title === "PM10"
        ? value >= 0 && value <= 55
        : title === "O3"
          ? value >= 0 && value <= 55
          : title === "CO"
            ? value >= 0 && value <= 4.5
            : title === "SO2"
              ? value >= 0 && value <= 35
              : value >= 0 && value <= 54:
      return {
        textColor: "#000000",
        bgColor: "#168b17",
      };
    case title === "PM2.5"
      ? value > 12 && value <= 35.5
      : title === "PM10"
        ? value > 55 && value <= 155
        : title === "O3"
          ? value > 55 && value <= 70
          : title === "CO"
            ? value > 4.5 && value <= 9.5
            : title === "SO2"
              ? value > 35 && value <= 75
              : value > 54 && value <= 100:
      return {
        textColor: "#000000",
        bgColor: "#ffd700",
      };
    case title === "PM2.5"
      ? value > 35.5 && value <= 55.5
      : title === "PM10"
        ? value > 155 && value <= 255
        : title === "O3"
          ? value > 70 && value <= 85
          : title === "CO"
            ? value > 9.5 && value <= 12.5
            : title === "SO2"
              ? value > 75 && value <= 185
              : value > 100 && value <= 360:
      return {
        textColor: "#000000",
        bgColor: "#ffa500",
      };
    case title === "PM2.5"
      ? value > 55.5 && value <= 150.5
      : title === "PM10"
        ? value > 255 && value <= 355
        : title === "O3"
          ? value > 85 && value <= 105
          : title === "CO"
            ? value > 12.5 && value <= 15.5
            : title === "SO2"
              ? value > 185 && value <= 305
              : value > 360 && value <= 650:
      return {
        textColor: "#ffffff",
        bgColor: "#ff0000",
      };
    case title === "PM2.5"
      ? value > 150.5 && value <= 250.5
      : title === "PM10"
        ? value > 355 && value <= 425
        : title === "O3"
          ? value > 105 && value <= 200
          : title === "CO"
            ? value > 15.5 && value <= 30.5
            : title === "SO2"
              ? value > 305 && value <= 605
              : value > 650 && value <= 1250:
      return {
        textColor: "#ffffff",
        bgColor: "#8b0000",
      };
    case title === "PM2.5"
      ? value > 250.5
      : title === "PM10"
        ? value > 425
        : title === "O3"
          ? value > 200
          : title === "CO"
            ? value > 30.5
            : title === "SO2"
              ? value > 605
              : value > 1250:
      return {
        textColor: "#ffffff",
        bgColor: "#800080",
      };
    default:
      return {
        textColor: "#000000",
        bgColor: "#808080",
      };
  }
};

//WEATHER INTERPRETATION CODES (OPEN METEO)
export const weatherCodeConv = (code: number): string => {
  switch (code) {
    case 0:
      return "Clear sky";
    case 1:
      return "Mainly clear sky";
    case 2:
      return "Partly cloudy";
    case 3:
      return "Overcast";
    case 45:
      return "Fog";
    case 48:
      return "Depositing rime fog";
    case 51:
      return "Light drizzle";
    case 53:
      return "Moderate drizzle";
    case 55:
      return "Dense drizzle";
    case 56:
      return "Freezing light drizzle";
    case 57:
      return "Freezing dense drizzle";
    case 61:
      return "Slight rain";
    case 63:
      return "Moderate rain";
    case 65:
      return "Heavy rain";
    case 66:
      return "Freezing light rain";
    case 67:
      return "Freezing heavy rain";
    case 71:
      return "Slight snow fall";
    case 73:
      return "Moderate snow fall";
    case 75:
      return "Heavy snow fall";
    case 77:
      return "Snow grains";
    case 80:
      return "Slight rain showers";
    case 81:
      return "Moderate rain showers";
    case 82:
      return "Violent rain showers";
    case 85:
      return "Slight snow showers";
    case 86:
      return "Heavy snow showers";
    case 95:
      return "Thunderstorm";
    case 96:
      return "Slight thunderstorm with hail";
    case 99:
      return "Heavy thunderstorm with hail";
    default:
      return "Unknown weather";
  }
};

//WEATHER ICON FINDER
export const weatherIconFind = (code: number): string[] | string => {
  switch (code) {
    case 0:
      return ["clear_day", "clear_night"];
    case 1:
      return ["clear_day", "clear_night"];
    case 2:
      return ["partly_cloudy_day", "partly_cloudy_night"];
    case 3:
      return "overcast";
    case 45:
    case 48:
      return "fog";
    case 51:
    case 53:
      return "moderate_drizzle";
    case 55:
      return "dense_drizzle";
    case 56:
    case 57:
    case 66:
    case 67:
      return "freezing_drizzle";
    case 61:
      return "slight_rain";
    case 63:
      return "moderate_rain";
    case 65:
      return "heavy_rain";
    case 71:
      return "slight_snow";
    case 73:
      return "moderate_snow";
    case 75:
      return "heavy_snow";
    case 77:
      return "heavy_snow";
    case 80:
      return "slight_rain";
    case 81:
      return "moderate_rain";
    case 82:
      return "heavy_rain";
    case 85:
    case 86:
      return "moderate_snow";
    case 95:
      return "thunderstorm";
    case 96:
      return "slight_thunder_with_hail";
    case 99:
      return "heavy_thunder_with_hail";
    default:
      return "default";
  }
};

//FINDING CLOSEST TIMESTAMP ARRAY INDEX TO CURRENT TIME
export const closestTimestamp = (
  currTimestamp: string,
  hourlyTimestampArray: string[]
) => {
  const currentTimestamp = new Date(currTimestamp).getTime() / 1000;
  if (!currentTimestamp) throw new Error("currTimestamp not available");

  return hourlyTimestampArray.reduce((a, b) => {
    const aTime = new Date(a).getTime() / 1000;
    const bTime = new Date(b).getTime() / 1000;

    if (isNaN(aTime)) throw new Error(`Invalid timestamp: ${a}`);
    if (isNaN(bTime)) throw new Error(`Invalid timestamp: ${b}`);

    const aDiff = Math.abs(aTime - currentTimestamp);
    const bDiff = Math.abs(bTime - currentTimestamp);

    if (aDiff === bDiff) {
      return aTime > bTime ? a : b;
    } else {
      return bDiff < aDiff ? b : a;
    }
  });
};

//WINDMILL ROTATION SPEED
export const wingSpeed = (value: number): number => {
  switch (true) {
    case value >= 1 && value < 10:
      return 50;
    case value >= 10 && value < 20:
      return 30;
    case value >= 20 && value < 30:
      return 10;
    case value >= 30 && value < 40:
      return 5;
    case value >= 40 && value < 50:
      return 3;
    case value >= 40 && value < 200:
      return 1;
    case value >= 200 && value < 400:
      return 0.5;
    case value >= 400:
      return 0.1;
    default:
      return 0;
  }
};

//showing alert icon or sending alert notification in-app
export const alertIcon = (code: number): string => {
  switch (code) {
    case 65:
    case 67:
    case 75:
    case 82:
    case 86:
    case 95:
    case 96:
    case 99:
      return "alert";
    default:
      return "";
  }
};

//Converts update frequency label to milliseconds
export const updateFreqFunction = (str?: string): number => {
  switch (str) {
    case "15 Minutes":
      return 900000;
    case "30 Minutes":
      return 1800000;
    case "1 Hour":
      return 3600000;
    case "2 Hours":
      return 7200000;
    case "3 Hours":
      return 10800000;
    default:
      return 900000;
  }
};

//changing pressure level units
export const pressureConverter = {
  mBar: (value: number) => Math.round(value),
  inHg: (value: number) => Math.round(value * 0.0295300586),
  hPa: (value: number) => Math.round(value),
  bar: (value: number) => Math.round(value * 0.001),
  mmHg: (value: number) => Math.round(value * 0.0750063755),
  psi: (value: number) => Math.round(value * 0.0145037738),
};
