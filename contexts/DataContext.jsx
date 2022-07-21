import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { apiKey, weatherApi } from "../api/openWeather";

export const DailyDataContext = createContext();

export const DataProvider = ({ children }) => {
  const [dailyData, setDailyData] = useState(null);
  const [dailyThreeHoursData, setDailyThreeHoursData] = useState();

  const getData = async () => {
    const { data: dataGet } = await weatherApi.get(
      `onecall?lat=-33.45694&lon=-70.64827&appid=${apiKey}&cnt=1&units=metric&lang=es&exclude=hourly,minutely`
    );

    setDailyData(dataGet);

    const { data: dataThreeHourGet } = await weatherApi.get(
      `forecast?lat=-33.45694&lon=-70.64827&appid=${apiKey}&units=metric&lang=es`
    );
    setDailyThreeHoursData(dataThreeHourGet);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <DailyDataContext.Provider value={{ dailyData, dailyThreeHoursData }}>
      {children}
    </DailyDataContext.Provider>
  );
};
