import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from './Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Icon from '@material-ui/core/Icon'
import {Parse} from 'parse'
import classNames from 'classnames'
import BlockUi from 'react-block-ui'
import Link from 'next/link'

const drawerWidth = 250

const styles = theme => ({

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },

    root: {
        display: 'flex',
    },

    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 8,
    }
})


class PageBody extends React.Component {
    state = {
        dOpen: true,
        open: false,
        schemaopen: false,
        schema: [{
            className: "LOading"
        }],
        blocking: false,
    }

    handleDrawer = () => {
        this.setState(state => ({dOpen: !state.dOpen}))
        localStorage.setItem("sidebar", !this.state.dOpen)
    }


    async componentDidMount() {
        Parse.serverURL = "http://localhost:3000/parse"
        Parse.initialize('myAppId', 'jskey', 'myMasterKey')

        this.setState(state => ({dOpen: localStorage.getItem("sidebar") == null ? true : (localStorage.getItem("sidebar") === "true")}))

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/static/js/sw.js')
            })
        }
    }

    componentDidUpdate() {
    }

    handleCollapse = (e) => {
        this.setState({[e]: !this.state[e]})
    }


    componentWillUnmount() {

    }

    dropDownList = [
        {
            text: 'Dashboard',
            icon: 'home',
            href: '/'
        },
        {
            text: 'Schemas',
            icon: 'storage',
            href: '/schema'
        }, {
            text: "Jobs",
            icon: "alarm",
            href: '/jobs'
            // children: [
            //     {
            //         text: "All Jobs"
            //     },
            //     {
            //         text: "Scheduled Jobs"
            //     },
            //     {
            //         text: "Job Status"
            //     },
            //     {
            //         text: "Job Queue"
            //     }
            // ]
        }, {
            text: "Config",
            icon: "settings"
        },
        {
            text: "Calendar",
            icon: "calendar_today"
        },
        {
            text: "Flow Editor",
            icon: "graphic_eq"
        },
        {
            text: "Applications",
            icon: "table_chart"
        },

        {
            text: "Logs",
            icon: "notes"
        },
        {
            text: "Webhooks",
            icon: "web"
        },
        {
            text: "Push Services",
            icon: "notifications"
        }
    ]

    render() {

        const {classes} = this.props

        return (

            <div className={classes.root} key="root">
                <CssBaseline/>
                <Toolbar key="tBar" menuAction={this.handleDrawer}/>
                <Drawer key="drawer" elevation={16} variant="permanent"
                        className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.dOpen,
                        [classes.drawerClose]: !this.state.dOpen,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.dOpen,
                            [classes.drawerClose]: !this.state.dOpen,
                        }),
                    }}
                    open={this.state.dOpen}>

                    <div className={classes.toolbar} />
                    <List dense={true} disablePadding>
                        {this.dropDownList.map((dItem, index) => {
                            if (dItem.children == null) {
                                return (
                                    <Link key={dItem.text + "_link"} href={dItem.href == null ? '#' : dItem.href}>
                                        <ListItem button key={dItem.text}>
                                            <ListItemIcon><Icon>{dItem.icon}</Icon></ListItemIcon>
                                            <ListItemText primary={dItem.text}/>
                                        </ListItem>
                                    </Link>
                                )
                            } else {
                                return (
                                    <React.Fragment>
                                        <Link key={dItem.text + "_link"} href={dItem.href == null ? '#' : dItem.href}>
                                            <ListItem disablePadding button key={dItem.text} onClick={this.handleCollapse.bind(this, dItem.text)}>
                                                <ListItemIcon><Icon>{dItem.icon}</Icon></ListItemIcon>
                                                <ListItemText primary={dItem.text}/>
                                                {/*{this.state[dItem.text] ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}*/}
                                            </ListItem>
                                        </Link>
                                        <Collapse key="collapser" in={this.state[dItem.text]} timeout="auto" unmountOnExit>
                                            <List dense={true} component="div" disablePadding>
                                                {dItem.children.map((i, a) => (
                                                    <Link key={i.text + "_link"} href={dItem.href == null ? '#' : dItem.href}>
                                                        <ListItem button className={classes.nested} key={i.text}>
                                                            <ListItemText>{i.text}</ListItemText>
                                                        </ListItem>
                                                    </Link>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </React.Fragment>
                                )
                            }
                        })}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <div>
                        {this.props.children}
                    </div>
                </main>
            </div>
        )
    }
}


PageBody.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PageBody)