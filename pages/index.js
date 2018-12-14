import React from 'react'
import PageLayout from "../component/ui/PageBody"
import rest from '../component/context/Rest'
// import ReactChartkick, {ColumnChart} from 'react-chartkick'
// import Chart from 'chart.js'
import deepOrange from '@material-ui/core/colors/deepOrange'
import RGL, {WidthProvider, Responsive as ResponsiveGridLayout} from "react-grid-layout"
import SystemStatus from "../component/ui/SystemStatus"
import DataCountChart from "../component/ui/DataCountChart"
import {MConsumer} from "../component/context/MProvider"

import css from '../assets/css/app.css'

const ReactGridLayout = WidthProvider(RGL)
const styles = {
    iconStyle: {
        color: '#fff',
        backgroundColor: deepOrange[500]
    }
}

class Index extends React.Component {

    static async getInitialProps({req}) {
        var cCount = []
        var collectionCount = await rest.runFunction('allCount',{})

        var layout = [
            {i: 'a', x: 0, y: 0, w: 9, h: 2, minW: 6, maxW: 10, minH: 2},
            {i: 'b', x: 9, y: 0, w: 3, h: 3, minH: 3, maxH: 6}
        ]

        return {
            chart: collectionCount.data.result,
            layout: layout,
        }
    }

    onLayoutChange(layout) {
        console.log(layout)
    }


    render() {
        return (
            <MConsumer>
                {(context) => (
                    <PageLayout>

                        <ReactGridLayout
                            className="layout"
                            cols={12}
                            items={2}
                            layout={this.props.layout}
               //             isDraggable={false}
                            isResizable={false}
                        >
                            <div key="a">
                                <DataCountChart chart={this.props.chart}/>
                            </div>
                            <div key="b" className={[css.cbLayout , css.padding15]}>

                            </div>
                        </ReactGridLayout>
                    </PageLayout>
                )}
            </MConsumer>
        )
    }
}


export default Index