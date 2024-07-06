import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const useStyles = makeStyles({
  button: {
    fontSize: '0.7rem',
    padding: '4px 8px',
    color: '#63666A',
    borderColor: '#63666A',
  },
});

const CostsAmortized = ({ dialogPaperClass }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log('Selected Option:', selectedOption);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" className={classes.button} onClick={handleClickOpen}>Costs Amortized</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth={true}
        classes={{ paper: dialogPaperClass }}
      >
        <DialogTitle id="form-dialog-title">Costs Amortization</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <RadioGroup aria-label="options" name="options" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <FormControlLabel value="option1" control={<Radio />} label="Actual Costs" />
              <DialogContentText>One-time & upfront costs shown at the time of purchase</DialogContentText>
              <FormControlLabel value="option2" control={<Radio />} label="Costs Amortized" />
              <DialogContentText>One-time & upfront costs are spread evenly over the term of the item purchased</DialogContentText>
              <DialogContentText>Costs Blending (AWS only)</DialogContentText>
              <FormControlLabel value="option3" control={<Radio />} label="Costs Unblended" />
              <DialogContentText>Savings from reserved instances are applied first to matching instances in the account where it's purchased</DialogContentText>
              <FormControlLabel value="option4" control={<Radio />} label="Costs Blended" />
              <DialogContentText>Savings from reserved instances are shared equally by all matching instances in all accounts</DialogContentText>
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} style={{ backgroundColor: '#5F249F', color: '#fff' }}>
            Save
          </Button>
          <Button onClick={handleClose} style={{ backgroundColor: 'white', color: 'black' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CostsAmortized;
