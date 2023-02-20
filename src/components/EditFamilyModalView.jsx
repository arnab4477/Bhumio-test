import { Modal } from '@mui/material';
import React from 'react';
import { initialFamilyInfoState } from '../utils';
import { useSelectedNodeState } from '../contexts';
import { EditFamilyDetailsForm } from './EditFamilyDetailsForm';

export const EditFamilyModalView = ({ open, setOpen }) => {
  const [selectedNode] = useSelectedNodeState();

  const clone = JSON.parse(JSON.stringify(initialFamilyInfoState));
  if (selectedNode !== null) {
    for (let key in clone) {
      clone[key] = selectedNode[key];
    }
  }

  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditFamilyDetailsForm
          familyInfoToUpdate={clone}
          handleClose={handleClose}
        />
      </Modal>
    </>
  );
};
