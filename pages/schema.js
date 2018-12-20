import React from 'react'
import PageLayout from "../component/ui/PageBody"
import ReactTable from "react-table"
import rest from "../component/context/Rest"

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import {withStyles} from '@material-ui/core/styles'

import TablePagination from '@material-ui/core/TablePagination'
import {withPage} from "../component/context/HOC"

class Schema extends React.Component {

    static async getInitialProps({req}) {

        var datacount = await rest.runFunction('allSchemaStat', {})

        return {
            data: datacount.data.result
        }
    }

    handleChangePage = () => {

    }


    render() {

        const CustomTableCell = withStyles(theme => ({
            head: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell)


        return (
            <Paper elevation={1}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Schema Name</CustomTableCell>
                            <CustomTableCell numeric>Data Count</CustomTableCell>
                            <CustomTableCell numeric>Size</CustomTableCell>
                            <CustomTableCell numeric>IndexSize</CustomTableCell>
                            <CustomTableCell numeric>StorageSize</CustomTableCell>
                            <CustomTableCell>Actions</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.data && this.props.data.map(row => {
                            return (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell numeric>{row.count}</TableCell>
                                    <TableCell numeric>{row.size}</TableCell>
                                    <TableCell numeric>{row.indexSize}</TableCell>
                                    <TableCell numeric>{row.storageSize}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="Edit"><Icon fontSize="small">edit</Icon></IconButton>
                                        <IconButton aria-label="refresh"><Icon
                                            fontSize="small">refresh</Icon></IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={this.props.data.length}
                    rowsPerPage={10}
                    page={0}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                />
            </Paper>
        )
    }
}

export default withPage(Schema)