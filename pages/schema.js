import React from 'react'
import PageLayout from "../component/ui/PageBody"
import ReactTable from "react-table";


class Schema extends React.Component {

    static async getInitialProps({req}) {

        const columns = [
            {
                Header: 'Schema Name',
                accessor: 'className' // String-based value accessors!
            },
            {
                Header: 'Created Date',
                accessor: 'createdOn'
            }
        ]

        return {
            columns : columns
        }
    }


    render() {
        return (
            <PageLayout>
                <h1>Hello</h1>
            </PageLayout>
        )
    }
}

export default Schema