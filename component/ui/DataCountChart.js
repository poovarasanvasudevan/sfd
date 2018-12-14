import React from 'react'
import ReactChartkick, {ColumnChart} from 'react-chartkick'
import Chart from 'chart.js'
import Highcharts from 'highcharts'

class DataCountChart extends React.Component {

    componentDidMount() {

    }

    componentWillMount() {
        ReactChartkick.addAdapter(Chart)
    }

    render() {
        return (
            <ColumnChart data={this.props.chart} download={true}  />
        )
    }
}

export default DataCountChart