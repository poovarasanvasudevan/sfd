import React from 'react'
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts'
import Typography from "@material-ui/core/Typography"

export default class DataCountPieChart extends React.Component {

    state = {
        colorArray: []
    }

    componentDidMount() {
        var len = this.props.chart.length
        var cArray = []
        for (var i = 0; i < len; i++) {
            cArray[i] = this.getRandomColor()
        }

        this.setState({
            colorArray: cArray
        })
    }

    getRandomColor = () => {
        const letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }


    render() {
        return (
            <div>
                <PieChart width={400} height={400}>
                    <Pie
                        isAnimationActive={true}
                        outerRadius={100}
                        fill="#8884d8"
                        label
                        data={this.props.chart}
                        nameKey="name"
                        legendType="circle"
                        dataKey="count">
                        {
                            this.props.chart.map((entry, index) => <Cell key={"PIE_" + index}
                                                                         fill={this.state.colorArray[index]}/>)
                        }
                    </Pie>
                    <Legend/>
                    <Tooltip/>
                </PieChart>
            </div>
        )
    }
}
