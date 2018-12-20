import React from 'react'
import {MConsumer} from "./MProvider"
import PageLayout from "../ui/PageBody"

export const withPage = Page => {
    const WithPage = props => (
        <MConsumer>
            {(context) => (
                <PageLayout>
                    <Page {...props} />
                </PageLayout>
            )}
        </MConsumer>
    )

    WithPage.getInitialProps = async context => {

        return {
            ...(Page.getInitialProps ? await Page.getInitialProps(context) : {})
        }
    }

    return WithPage
}