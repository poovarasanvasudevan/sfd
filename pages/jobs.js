import React from 'react'
import PageLayout from "../component/ui/PageBody"

class Jobs extends React.Component {

    static async getInitialProps({req}) {

        return {}
    }


    render() {
        return (
            <PageLayout>
                <h1 className="padding0 margin0">Jobs</h1>
            </PageLayout>
        )
    }
}

export default Jobs