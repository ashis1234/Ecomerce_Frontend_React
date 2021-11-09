import axios from "axios";
// import React, { useEffect, useState } from "react";
import Exmpales from "./card";
import {Grid} from "@material-ui/core"
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styled from "styled-components";
import { Paper } from "@material-ui/core";
// export default function ProductList(props){
//     const [Apidata,setApidata] = useState([])
//     const SetCartCount = props.SetCartCount

//     useEffect(()=>{
//         axios.get('http://127.0.0.1:8000/products/product/')
//         .then((response)=>{
//             const data = response.data.data
//             setApidata(data)
//         }).catch((error)=>{
//             console.log(error);
//         })
//     })


//     return(
//         <div>
//             <Grid  container spacing={{ xs: 3, md: 3 }} >
//                 {Apidata.map((row, index) => (
//                     <Grid item xs={2} sm={4} md={4} key={index}>
//                         <Exmpales SetCartCount = {SetCartCount} product = {row}/>
//                     </Grid>
//                 ))}
//             </Grid>
//         </div>
//     )
// };

import messageArr from '../utils/message';
import { ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
export default function ProductList(props){
    const [Apidata,setApidata] = useState([])
    const [page,setPage] = useState(1)
    const [total_pages,setTotal_pages] = useState(0)
    const [pageSize,setpageSize] = useState(3)
    const SetCartCount = props.SetCartCount
    const CartCount = props.CartCount
    
    const Searchquery = props.Searchquery
    const [pageSizes,setpageSizes] = useState([3,6,9])    
    const [order,setOrder] = useState('')
    // const [tags,setTags] = useState('')
    const [change,setChange] = useState(false)
    let tags = '';
    if('match' in props)
        tags = props.match.params.name;
    
    useEffect(()=>{

        if(messageArr.length){
            setChange(false);
            const msg = messageArr[messageArr.length-1];
            if(msg.status === 'success'){
              toast.success(msg.body,{
                position:"top-right",
              });
            }else if(msg.status === 'info'){
              toast.info(msg.body,{
                position:"top-right",
              });
            }else{
              toast.error(msg.body,{
                position:"top-right",
    
              });
            }
            messageArr.pop();
          }



        let url = `http://127.0.0.1:8000/products/product/?page=${page}&&query=${Searchquery}&&size=${pageSize}`
        if(order)
            url += `&&order=${order}`;
        if(tags)
            url += `&&tags=${tags}`;
        
        axios.get(url,
        ).then((response) => {
            const data = response.data;
            if('message' in data){
                setTotal_pages(data.total_pages);
                setApidata([]);
            }else{
                setApidata(data.data);
                setTotal_pages(data.total_pages);
                console.log(data.total_pages);
            }
        })
        .catch((e) => {
            setTotal_pages(0);
            console.log(e);
            setApidata([]);
        });
    },[order,Searchquery, page,total_pages,pageSize,tags])
    
    const Item = styled(Paper)(({ theme }) => ({
      ...theme.typography.body2,
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));
    
  
    return (
      <div>
        <div>
            <ToastContainer/>
            <Select
                style ={{float:'right',width:"30",marginBottom:"20px"}}
                id="product sort based on some key"
                value={order}
                label="Product Order"
                onChange={(e)=>{setOrder(e.target.value)}}
            >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"newest"}>Newest To Oldest</MenuItem>
            <MenuItem value={"oldest"}>Oldest To Newest</MenuItem>
            <MenuItem value={"Price_By_Asc"}>Price Acending</MenuItem>
            <MenuItem value={"Price_By_Desc"}>Price Decending</MenuItem>

            </Select>
            
            <Grid  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                 {Apidata.map((row, index) => (
                     <Grid item  xs={2} sm={4} md={4} key={index} >
                         <Exmpales CartCount= {CartCount} SetCartCount = {SetCartCount} product = {row}/>
                         <hr/>
                     </Grid>
                 ))}
            </Grid>
            <br/>{
            <>
                <Pagination
                    style ={{float:'right',paddingLeft:"20px"}}
                    count={total_pages}
                    page={page}
                    siblingCount={1}
                    boundaryCount={2}
                    variant="outlined"
                    shape="rounded"
                    color="secondary"
                    onChange={(e,value) => {setPage(value)}}
                />
                <Select
                    style ={{float:'right'}}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={pageSize}
                    label="Category Name"
                    onChange={(e)=>{setpageSize(e.target.value)}}
                >
                {pageSizes.map((row) =>(
                    <MenuItem value={row}>{row}</MenuItem>
                ))}
                </Select>
            </>
            }
        </div>
      </div>
    );
}
