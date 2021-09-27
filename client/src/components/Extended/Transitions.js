// material-ui
import { Paper, Fade, Grow, Slide, Zoom } from '@mui/material';

//-----------------------|| TRANSITIONS ||-----------------------//

export const Transitions = ({ children, transformOrigin, type, direction, ...others }) => {
  return (
    <>
      {type === 'grow' && (
        <Grow style={{ transformOrigin }} {...others}>
          <Paper>{children}</Paper>
        </Grow>
      )}
      {type === 'fade' && (
        <Fade
          {...others}
          timeout={{
            appear: 500,
            enter: 600,
            exit: 400,
          }}
        >
          <Paper>{children}</Paper>
        </Fade>
      )}
      {type === 'slide' && (
        <Slide
          {...others}
          timeout={{
            appear: 0,
            enter: 400,
            exit: 200,
          }}
          direction={direction}
        >
          <Paper>{children}</Paper>
        </Slide>
      )}
      {type === 'zoom' && (
        <Zoom style={{ transformOrigin }} {...others}>
          <Paper>{children}</Paper>
        </Zoom>
      )}
    </>
  );
};

Transitions.defaultProps = {
  type: 'grow',
  transformOrigin: 'top left',
  direction: 'up',
};
