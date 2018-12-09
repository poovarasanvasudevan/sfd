import React from 'react'
import PageLayout from "../component/ui/PageBody"
import rest from '../component/context/Rest'
import ReactChartkick, {ColumnChart} from 'react-chartkick'
import Chart from 'chart.js'
import deepOrange from '@material-ui/core/colors/deepOrange';
import RGL, {WidthProvider} from "react-grid-layout";
import SystemStatus from "../component/ui/SystemStatus"

const ReactGridLayout = WidthProvider(RGL);
const styles = {
    iconStyle: {
        color: '#fff',
        backgroundColor: deepOrange[500]
    }
}

class Index extends React.Component {

    static async getInitialProps({req}) {
        ReactChartkick.addAdapter(Chart)
        var cCount = []
        var datas = await rest.rest().get('/schemas')

        for (var i = 0; i < datas.data.results.length; i++) {
            var d = datas.data.results[i]
            var objCount = await rest.rest().get("/classes/" + d.className + "?count=1&limit=0")
            var cInner = [d.className, objCount.data.count, '#b55']
            cCount.push(cInner)
        }
        var layout = [
            {i: 'a', x: 0, y: 0, w: 9, h: 4},
            {i: 'b', x: 9, y: 0, w: 3, h: 4}
        ];
        var cloudRun = await rest.runFunction("dbStats", {})
        cloudRun = cloudRun.data.result



        return {
            chart: cCount,
            layout: layout,
            dbStat: [
                {
                    icon: "",
                    text: "Database",
                    subtitle: cloudRun.db
                },
                {
                    icon: "",
                    text: "Collection",
                    subtitle: "Total : " + cloudRun.collections
                },
                {
                    icon: "",
                    text: "Objects",
                    subtitle: "Total : " + cloudRun.objects
                },
                {
                    icon: "",
                    text: "Average Obj Sizes",
                    subtitle: "Avg : " + cloudRun.avgObjSize
                },
                {
                    icon: "",
                    text: "Data Size",
                    subtitle: "Total : " + cloudRun.dataSize + " Bytes"
                },
                {
                    icon: "",
                    text: "Storage Size",
                    subtitle: "Total : " + cloudRun.storageSize + " Bytes"
                },
                {
                    icon: "",
                    text: "Index Size",
                    subtitle: "Total : " + cloudRun.indexSize + " Bytes"
                }
            ]
        }
    }

    static onLayoutChange(layout) {
        console.log(layout)
    }


    render() {
        return (
            <PageLayout>

                <ReactGridLayout
                    className="layout"
                    cols={12}
                    items={2}
                    isDraggable={false}
                    isResizable={false}
                    layout={this.props.layout}
                    width={500}
                >
                    <div key="a">
                        <ColumnChart data={this.props.chart}/>
                    </div>
                    <div key="b">
                        <SystemStatus dbStat={this.props.dbStat}/>
                    </div>
                </ReactGridLayout>
            </PageLayout>
        )
    }
}


export default Index