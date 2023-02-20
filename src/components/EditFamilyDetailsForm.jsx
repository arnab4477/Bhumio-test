import React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { useAddFamily } from '../utils';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const EditFamilyDetailsForm = ({
  handleClose = () => {},
  familyInfoToUpdate,
}) => {
  const { setFamilyInfoState, editFamily, onPicUpload } = useAddFamily({
    familyInfoToUpdate,
    afterAdding: handleClose,
  });

  console.log(familyInfoToUpdate);

  return (
    <Box sx={style}>
      <form
        onSubmit={editFamily}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {Object.keys(familyInfoToUpdate).map(
          (fieldKey, i) =>
            fieldKey !== 'Family Photo' && (
              <TextField
                required
                name={fieldKey}
                variant="outlined"
                label={fieldKey}
                defaultValue={familyInfoToUpdate[fieldKey]}
                onChange={setFamilyInfoState}
              />
            )
        )}
        <Button
          variant="contained"
          component="label"
          sx={{ textTransform: 'capitalize' }}
        >
          Upload Pictures
          <input
            type="file"
            onChange={onPicUpload}
            hidden
            multiple
            accept="image/*"
          />
        </Button>
        <div>
          {familyInfoToUpdate['Family Photo'] &&
            familyInfoToUpdate['Family Photo'].map((src) => (
              <img
                style={{ padding: '5px' }}
                src={src}
                alt="family"
                key={src}
                width={100}
              />
            ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" type="submit">
            Update & Save
          </Button>
        </div>
      </form>
    </Box>
  );
};
