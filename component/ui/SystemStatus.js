import React from 'react'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import deepOrange from '@material-ui/core/colors/deepOrange';

class SystemStatus extends React.Component {

    render() {

        return (
            <List dense={true}>
                {this.props.dbStat && this.props.dbStat.map((data) => (
                    <ListItem>
                        <Avatar style={{
                            color :'#fff',
                            backgroundColor : deepOrange[500]
                        }}>
                            <Icon>donut_large</Icon>
                        </Avatar>
                        <ListItemText primary={data.text} secondary={data.subtitle}/>
                    </ListItem>
                ))}
            </List>
        )
    }

}

export default SystemStatus