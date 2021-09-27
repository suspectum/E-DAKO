// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';

// styled components
const MuiCardContent = styled(CardContent)(() => ({
  padding: '16px !important',
}));

const MuiList = styled(List)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const MuiListItem = styled(ListItem)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const MuiListItemText = styled(ListItemText)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

//-----------------------|| SKELETON - TOTAL INCOME DARK/LIGHT Card ||-----------------------//

export  const TotalIncomeCard = () => {
  return (
    <Card>
      <MuiCardContent>
        <MuiList>
          <MuiListItem alignItems="center" disableGutters>
            <ListItemAvatar>
              <Skeleton variant="rectangular" width={44} height={44} />
            </ListItemAvatar>
            <MuiListItemText primary={<Skeleton variant="rectangular" height={20} />} secondary={<Skeleton variant="text" />} />
          </MuiListItem>
        </MuiList>
      </MuiCardContent>
    </Card>
  );
};
