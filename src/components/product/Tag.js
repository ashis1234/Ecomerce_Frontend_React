import React from "react";
import { Chip } from "@material-ui/core";


export default function Tag(props){
    const data = props.tags
    return(
        <div>
            {data.map((row)=>(
                <Chip label={row.cat_name} ></Chip>
            ))}
        </div>
    )
};