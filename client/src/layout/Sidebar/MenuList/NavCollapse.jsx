import { useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { List, Collapse } from '@mui/material';

// project imports
import { MenuItem } from './MenuList';
import { NavItem } from './NavItem';

// style constant
const MuiList = styled(List)(({ theme, level }) => ({
  paddingLeft: `${level * 10}px`,
  ...(level < 2 && {
    position: 'relative',
    '&:after': {
      content: "''",
      position: 'absolute',
      left: '36px',
      top: 0,
      height: '100%',
      width: '1px',
      opacity: 1,
      background: theme.palette.primary.light,
    },
  }),
}));

export const NavCollapse = ({ item, level }) => {
  const [open, setOpen] = useState(false);

  const items = item.children.map((child) => <MenuItem key={child.id} item={child} level={2} />);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <NavItem item={item} onClick={handleClick} open={open} level={level} />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <MuiList component="div" level={level} disablePadding>
          {items}
        </MuiList>
      </Collapse>
    </>
  );
};
