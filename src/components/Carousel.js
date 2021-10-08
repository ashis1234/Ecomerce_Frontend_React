import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper} from '@material-ui/core'

export default function Slide(props)
{
    var items = [
        {
            name: "Random Name #1",
            img: "https://picsum.photos/1200/500"
        },
        {
            name: "Random Name #2",
            img: "https://picsum.photos/1200/500"
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <img src={props.item.img} alt="carousel"></img>
        </Paper>
    )
}

