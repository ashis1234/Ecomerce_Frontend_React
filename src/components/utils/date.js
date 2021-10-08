import React from "react";
import { Chip } from "@material-ui/core";


export default function Date1(props){
    const val = props.date
    var x = new Date(val.toString())
    const date = x.getDate();
    const month = x.getMonth();
    const year = x.getFullYear();
    const dtStr = date.toString() +"-"+ month.toString()+"-" + year.toString() + " " + x.getHours().toString() + ":" + x.getMinutes().toString() +":"+ x.getSeconds().toString()
    console.log(date)
    return(
        <div><Chip label={dtStr} ></Chip></div>
    )
};