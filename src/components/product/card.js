import React, { useEffect, useState } from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { Chip } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import axios from "axios";
import { useHistory } from "react-router";


export default function Exmpales(props) {
  const [image,setImage] = useState("https://picsum.photos/50/40")
  const [product,setProduct] = useState({})
  const [tag,setTag] = useState([])
  const [title,setTitle] = useState('')
  const SetCartCount = props.SetCartCount
  const history = useHistory();

  useEffect(()=>{
      const product1 = props.product
      setProduct(product1)
      setTag(product1.tags)
      setTitle(product1.title)
      if(product.image  != null)
        setImage(`http://127.0.0.1:8000`+product.image.toString())
  })
  
  

  return (
    <Card style={{padding:"10px"}} sx={{ maxWidth: 345 }}>
      <CardHeader 
        title={<Link to = {`/products/view/${product.id}`} style = {{'text-decoration': 'none',
          '&:focus, &:hover, &:visited, &:link, &:active' :{
              'text-decoration': 'none',
              'color':'black'
          }}}>{product.title}</Link>}
          
          subheader={tag.map((row)=>(
            <Chip 
              label={row.cat_name} 
              variant="outlined"
              clickable={true}
              onClick={()=>{history.push(`/category/${row.cat_name}`)}}
            >


            </Chip>
          ))}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <div style={{fontSize : "25px",fontWeight:"400"}}><img src="http://i.stack.imgur.com/nGbfO.png" width="15" height="20"/>{product.price}</div>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
