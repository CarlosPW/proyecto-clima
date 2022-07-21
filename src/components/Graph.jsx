import { useEffect, useState } from "react";
import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from "@visx/xychart";

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

export const LineChart = ({ dailyThreeHoursData }) => {
  const [dataEveryThreeHour, setDataEveryThreeHour] =
    useState(dailyThreeHoursData);

  const [dataToGraph, setDataToGraph] = useState();

  const handleGetData = () => {
    const newData = dataEveryThreeHour.list.map((item) => {
      return { x: item.dt_txt, y: Math.round(item.main.temp) };
    });

    setDataToGraph(newData);
  };

  useEffect(() => {
    handleGetData();
  }, [dataEveryThreeHour]);

  if (!dataEveryThreeHour || !dataToGraph) return;

  return (
    <XYChart height={400} xScale={{ type: "band" }} yScale={{ type: "linear" }}>
      <AnimatedAxis orientation="left" />
      <AnimatedAxis orientation="bottom" />
      <AnimatedGrid columns={false} numTicks={4} />

      <AnimatedLineSeries dataKey="Line 2" data={dataToGraph} {...accessors} />

      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => (
          <div>
            <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
              {tooltipData.nearestDatum.key}
            </div>
            {accessors.xAccessor(tooltipData.nearestDatum.datum)}
            {", "}
            {accessors.yAccessor(tooltipData.nearestDatum.datum)}°C
          </div>
        )}
      />
    </XYChart>
  );
};
