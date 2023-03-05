import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

class LineChart extends React.Component {

  render() {
    if (this.props.results.length === 0) {
      return (
        <div id="graph">
        </div>
      )
    }


    const options = {
      responsive: true,
      plugins: {
        legend: {
           display: false
        },
        tooltips: {
           enabled: false
        },
      },
    };
    const data = {
      labels: this.props.results.map((item) => item.number1+this.props.sign+item.number2),
      datasets: [
        {
          label: '',
          data: this.props.results.map((item) => parseFloat(item.time.replace(":", "."))),
          borderColor: 'var(--cacti_color)',
          backgroundColor: 'var(--cacti_color)',
        },
      ]
    }

    return <Line data={data} options={options} />;
  }
}


export default LineChart;