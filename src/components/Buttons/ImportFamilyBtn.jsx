import React, { useState,useRef} from 'react'
import { Button } from '@mui/material'

import { useTreeState } from '../../contexts';
import {style} from './Button';

export const ImportFamilyBtn = () => {

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inputRef = useRef(null);

  const [data,setData]=useTreeState();
  
  const upload=(e)=>{
    var fr = new FileReader();
    fr.onload = function(e) { 
      
          var result = JSON.parse(e.target.result);
          var formatted = JSON.stringify(result, null, 2);
          result.value = formatted;

          console.log(result);
          setData(result);
         
          
        }

    fr.readAsText(e.target.files.item(0));
    
 }
 
  return (
    <>
        <input id="upload" ref={inputRef} type="file" style={{display: 'none'}} onChange={upload}/> 
        
        <Button   sx={style}   onClick={(e)=> inputRef.current.click()} variant="contained">Import Json</Button>    
       
      {/* <Button variant="contained" component="label" onClick={e =>upload}>
        Export Json
      </Button> */}
      
    </>
  )

}

