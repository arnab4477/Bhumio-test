import React, { useState } from 'react'
import { Button } from '@mui/material'
import { useTreeState } from '../../contexts'
import {style} from './Button';

export const ExportFamilyBtn = () => {

  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
 
  const [data,setData]=useTreeState();
  
  const printToPdf = () => {
    handleOpen()
  };
  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    }   

    function onDownload(){
        download(JSON.stringify(data), "FamilyTree.json", "text/plain");
    }
  return (
    <>
      <Button sx={style}  variant="contained" component="label" onClick={e =>onDownload()}>
        Export Json
      </Button>
      
    </>
  )

}

