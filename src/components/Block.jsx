import React from "react";
import styled from "styled-components";
import { dateConverter, getYear } from "../../utils/TimeConverter";

export const Block = ({ details, data }) => {
  return (
    <Container details={details}>
      {details && (
        <p className="date">
          {`${dateConverter(data.dt)} ${getYear(data.dt)}`}
        </p>
      )}

      <div className="block--detail">
        <span>{Math.round(data.temp.day)}°C</span>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
      </div>

      {!details && (
        <p className="date">{`${dateConverter(data.dt)} ${getYear(
          data.dt
        )}`}</p>
      )}

      {details && (
        <div className="block--description">
          <div className="_left">
            <p>Máxima: {Math.round(data.temp.max)}°C</p>
            <p>Mínima: {Math.round(data.temp.min)}°C</p>
          </div>

          <div className="_right">{data.weather[0].description}</div>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  border-radius: 16px;
  cursor: pointer;
  margin: 0;
  padding: ${({ details }) => (details ? "30px" : "0px 30px 20px 30px")};
  width: 100%;

  &:hover {
    opacity: 0.7;
  }

  & > .block--detail {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-weight: 500;
      font-size: ${({ details }) => (details ? "44px" : "35px")};
    }
  }

  & > .block--description {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ._right {
      color: #b8adf0;
      text-align: center;
      margin: 10px 0;
      width: 100px;
      height: 30px;
    }

    @media (min-width: 360px) {
      flex-direction: row;
    }
  }
`;
