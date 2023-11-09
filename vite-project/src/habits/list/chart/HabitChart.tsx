import './HabitChart.css';
import { useEffect, useRef } from "react";
import { ChartData } from "./chart-data";

interface HabitChartProps {
  chartData: ChartData
}

const HabitChart = ({ chartData }: HabitChartProps) => {
  const chartElement = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    google.charts.load('current', {
      packages: ['line']
    });
    google.charts.setOnLoadCallback(drawChart);
  }, [chartData]);

  function drawChart(): void {
    const data = createDataTable();
    const options = {
      chart: {
        title: 'Progression',
        subtitle: 'Days completed over time'
      },
      legend: {
        position: 'none'
      },
      backgroundColor: {
        fill: '#222222',

      },
      chartArea: {
        backgroundColor: '#222222'
      },
      colors: [ '#00FF54' ]
    }
    // Seems like since Material Charts is in beta, types aren't available.
    // @ts-ignore
    const chart = new google.charts.Line(chartElement.current, google.charts.Line.convertOptions);
    // @ts-ignore
    chart.draw(data, google.charts.Line.convertOptions(options));
  }

  function createDataTable(): google.visualization.DataTable {
    const data = new google.visualization.DataTable();
    data.addColumn('date');
    data.addColumn('number', 'Count');
    data.addRows(getDataRows());
    return data;
  }

  function getDataRows() {
    const dates = chartData.dates.map(date => new Date(date));
    const matrix: any[] = [];
    for (let i = 0; i < dates.length; i++) {
      matrix.push([dates[i], chartData.values[i]]);
    }
    if (matrix.length == 0) {
      matrix.push([new Date(), 0]);
    }
    return matrix;
  }

  return (
    <div ref={chartElement} className='chart'></div>
  )
}

export default HabitChart;