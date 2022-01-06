// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import { AuthFooter } from './AuthFooter';
import { MainCard, LogoSection } from 'components';

//================================|| STYLED COMPONENTS ||================================//

const StyledMainCard = styled(MainCard)(({ theme }) => ({
  maxWidth: '475px',
  '& > *': {
    flexGrow: 1,
    flexBasis: '50%',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '20px',
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '400px',
  },
}));

const Wrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'inherit' : theme.palette.primary.light,
  minHeight: '100vh',
}));

//================================|| AUTH WRAPPER ||================================//

export const AuthWrapper = ({ children, title, caption }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Wrapper>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <StyledMainCard
              contentClass={{
                padding: `${theme.spacing(5)} !important`,
                [theme.breakpoints.down('lg')]: {
                  padding: `${theme.spacing(3)} !important`,
                },
              }}
            >
              <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item sx={{ mb: 3 }}>
                  <LogoSection />
                </Grid>
                <Grid item xs={12}>
                  <Stack alignItems="center" justifyContent="center" spacing={1}>
                    <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                      {title}
                    </Typography>
                    <Typography variant="caption" fontSize="16px" textAlign={'center'}>
                      {caption}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  {children}
                </Grid>
              </Grid>
            </StyledMainCard>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </Wrapper>
  );
};
