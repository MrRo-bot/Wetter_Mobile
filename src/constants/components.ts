import AirQuality from "@/src/components/home/AirQuality";
import Brief from "@/src/components/home/Brief";
import Chart from "@/src/components/home/Chart";
import Daily from "@/src/components/home/Daily";
import Daytime from "@/src/components/home/Daytime";
import Detail from "@/src/components/home/Detail";
import Hourly from "@/src/components/home/Hourly";
import Wind from "@/src/components/home/Wind";

import DewPointChart from "@/src/components/charts/DewPointChart";
import HumidityChart from "@/src/components/charts/HumidityChart";
import Radiation from "@/src/components/charts/Radiation";
import Temperature from "@/src/components/charts/Temperature";
import UVChart from "@/src/components/charts/UVChart";
import WindChart from "@/src/components/charts/WindChart";

import Footer from "@/src/components/UI/Footer";
import Loader from "@/src/components/UI/Loader";
import MainButton from "@/src/components/UI/MainButton";

import DailyAqiCharts from "@/src/components/aqiCharts/DailyAqiCharts";
import HourlyAqiCharts from "@/src/components/aqiCharts/HourlyAqiCharts";

import SavedLocationCard from "@/src/components/savedLocation/SavedLocationCard";

import LocationSearchItem from "@/src/components/locationSearch/LocationSearchItem";

import NotificationSetup from "@/src/services/NotificationSetup";

import AirQualitySection from "../components/Notification/AirQualitySection";
import ChanceOfPrecipitationSection from "../components/Notification/ChanceOfPrecipitationSection";
import DailyNotificationSection from "../components/Notification/DailyNotificationSection";
import RainAndSnowSection from "../components/Notification/RainAndSnowSection";
import TimeSection from "../components/Notification/TimeSection";
import WeatherAlertsSection from "../components/Notification/WeatherAlertsSection";

export default {
  AirQuality,
  Brief,
  Chart,
  Daily,
  Detail,
  Hourly,
  Daytime,
  Wind,

  DewPointChart,
  HumidityChart,
  Temperature,
  Radiation,
  UVChart,
  WindChart,

  Footer,
  Loader,
  MainButton,

  DailyAqiCharts,
  HourlyAqiCharts,

  SavedLocationCard,
  LocationSearchItem,

  NotificationSetup,

  AirQualitySection,
  ChanceOfPrecipitationSection,
  DailyNotificationSection,
  RainAndSnowSection,
  TimeSection,
  WeatherAlertsSection,
};
