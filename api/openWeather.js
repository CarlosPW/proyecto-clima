import axios from "axios";

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
});

const apiKey = "9139781bdb76393d91cb2200c09e8062";

export { weatherApi, apiKey };
