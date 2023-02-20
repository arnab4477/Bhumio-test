import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { LayoutHeader } from './LayoutHeader';
import { excludeId } from '../utils/search.js';
import './SearchBar.css';
import {
  useSelectedNodeState,
  useTreeState,
  useFilteredIdState,
  useSearchTextState,
} from '../contexts';
export default function SearchBar(props) {
  // const [searchText,setsearchText]=useState("");

  const [treeState, setTreeDataState] = useTreeState();

  const [filterIds, setFilteredIdState] = useFilteredIdState();

  const [searchText, setSearchTextState] = useSearchTextState();

  const searchLogicReverse = (searchText) => {
    var filtered = new Set();

    excludeId(treeState, filtered, searchText);
    setFilteredIdState(filtered);

    return filtered;
  };

  console.log('THIS IS THE SEARCH TERM HERE IN COL', searchText);

  const handleFilter = (e) => {
    setSearchTextState(e.target.value);
    searchLogicReverse(e.target.value);
  };

  return (
    <>
      <LayoutHeader header={'Family Tree'} />

      <hr
        style={{
          border: 'none',
          marginTop: '10px',
          marginBottom: '20px',
          height: '0px',
          boxShadow: '0 1px 2px 1px #8789f3',
          width: '100%',
        }}
      />
      <TextField
        name={'search'}
        variant="outlined"
        label={'Search Family Member'}
        onChange={handleFilter}
      />
    </>
  );
}
