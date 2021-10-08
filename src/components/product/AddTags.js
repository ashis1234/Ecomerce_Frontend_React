import React, { useEffect, useState } from 'react';
import './Style.css';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios';


const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function AddTags(){

    const [TAGS,setTAGS] = useState([])
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/products/category/').then((response)=>{
            setTAGS(response.data)
        })
    },[])

    const suggestions = TAGS.map(tag => {
        return {
            id: tag.cat_name,
            text: tag.cat_name
        };
    });
  const [tags, setTags] = useState([]);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    console.log(currPos,newPos)
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };



  return (
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          inputFieldPosition="bottom"
          autocomplete
        />
      </div>
  );
};

