import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { Fade, Grow, IconButton, Slide, Snackbar, Alert as MuiAlert } from '@mui/material';

// icons
import { FiX } from '@react-icons/all-files/fi/FiX';

// project imports
import { CLEAR_ALERT } from 'constants/actionTypes';

function TransitionSlideLeft(props) {
  return <Slide {...props} direction="left" />;
}

function TransitionSlideUp(props) {
  return <Slide {...props} direction="up" />;
}

function TransitionSlideRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionSlideDown(props) {
  return <Slide {...props} direction="down" />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

const transition = {
  SlideLeft: TransitionSlideLeft,
  SlideUp: TransitionSlideUp,
  SlideRight: TransitionSlideRight,
  SlideDown: TransitionSlideDown,
  Grow: GrowTransition,
  Fade: Fade,
};

export const Alert = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const alertInitial = useSelector((state) => state.alert);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);

    setTimeout(() => dispatch({ type: CLEAR_ALERT }), 1000);
  };

  useEffect(() => {
    setOpen(alertInitial.open);
  }, [alertInitial.action, alertInitial.open]);

  return (
    <Snackbar
      TransitionComponent={transition[alertInitial.transition]}
      anchorOrigin={alertInitial.anchorOrigin}
      open={open}
      autoHideDuration={alertInitial.duration}
      onClose={handleClose}
    >
      <MuiAlert
        variant="filled"
        severity={alertInitial.severity || 'info'}
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <FiX size="20px" />
            </IconButton>
          </>
        }
      >
        {alertInitial.message}
      </MuiAlert>
    </Snackbar>
  );
};
