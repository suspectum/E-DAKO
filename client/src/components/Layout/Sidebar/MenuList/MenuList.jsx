// material-ui
import { styled } from '@mui/material/styles';
import { Divider, Typography, List } from '@mui/material';

// project imports
import { hasChildren } from 'utils';
import { NavItem } from './NavItem';
import { menuItems } from 'components';
import { NavCollapse } from './NavCollapse';

//================================|| STYLED COMPONENTS ||================================//

const StyledTypography = styled(Typography)(({ theme, type }) => ({
  ...theme.typography.menuCaption,
  ...(type === 'subMenuCaption' && {
    ...theme.typography.subMenuCaption,
  }),
}));
const StyledDivider = styled(Divider)(() => ({
  marginTop: '2px',
  marginBottom: '10px',
}));

//================================|| MENU ITEM ||================================//

export function MenuItem({ item, level }) {
  const Component = hasChildren(item) ? NavCollapse : NavItem;
  return <Component item={item} level={level} />;
}

//================================|| MENU LIST ||================================//

export const MenuList = () => {
  const navItems = menuItems.items.map((item) => {
    const items = item.children.map((item) => <MenuItem key={item.id} item={item} level={1} />);
    return (
      <div key={item.id}>
        <List
          subheader={
            item.title && (
              <StyledTypography variant="caption" display="block" gutterBottom>
                {item.title}
                {item.caption && (
                  <StyledTypography variant="caption" type="subMenuCaption" display="block" gutterBottom>
                    {item.caption}
                  </StyledTypography>
                )}
              </StyledTypography>
            )
          }
        >
          {items}
        </List>
        {/* group divider */}
        <StyledDivider />
      </div>
    );
  });

  return navItems;
};
