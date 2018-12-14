import React from 'react'
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import deepOrange from '@material-ui/core/colors/deepOrange';

class SystemStatus extends React.Component {

    buildData = (cloudRun) => {
        return  [
            {
                icon: "",
                text: "Database",
                subtitle: cloudRun.db
            },
            {
                icon: "",
                text: "Collection",
                subtitle: "Total : " + cloudRun.collections
            },
            {
                icon: "",
                text: "Objects",
                subtitle: "Total : " + cloudRun.objects
            },
            {
                icon: "",
                text: "Average Obj Sizes",
                subtitle: "Avg : " + cloudRun.avgObjSize
            },
            {
                icon: "",
                text: "Data Size",
                subtitle: "Total : " + cloudRun.dataSize + " Bytes"
            },
            {
                icon: "",
                text: "Storage Size",
                subtitle: "Total : " + cloudRun.storageSize + " Bytes"
            },
            {
                icon: "",
                text: "Index Size",
                subtitle: "Total : " + cloudRun.indexSize + " Bytes"
            }
        ];
    }

    config = [];
    componentWillMount() {
        this.config =  this.buildData(this.props.dbStat)
    }

    render() {


        return (
            <List dense={true}>
                {this.config && this.config.map((data) => (
                    <ListItem key={data.text}>
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