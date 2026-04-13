import React from 'react'
import Chip from '@mui/material/Chip';

const GetStatusChip = ({status}) => {
    const configs ={
        ACTIVE:{label:"Active", color:"success"},
        OVERDUE:{label:"Overdue", color:"error"},
        PENDING:{label:"Pending", color:"warning"},
        READY:{label:"Read", color:"primary"},   
    };

    const config = configs[status] || {label: status, color: "default"};
    return <Chip label={config.label} color={config.color} size="small"/>

}
export default GetStatusChip