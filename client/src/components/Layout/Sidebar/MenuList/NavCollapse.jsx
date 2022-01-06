import { useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { List, Collapse } from '@mui/material';

// project imports
import { NavItem } from './NavItem';
import { MenuItem } from './MenuList';

//================================|| STYLED COMPONENTS ||================================//

const StyledList = styled(List)(({ theme, level }) => ({
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
      opacity: theme.palette.mode === 'dark' ? 0.2 : 1,
      background: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.primary.light,
    },
  }),
}));

//================================|| MENU LIST ||================================//

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
        <StyledList component="div" level={level} disablePadding>
          {items}
        </StyledList>
      </Collapse>
    </>
  );
};
