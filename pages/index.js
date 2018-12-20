import React from 'react'
import PageLayout from "../component/ui/PageBody"
import rest from '../component/context/Rest'

import deepOrange from '@material-ui/core/colors/deepOrange'
import RGL, {WidthProvider, Responsive as ResponsiveGridLayout} from "react-grid-layout"
import DataCountChart from "../component/ui/DataCountChart"

import css from '../assets/css/app.css'
import DataCountPieChart from "../component/ui/DataCountPieChart"
import {withPage} from "../component/context/HOC"

const ReactGridLayout = WidthProvider(RGL)
const styles = {
    iconStyle: {
        color: '#fff',
        backgroundColor: deepOrange[500]
    }
}

const originalLayouts = getFromLS("layouts") || [
    {i: 'a', x: 0, y: 0, w: 5, h: 2, minW: 5, maxW: 8, minH: 2},
    {i: 'b', x: 9, y: 0, w: 3, h: 3, minH: 3, maxH: 6}
]

function getFromLS(key) {
    let ls = {}
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {}
        } catch (e) {
        }
    }
    return ls[key]
}

function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "rgl-8",
            JSON.stringify({
                [key]: value
            })
        )
    }
}

class Index extends React.Component {

    state = {
        layouts: JSON.parse(JSON.stringify(originalLayouts))
    }

    static async getInitialProps({req}) {
        var cCount = []
        var collectionCount = await rest.runFunction('allCount', {})

        // cmd.get(
        //     'arp -a',
        //     function(err, data, stderr){
        //         console.log(data)
        //     }
        // );

        return {
            chart: collectionCount.data.result
        }
    }

    onLayoutChange = (layouts) => {
        saveToLS("layouts", layouts)
        this.setState({layouts})
    }


    render() {
        return (
            <ReactGridLayout
                className="layout"
                cols={12}
                items={2}
                layout={this.state.layouts}
                onLayoutChange={this.onLayoutChange}
                isResizable={false}>
                <div key="a">
                    <div>
                        <DataCountChart chart={this.props.chart}/>
                    </div>
                </div>
                <div key="b">
                    <div>
                        <DataCountPieChart chart={this.props.chart}/>
                    </div>
                </div>
            </ReactGridLayout>
        )
    }
}


export default withPage(Index)