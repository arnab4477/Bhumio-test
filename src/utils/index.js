import { selectClasses } from '@mui/material';
import { useState } from 'react';
import {
  useSelectedNodeState,
  useTreeState,
  useSearchTextState,
  useFilteredIdState,
} from '../contexts';
import { SearchText } from './../contexts/SearchText';

export function uid() {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ''
  );
}

export const initialFamilyInfoState = {
  Name: '',
  Spouse: '',
  Location: '',
  'Birth Year': '',
  'Present Address': '',
  'Custom Label 1': '',
  'Custom Label 2': '',
  'Family Photo': null,
};

export const useDeleteFamily = (afterAdding = () => {}) => {
  //code to delete family
  console.log('TGHIS IS RIGHT');
  const [selectedNode] = useSelectedNodeState();
  const [treeState, setTreeDataState] = useTreeState();

  const deleteFamily = (e) => {
    const uId = selectedNode.id;
    e.preventDefault();
    console.log('TGHIS IS calling delete ', treeState);
    selectedNode &&
      setTreeDataState((prevTree) => {
        const clone = { ...prevTree };
        let currentNode = clone;
        selectedNode.ancentors.forEach((node, i) => {
          if (i !== 0) {
            // console.log(node,"this is the flow of ancestor ",i);
            let parent = currentNode;
            currentNode = currentNode.children[node];
            if (currentNode.id === uId) {
              delete parent.children[uId];
            }
          }
        });

        return clone;
      });

    // handleClose()
    //afterAdding();
  };
  return { deleteFamily };
};

export const useAddFamily = ({
  initialFamilyInfoState,
  afterAdding = () => {},
}) => {
  const [familyInfo, setFamilyInfo] = useState(initialFamilyInfoState);

  const [selectedNode, setSelectedNodeState] = useSelectedNodeState();
  const [treeState, setTreeDataState] = useTreeState();

  const addFamily = (e) => {
    e.preventDefault();
    selectedNode &&
      setTreeDataState((prevTree) => {
        const clone = { ...prevTree };
        console.log('this is cloned tree', clone);
        console.log(selectedNode, 'this is the selected node');
        const uId = uid();
        let currentNode = clone;
        selectedNode.ancentors.forEach((node, i) => {
          if (i !== 0) {
            currentNode = currentNode.children[node];
          }
        });
        console.log(currentNode, 'this is the final');
        currentNode.children = currentNode.children
          ? { ...currentNode.children, [uId]: { id: uId, ...familyInfo } }
          : { [uId]: { id: uId, ...familyInfo } };
        return clone;
      });

    !selectedNode &&
      Object.keys(treeState).length === 0 &&
      setTreeDataState(() => {
        return {
          id: uid(),
          ...familyInfo,
        };
      });

    // handleClose()

    afterAdding();
    setFamilyInfo(initialFamilyInfoState);
    // setSearchText("sad");
    // setSearchText(SearchText);
  };

  // Function to edit a family
  const editFamily = (e) => {
    e.preventDefault();
    const updatedFamilyNode = { ...selectedNode, ...familyInfo };

    selectedNode &&
      setTreeDataState((prevTree) => {
        const clone = { ...prevTree };
        if (selectedNode.id === clone.id) {
          return updatedFamilyNode;
        }

        let currentNode = clone;
        selectedNode.ancentors.forEach((node, i) => {
          console.log(currentNode, i);
          if (i !== selectedNode.ancentors.length - 1 && i !== 0) {
            currentNode = currentNode.children[node];
          }
        });

        currentNode.children[selectedNode.id] = updatedFamilyNode;
        setSelectedNodeState(updatedFamilyNode);
        return clone;
      });

    afterAdding();
    setFamilyInfo(familyInfo);
  };

  const setFamilyInfoState = (e) => {
    const { name, value } = e.target;
    setFamilyInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onPicUpload = (e) => {
    // const picUrls = e.target.files.map(file => URL.createObjectURL(file))
    const picUrls = [];

    const allSelectedImgs = e.target.files;

    for (let index = 0; index < allSelectedImgs.length; index++) {
      const currentImg = allSelectedImgs[index];
      picUrls.push(URL.createObjectURL(currentImg));
    }

    picUrls.length > 0 &&
      setFamilyInfo((prevState) => {
        return {
          ...prevState,
          'Family Photo': picUrls,
        };
      });
  };

  return { familyInfo, setFamilyInfoState, addFamily, editFamily, onPicUpload };
};
