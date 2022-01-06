// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, Skeleton } from '@mui/material';

//================================|| STYLED COMPONENTS ||================================//

const CardHeading = styled(Skeleton)(() => ({
  marginRight: '8px',
  marginTop: '18px',
  marginBottom: '14px',
}));

//================================|| SKELETON - LINE CARD ||================================//

export const SkeletonLineCard = () => {
  return (
    <Card>
      <CardContent>
        <Grid container direction="column">
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Skeleton variant="rectangular" width={44} height={44} />
              </Grid>
              <Grid item>
                <Skeleton variant="rectangular" width={34} height={34} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <CardHeading variant="rectangular" height={40} />
          </Grid>
          <Grid item>
            <Skeleton variant="rectangular" height={30} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
