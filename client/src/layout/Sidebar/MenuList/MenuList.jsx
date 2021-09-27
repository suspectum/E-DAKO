// material-ui
import { styled } from '@mui/material/styles';
import { Divider, Typography, List } from '@mui/material';

// project imports
import { NavCollapse } from './NavCollapse';
import { NavItem } from './NavItem';
import { menuItems } from 'menu-items';
import { hasChildren } from 'utils';

// styled components
const MuiTypography = styled(Typography)(({ theme, type }) => ({
  ...theme.typography.menuCaption,
  ...(type === 'subMenuCaption' && {
    ...theme.typography.subMenuCaption,
  }),
}));
const MuiDivider = styled(Divider)(() => ({
  marginTop: '2px',
  marginBottom: '10px',
}));

export function MenuItem({ item, level }) {
  const Component = hasChildren(item) ? NavCollapse : NavItem;
  return <Component item={item} level={level} />;
}

export const MenuList = () => {
  const navItems = menuItems.items.map((item) => {
    const items = item.children.map((item) => <MenuItem key={item.id} item={item} level={1} />);
    return (
      <div key={item.id}>
        <List
          subheader={
            item.title && (
              <MuiTypography variant="caption" display="block" gutterBottom>
                {item.title}
                {item.caption && (
                  <MuiTypography variant="caption" type="subMenuCaption" display="block" gutterBottom>
                    {item.caption}
                  </MuiTypography>
                )}
              </MuiTypography>
            )
          }
        >
          {items}
        </List>
        {/* group divider */}
        <MuiDivider />
      </div>
    );
  });

  return navItems;
};
