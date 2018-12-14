import React from 'react'
/* First we will make a new context */
const mContext = React.createContext()

/* Then create a provider Component */


class MProvider extends React.Component {
    state = {
        count: 0
    }

    constructor(props) {
        super(props);
    }



    componentDidMount() {

    }

    componentWillUnmount() {
    }


    render () {
        return (
            <mContext.Provider value={this.state}>
                {this.props.children}
            </mContext.Provider>
        )
    }
}

/* then make a consumer which will surface it */
const MConsumer = mContext.Consumer

export default MProvider
export { MConsumer }