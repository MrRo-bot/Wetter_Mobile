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
