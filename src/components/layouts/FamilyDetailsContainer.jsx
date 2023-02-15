import { red } from '@mui/material/colors'
import { borderRadius } from '@mui/system'
import React from 'react'
import { useSelectedNodeState } from '../../contexts'
import { initialFamilyInfoState } from '../../utils'
import { LayoutHeader } from '../LayoutHeader'

const Label = ({label, value}) => {
  return(
    <div
      style={{
        display: 'flex',
        alignItems : 'center',
        margin: '10px',
        width: '100%'
      }}
    >
      <div 
        style={{
          minWidth: '25%', 
          display : 'flex', 
          justifyContent : 'space-between', 
          alignItems : 'center'
        }} 
      >
        {label} <span>:</span>
      </div>
      {label !== "Family Photo" ? <div style={{marginLeft : '8px'}}>{value}</div> : <div>{value?.map(src => <img src={src} alt={"Family"} key={src} width={100} />)}</div>}
    </div>
  )
}

const FamilyDetails = () => {
  
  const [selectedNode] = useSelectedNodeState()

  return(
    <>
      <div
        style={{
          display: 'flex',
          alignItems : 'center',
          gap: '10px',
          padding: '10px'
        }}
      >
        <div>
          {selectedNode && Object.keys(initialFamilyInfoState).map(key => {
            return(
              <>
                {selectedNode[key] && <Label key={key} label={key} value={selectedNode[key]}/>}
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}


export const FamilyDetailsContainer = () => {

  return (
    <div
        style={{
            flexGrow: '1',
            backgroundColor:'#d2d2d2',
            borderRadius:'20px',
            padding:'20px'
            
        }}
    >

        <LayoutHeader style={{marginTop:'12px'}}header={'Family Details'} />
        <hr style={{
            border:'none',
            marginTop:'15px',
            
            height: '0px',
            boxShadow:'0 1px 2px 1px #8789f3',
            width:'95%',
            margin:'auto auto'
         }}/>

        <FamilyDetails/>
    </div>
  )
}
