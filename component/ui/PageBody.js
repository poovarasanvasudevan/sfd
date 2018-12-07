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
import axios from 'axios'

const drawerWidth = 280

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 2,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 8,
    },
    toolbar: theme.mixins.toolbar,
})


class PageBody extends React.Component {
    state = {
        open: false,
        schemaopen: false,
        schema : [{
            className : "LOading"
        }]
    };

    async componentDidMount() {
        Parse.serverURL = "http://localhost:3000/parse";
        Parse.initialize('myAppId', 'jskey', 'myMasterKey');

        // const ratings = await Parse.Cloud.run("allCount", {});
        // console.log(ratings)
        //

        //

        //


        // var Schema = Parse.Object.extend("_SCHEMA");
        // var query = new Parse.Query(Schema);
        // query.useMasterKey = true;
        // query.find({
        //     success : (results) => {
        //         console.log(JSON.stringify(results));
        //     },
        //     error : (err) => {
        //         console.log("err : " + JSON.stringify(err));
        //     }});
    }


    handleSchema = (schemaopen) => {
        this.setState({schemaopen : !schemaopen});
    };

    dropDownList = [
        {
            text: 'Schemas',
            icon: 'storage'
        }, {
            text: "Jobs",
            icon: "alarm",
            children: [
                "All Jobs",
                "Scheduled Jobs",
                "Job Status"
            ]
        }, {
            text: "Config",
            icon: "settings"
        },
        {
            text: "Logs",
            icon: "notes"
        },
        {
            text: "Webhooks",
            icon: "web"
        }, {
            text: "Push Services",
            icon: "notifications"
        }
    ]


    render() {

        const {classes} = this.props

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <Toolbar/>
                <Drawer
                    elevation={16}
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar}/>
                    <List dense={true}>
                        {this.dropDownList.map((dItem, index) => {
                            if (dItem.children == null) {
                                return (<ListItem button key={dItem.text}>
                                    <ListItemIcon><Icon>{dItem.icon}</Icon></ListItemIcon>
                                    <ListItemText primary={dItem.text}/>
                                </ListItem>)
                            } else {
                                return (
                                    <React.Fragment>
                                        <ListItem button key={dItem.text}  onClick={this.handleClick}>
                                            <ListItemIcon><Icon>{dItem.icon}</Icon></ListItemIcon>
                                            <ListItemText primary={dItem.text}/>
                                        </ListItem>
                                        <Collapse key="collapser"   in={this.state.open} timeout="auto" unmountOnExit>
                                            <List dense={true} component="div" disablePadding>
                                                {dItem.children.map((i, a) => (
                                                    <ListItem button className={classes.nested} key={i}>
                                                        <ListItemText>{i}</ListItemText>
                                                    </ListItem>
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