import React from 'react'
import PageLayout from "../component/ui/PageBody"
import rest from '../component/context/Rest'
import ReactChartkick, { LineChart, PieChart, ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'
import _ from 'lodash'

class Index extends React.Component {

    static async getInitialProps({ req }) {
        ReactChartkick.addAdapter(Chart)
        var cCount = []
        rest.rest().get('/schemas')
            .then((response) => {
                _.each(response.data.results,(d) =>{
                    rest.rest()
                        .get("/classes/" + d.className + "?count=1&limit=0")
                        .then((countResponse) => {
                            var cInner = [d.className, countResponse.data.count]
                            cCount.push(cInner)
                        })
                })

            })
        console.log(cCount)
        return { chart : cCount }
    }

    render() {
        return (
            <PageLayout>
                <ColumnChart data={this.props.chart} />
            </PageLayout>
        )
    }
}


export default Index