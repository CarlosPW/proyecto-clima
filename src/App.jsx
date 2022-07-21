import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { DailyDataContext } from "../contexts/DataContext";

import { Block } from "./components";
import { dateConverter, getDay, getYear } from "../utils/TimeConverter";

const App = () => {
  const { dailyData } = useContext(DailyDataContext);

  if (!dailyData) return;

  return (
    <AppStyled>
      <Header>
        <h3>
          Santiago,
          <br /> CL
        </h3>
        <p>
          {dateConverter(dailyData.current.dt)} <br />
          {getYear(dailyData.current.dt)}
        </p>
      </Header>

      <div className="block--container">
        {dailyData &&
          dailyData.daily.map((day, index) => {
            return index >= 6 || index === 0 ? null : (
              <Link to={`/${getDay(day.dt)}`} key={day.dt}>
                <Block data={day} details />
              </Link>
            );
          })}
      </div>

      <footer>Prueba Técnica forEach</footer>
    </AppStyled>
  );
};

export default App;

const AppStyled = styled.div`
  .block--container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 30px;
    margin-top: 40px;
  }

  footer {
    margin-top: 100px;
    text-align: center;
  }
`;

const Header = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  & > h3 {
    font-weight: 700;
    font-size: 23px;
  }

  & > p {
    text-align: right;
  }
`;
