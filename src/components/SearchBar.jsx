import React,{useState,useEffect} from 'react'
import TextField from '@mui/material/TextField';
import { LayoutHeader } from './LayoutHeader'
import {SearchFamily} from '../utils/search.js';
import './SearchBar.css';
import { useSelectedNodeState, useTreeState,useFilteredIdState,useSearchTextState } from "../contexts";
export default function SearchBar(props) {
    
   // const [searchText,setsearchText]=useState("");
   
  
     const [treeState, setTreeDataState] = useTreeState()

     const [filteredId,setFilteredIdState]= useFilteredIdState();

     const [searchText,setSearchTextState]= useFilteredIdState();

     
   
    const contains = (text, searchText) => {
        console.log(text,"THIS IS WHAT I AM SEARCHING FOR ",searchText, "type of",typeof(searchText));
        if(text===undefined||searchText===undefined)return true;
        return ( (text.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) || searchText===" ");
    }
    

    const searchLogicReverse=(searchText)=>{
            

        console.log("THIS IS THE UPDATED SEARCH TERM",searchText);
           
           
            var filtered = new Set();

            //true means it shold not add to the set
            //false means it shsould
            const recur=(family)=>{
               
                if(family==='undefined')return false;

                console.log("RECURSION HAPPENING ",family);

                const id=family.id;
                
               
                var containChild=true;

                    if (contains(family.Name, searchText)) {
            
                        containChild=false;
                       
                    }

                    if (family?.children) {
                 
                        console.log(Object.entries(family.children),"CHILLDREN of",family.Name);

                        for( const [key,val] of Object.entries(family.children)){
                            console.log("INSIDE ",val);
                            containChild&=recur(val);
                        }
                       
                        
                       
                    }
                    if(containChild){
                      
                        filtered.add(id);
                        
                    }
                    
                   
                    return containChild;
                   
                    
            }
            const ret=recur(treeState);
           
            setFilteredIdState(filtered);
           
            return filtered;
            
            
        
    }
    
    console.log("THIS IS THE SEARCH TERM HERE IN COL",searchText);
   
    const handleFilter=(e)=>{
        setSearchTextState(e.target.value);
     
      
        searchLogicReverse(e.target.value);
    }

 

    return (
        <>
            <LayoutHeader header={'Family Tree'} />
            
            <hr style={{
            border:'none',
            marginTop:'10px',
            marginBottom:"20px",
            height: '0px',
            boxShadow:'0 1px 2px 1px #8789f3',
            width:'100%',
          
            }}/>
              
            <input  id="input"  type="text" placeholder='Search Family Member' onChange={handleFilter}/>
          
           

        </>
    )
}
