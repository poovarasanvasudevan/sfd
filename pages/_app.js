import React from 'react'
import App, {Container} from 'next/app'
import Head from 'next/head'
import {MuiThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import Context from '../component/context/Context'
import Router from 'next/router'
import MProvider from '../component/context/MProvider'

// Router.events.on('routeChangeStart', (url) => {
//     NProgress.start()
// })
// Router.events.on('routeChangeComplete', () => NProgress.done())
// Router.events.on('routeChangeError', () => NProgress.done())
//


class MyApp extends App {

    static async getInitialProps ({ Component, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    constructor(props) {
        super(props)
        this.pageContext = Context()
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }

    }
    componentWillUnmount () {
    }
    render() {
        const {Component, pageProps} = this.props
        return (
            <Container>

                <Head>
                    <title>Service Focus | Dashboard</title>
                </Head>
                <JssProvider registry={this.pageContext.sheetsRegistry} generateClassName={this.pageContext.generateClassName}>
                    <MuiThemeProvider theme={this.pageContext.theme} sheetsManager={this.pageContext.sheetsManager}>
                        <CssBaseline/>
                        <MProvider>
                            <Component pageContext={this.pageContext} {...pageProps} />
                        </MProvider>
                    </MuiThemeProvider>
                </JssProvider>

            </Container>
        )
    }
}

export default MyApp