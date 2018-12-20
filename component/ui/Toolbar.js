import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Badge from '@material-ui/core/Badge'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import {fade} from '@material-ui/core/styles/colorManipulator'
import {withStyles} from '@material-ui/core/styles'
import Link from 'next/link'

const styles = theme => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
        //  boxShadow: "0px 1px 2px -1px rgba(0, 0, 0, 0.2), 0px 2px 3px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        marginRight: 20,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 7,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    toolbars: {
        boxShadow: "0px 1px 2px -1px rgba(0, 0, 0, 0.2), 0px 2px 3px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)"
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 8,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
})

function SearchAppBar(props) {
    const {classes} = props
    return (
        <AppBar position="fixed" elevation={1} className={classes.root}>
            <Toolbar style={{minHeight:60}}>
                <IconButton className={classes.menuButton}
                            color="inherit"
                            onClick={props.menuAction}
                            aria-label="Open drawer">
                    <Icon>menu</Icon>
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.grow}>
                    Service Focus
                </Typography>
                {/*<div style={{backgroundColor: '#fff'}}>*/}
                    {/*<Link href="/">*/}
                        {/*<img*/}
                            {/*src="https://services-staging.ctsmartdesk.com/ServiceFocus//Images/LogIn/logo_final.png"*/}
                            {/*height={45}/>*/}
                    {/*</Link>*/}
                {/*</div>*/}
                <div className={classes.grow}/>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <Icon>search</Icon>
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </div>

                <div>

                    <IconButton color="inherit">
                        <Icon>notifications</Icon>
                    </IconButton>

                    <IconButton color="inherit">
                        <Icon>account_circle</Icon>
                    </IconButton>
                </div>

            </Toolbar>
        </AppBar>
    )
}

SearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SearchAppBar)