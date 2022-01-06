// material-ui
import { styled } from '@mui/material/styles';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';

// icons
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardSharp';

// project imports
import { MainCard } from 'components';
import { formatCurrency } from 'utils';
import { GROUPS, WALLETS } from 'mocks';

//================================|| STYLED COMPONENTS ||================================//

const StyledAccordion = styled((props) => <Accordion defaultExpanded disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const StyledAccordionSummary = styled((props) => (
  <AccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

//================================|| ASSETS ||================================//

export const Assets = () => {
  return (
    <MainCard title="Assets" contentClass={{ width: '100%' }}>
      <StyledAccordion>
        <StyledAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Grid container display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Cash</Typography>
            <Typography variant="subtitle1">{formatCurrency(GROUPS.Cash)}</Typography>
          </Grid>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <Grid container display="flex" justifyContent="space-between">
            <Typography>User1's Wallet</Typography>
            <Typography variant="subtitle1">{formatCurrency(WALLETS.User1)}</Typography>
          </Grid>
          <Grid container display="flex" justifyContent="space-between">
            <Typography>User2 Wallet</Typography>
            <Typography variant="subtitle1">{formatCurrency(WALLETS.User2)}</Typography>
          </Grid>
        </StyledAccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <StyledAccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Grid container display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Asset</Typography>
            <Typography variant="subtitle1">{formatCurrency(GROUPS.Asset)}</Typography>
          </Grid>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </StyledAccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <StyledAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Grid container display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Credit</Typography>
            <Typography variant="subtitle1">{formatCurrency(GROUPS.Credit)}</Typography>
          </Grid>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </StyledAccordionDetails>
      </StyledAccordion>
      <StyledAccordion>
        <StyledAccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Grid container display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Bank Account</Typography>
            <Typography variant="subtitle1">{formatCurrency(GROUPS.Bank)}</Typography>
          </Grid>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </StyledAccordionDetails>
      </StyledAccordion>
    </MainCard>
  );
};
