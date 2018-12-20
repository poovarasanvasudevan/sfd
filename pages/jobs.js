import React from 'react'
import PageLayout from "../component/ui/PageBody"
import {withPage} from "../component/context/HOC"

class Jobs extends React.Component {

    static async getInitialProps({req}) {

        return {}
    }


    render() {
        return (

                <h1 className="padding0 margin0">Jobs</h1>
        )
    }
}

export default withPage(Jobs)