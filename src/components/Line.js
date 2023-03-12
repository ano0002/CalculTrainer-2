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
import Cookies from 'js-cookie';

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
                }
            },
            scales: {
                y:{
                    ticks:{
                        color: Cookies.get("cacti_color") ?? "#09814A",
                        fontSize: 12,
                    }
                },
                x: {
                    ticks:{
                        color: Cookies.get("cacti_color") ?? "#09814A",
                        fontSize: 12,
                    }
                }
            }
        };
        const data = {
            labels: this.props.results.map((item) => item.number1+this.props.sign+item.number2),
            datasets: [
                {
                    label: '',
                    data: this.props.results.map((item) =>item.time/1000),
                    borderColor: Cookies.get("cacti_color") ?? "#09814A",
                    backgroundColor: Cookies.get("cacti_color") ?? "#09814A",
                },
            ]
        }

        return <Line data={data} options={options} />;
    }
}


export default LineChart;