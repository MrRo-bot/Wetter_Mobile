// import alert from "@/src/assets/images/alert.gif";
// import direction from "@/src/assets/images/direction.png";
// import hot_alert from "@/src/assets/images/hot_alert.gif";
// import introduction from "@/src/assets/images/introduction.png";
// import location from "@/src/assets/images/location.gif";
// import search from "@/src/assets/images/search.gif";

// import clock from "@/src/assets/images/brief/clock.gif";
// import dew_point from "@/src/assets/images/brief/dew_point.gif";
// import humidity from "@/src/assets/images/brief/humidity.gif";
// import pressure from "@/src/assets/images/brief/pressure.gif";
// import sunrise from "@/src/assets/images/brief/sunrise.gif";
// import sunset from "@/src/assets/images/brief/sunset.gif";
// import thermometer from "@/src/assets/images/brief/thermometer.gif";
// import uv from "@/src/assets/images/brief/uv.gif";
// import visibility from "@/src/assets/images/brief/visibility.gif";

// import clear_day from "@/src/assets/images/weatherType/clear_day.gif";
// import clear_night from "@/src/assets/images/weatherType/clear_night.gif";
// import dense_drizzle from "@/src/assets/images/weatherType/dense_drizzle.gif";
// import fog from "@/src/assets/images/weatherType/fog.gif";
// import freezing_drizzle from "@/src/assets/images/weatherType/freezing_drizzle.gif";
// import hail from "@/src/assets/images/weatherType/hail.gif";
// import heavy_rain from "@/src/assets/images/weatherType/heavy_rain.gif";
// import heavy_snow from "@/src/assets/images/weatherType/heavy_snow.gif";
// import heavy_thunder_with_hail from "@/src/assets/images/weatherType/heavy_thunder_with_hail.gif";
// import moderate_drizzle from "@/src/assets/images/weatherType/moderate_drizzle.gif";
// import moderate_rain from "@/src/assets/images/weatherType/moderate_rain.gif";
// import moderate_snow from "@/src/assets/images/weatherType/moderate_snow.gif";
// import overcast from "@/src/assets/images/weatherType/overcast.gif";
// import partly_cloudy_day from "@/src/assets/images/weatherType/partly_cloudy_day.gif";
// import partly_cloudy_night from "@/src/assets/images/weatherType/partly_cloudy_night.gif";
// import slight_rain from "@/src/assets/images/weatherType/slight_rain.gif";
// import slight_snow from "@/src/assets/images/weatherType/slight_snow.gif";
// import slight_thunder_with_hail from "@/src/assets/images/weatherType/slight_thunder_with_hail.gif";
// import thunderstorm from "@/src/assets/images/weatherType/thunderstorm.gif";
// import tornado from "@/src/assets/images/weatherType/tornado.gif";

// export default {
//   alert,
//   hot_alert,
//   introduction,
//   search,
//   direction,
//   location,
//   clock,
//   humidity,
//   dew_point,
//   pressure,
//   sunrise,
//   sunset,
//   thermometer,
//   uv,
//   visibility,
//   clear_day, //0,1
//   clear_night, //0,1
//   dense_drizzle, //55
//   fog, //45,48
//   freezing_drizzle, //56,57,66,67
//   hail,
//   heavy_rain, //65,82
//   heavy_snow, //75
//   heavy_thunder_with_hail, //99
//   moderate_drizzle, //51,53
//   moderate_rain, //63,81
//   moderate_snow, //73,85,86
//   overcast, //3
//   partly_cloudy_day, //2
//   partly_cloudy_night, //2
//   slight_rain, //61,80
//   slight_snow, //71,77
//   slight_thunder_with_hail, //96
//   thunderstorm, //95
//   tornado,
// };

import alert from "@/src/assets/images/alert.gif";
import direction from "@/src/assets/images/direction.png";
import hotAlert from "@/src/assets/images/hot_alert.gif";
import introduction from "@/src/assets/images/introduction.png";
import location from "@/src/assets/images/location.gif";
import search from "@/src/assets/images/search.gif";

import clock from "@/src/assets/images/brief/clock.gif";
import dewPoint from "@/src/assets/images/brief/dew_point.gif";
import humidity from "@/src/assets/images/brief/humidity.gif";
import pressure from "@/src/assets/images/brief/pressure.gif";
import sunrise from "@/src/assets/images/brief/sunrise.gif";
import sunset from "@/src/assets/images/brief/sunset.gif";
import thermometer from "@/src/assets/images/brief/thermometer.gif";
import uv from "@/src/assets/images/brief/uv.gif";
import visibility from "@/src/assets/images/brief/visibility.gif";

import clearDay from "@/src/assets/images/weatherType/clear_day.gif";
import clearNight from "@/src/assets/images/weatherType/clear_night.gif";
import denseDrizzle from "@/src/assets/images/weatherType/dense_drizzle.gif";
import fog from "@/src/assets/images/weatherType/fog.gif";
import freezingDrizzle from "@/src/assets/images/weatherType/freezing_drizzle.gif";
import heavyRain from "@/src/assets/images/weatherType/heavy_rain.gif";
import heavySnow from "@/src/assets/images/weatherType/heavy_snow.gif";
import heavyThunderWithHail from "@/src/assets/images/weatherType/heavy_thunder_with_hail.gif";
import moderateDrizzle from "@/src/assets/images/weatherType/moderate_drizzle.gif";
import moderateRain from "@/src/assets/images/weatherType/moderate_rain.gif";
import moderateSnow from "@/src/assets/images/weatherType/moderate_snow.gif";
import overcast from "@/src/assets/images/weatherType/overcast.gif";
import partlyCloudyDay from "@/src/assets/images/weatherType/partly_cloudy_day.gif";
import partlyCloudyNight from "@/src/assets/images/weatherType/partly_cloudy_night.gif";
import slightRain from "@/src/assets/images/weatherType/slight_rain.gif";
import slightSnow from "@/src/assets/images/weatherType/slight_snow.gif";
import slightThunderWithHail from "@/src/assets/images/weatherType/slight_thunder_with_hail.gif";
import thunderstorm from "@/src/assets/images/weatherType/thunderstorm.gif";
import { WeatherIconsType } from "../types/types";

const images: WeatherIconsType = {
  alert: alert,
  direction: direction,
  hot_alert: hotAlert,
  introduction: introduction,
  location: location,
  search: search,
  clock: clock,
  dew_point: dewPoint,
  humidity: humidity,
  pressure: pressure,
  sunrise: sunrise,
  sunset: sunset,
  thermometer: thermometer,
  uv: uv,
  visibility: visibility,
  clear_day: clearDay,
  clear_night: clearNight,
  partly_cloudy_day: partlyCloudyDay,
  partly_cloudy_night: partlyCloudyNight,
  overcast,
  fog,
  moderate_drizzle: moderateDrizzle,
  dense_drizzle: denseDrizzle,
  freezing_drizzle: freezingDrizzle,
  slight_rain: slightRain,
  moderate_rain: moderateRain,
  heavy_rain: heavyRain,
  slight_snow: slightSnow,
  moderate_snow: moderateSnow,
  heavy_snow: heavySnow,
  thunderstorm,
  slight_thunder_with_hail: slightThunderWithHail,
  heavy_thunder_with_hail: heavyThunderWithHail,
  default: alert,
};

export default images;
