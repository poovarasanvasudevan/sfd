import React from 'react'

import tColor from '@material-ui/core/colors/green'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'


class DataCountChart extends React.Component {

    render() {
        return (

            <BarChart width={650}
                      height={300}
                      data={this.props.chart}
                      margin={{top: 25, right: 15, left: 15, bottom: 15}}>
                <CartesianGrid stroke='#f5f5f5'/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey="count" fill={tColor[500]}/>
            </BarChart>

        )
    }
}

export default DataCountChart