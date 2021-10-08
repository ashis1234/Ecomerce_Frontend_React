import axios from 'axios';
import  React, { useEffect, useState } from 'react';

export default function ProductView(props){
    const [data,setdata] = useState({})
    
    useEffect(()=>{
        const id = props.match.params.id
        axios.get(`http://127.0.0.1:8000/products/product/${id}`)
        .then((response)=>{
            setdata(response.data)
        })
    },[props.match.params.id])

    console.log(data);
    return (
        <div>
            {data.title}
        </div>
    )

}