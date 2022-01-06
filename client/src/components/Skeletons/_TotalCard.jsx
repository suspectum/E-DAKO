// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from '@mui/material';

//================================|| STYLED COMPONENTS ||================================//

const StyledCardContent = styled(CardContent)(() => ({
  padding: '16px !important',
}));

const StyledList = styled(List)(() => ({
  paddingTop: 5,
  paddingBottom: 5,
}));

const StyledListItem = styled(ListItem)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

const StyledListItemText = styled(ListItemText)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}));

//================================|| SKELETON - TOTAL INCOME/EXPENSE CARD ||================================//

export const SkeletonTotalCard = () => {
  return (
    <Card>
      <StyledCardContent>
        <StyledList>
          <StyledListItem alignItems="center" disableGutters>
            <ListItemAvatar>
              <Skeleton variant="rectangular" width={44} height={44} />
            </ListItemAvatar>
            <StyledListItemText primary={<Skeleton variant="rectangular" height={10} />} secondary={<Skeleton variant="text" />} />
          </StyledListItem>
        </StyledList>
      </StyledCardContent>
    </Card>
  );
};
