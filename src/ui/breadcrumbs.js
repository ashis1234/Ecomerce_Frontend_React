import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import {Link} from "react-router-dom";

export default function BreadcrumbsSection(props) {
    console.log(props);
    const linkList = JSON.parse(props.linkList)
    console.log(linkList)
    const renderLinks = () => {
        return linkList.splice(0, linkList.length-1).map(({name, link}) => {
            if(link.length > 0) {
                return (
                    <Link color="inherit" to={link} key={name}>
                        {name}
                    </Link>
                )
            }
        })
    }


    return (
        <Breadcrumbs aria-label="breadcrumb">
            {renderLinks()}
            <Typography color="textPrimary">{linkList[linkList.length - 1].name}</Typography> 
        </Breadcrumbs>
    );
}
