import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { DailyDataContext } from "../../contexts/DataContext";
import { dateConverter, getDay, getYear } from "../../utils/TimeConverter";
import { LineChart } from "../components/Graph";

export const DayDetails = () => {
  const { day } = useParams();
  const navigate = useNavigate();

  const { dailyData, dailyThreeHoursData } = useContext(DailyDataContext);

  const [currentDay, setCurrentDay] = useState();

  const handleGetCurrentDayData = () => {
    if (!dailyData) return;
    const currentDayArray = dailyData.daily.filter(
      (item) => getDay(item.dt) === day
    );
    setCurrentDay(currentDayArray);
  };

  useEffect(() => {
    handleGetCurrentDayData();
  }, [dailyData]);

  if (!dailyData || !dailyThreeHoursData || !currentDay) return;

  return (
    <Container>
      <Button onClick={() => navigate("/", { replace: true })}>Atrás</Button>

      <Box>
        <h3 className="date">
          {`${dateConverter(currentDay[0].dt)} ${getYear(currentDay[0].dt)}`}
        </h3>
        <div className="block--detail">
          <span className="temp">{Math.round(currentDay[0].temp.day)}°C</span>
          <img
            src={`http://openweathermap.org/img/wn/${currentDay[0].weather[0].icon}@2x.png`}
            alt={currentDay[0].weather[0].description}
          />
        </div>

        <div className="details">
          <p>Máxima: {Math.round(currentDay[0].temp.max)}°C</p>
          <p>Mínima: {Math.round(currentDay[0].temp.min)}°C</p>
          <p>Noche: {Math.round(currentDay[0].temp.night)}°C</p>
          <p>Amanecer: {Math.round(currentDay[0].temp.morn)}°C</p>
          <p>Presión: {Math.round(currentDay[0].pressure)}</p>
          <p>Humedad: {Math.round(currentDay[0].humidity)}</p>
          <p>Viento: {Math.round(currentDay[0].wind_speed)} m/h</p>
        </div>
      </Box>

      <LineChart dailyThreeHoursData={dailyThreeHoursData} />
    </Container>
  );
};

const Box = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  margin: 40px auto;

  .date {
    text-align: center;
    padding: 20px 10px;
  }

  & > .block--detail {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .temp {
      font-weight: 500;
      font-size: 44px;
    }
  }

  .details {
    padding: 20px 0;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    text-align: center;
  }
`;

const Container = styled.div``;

const Button = styled.button`
  background-color: #b8adf0;
  border-radius: 12px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  padding: 15px 20px;

  &:hover {
    opacity: 0.7;
  }
`;
