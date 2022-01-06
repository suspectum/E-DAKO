// material-ui
import { styled } from '@mui/material/styles';
import { Typography, Grid, Button } from '@mui/material';

// project imports
import { SubCard, ImgAvatar } from 'components';

//================================|| STYLED COMPONENTS ||================================//

const Input = styled('input')({
  display: 'none',
});

//================================|| PICTURE SECTION ||================================//

export const PictureSection = ({ userInfo }) => {
  return (
    <SubCard title="Profile Picture">
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <ImgAvatar id={userInfo?.id} size="100" sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item textAlign="center">
          <Typography gutterBottom variant="caption">
            Upload/Change Your Profile Image
          </Typography>
        </Grid>
        <Grid item>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" multiple type="file" />
            <Button disableElevation variant="contained" size="small" component="span">
              Upload Avatar
            </Button>
          </label>
        </Grid>
      </Grid>
    </SubCard>
  );
};
