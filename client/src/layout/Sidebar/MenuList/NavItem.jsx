import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// material-ui
import { styled } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText, Typography, Chip, Avatar, useMediaQuery } from '@mui/material';
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';

// project imports
import { DRAWER_OPEN } from 'constants/actionTypes';
import {hasChildren} from 'utils';

// styled components
const MuiListItemButton = styled(ListItemButton)(({ level }) => ({
  paddingLeft: `${level * 24}px`,
  marginBottom: '5px',
  alignItems: 'center',

  ...(level > 1 && {
    //listItemNoBack
    marginBottom: '5px',
    alignItems: 'flex-start',
    backgroundColor: 'transparent !important',
    paddingTop: '8px',
    paddingBottom: '8px',
  }),
}));

const MuiListItemIcon = styled(ListItemIcon, { shouldForwardProp: (prop) => prop !== 'itemIcon' })(({ itemIcon }) => ({
  fontSize: '1.25rem',
  ...(!itemIcon && {
    minWidth: '18px',
    marginTop: 'auto',
    marginBottom: 'auto',
  }),
}));

const SubMenuCaption = styled(Typography)(({ theme }) => ({
  ...theme.typography.subMenuCaption,
}));

const IconFiberManualRecord = styled(FiberManualRecord, { shouldForwardProp: (prop) => prop !== 'open' })(({ open }) => ({
  width: '8px',
  height: '8px',
  ...(!open && {
    width: '6px',
    height: '6px',
  }),
}));

export const NavItem = ({ item, level, onClick: onClickProp, open }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const matchDownMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [active, setActive] = useState(false);

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon strokeWidth={1.5} /> : <IconFiberManualRecord open={open} />;

  const itemTarget = item.target ? '_blank' : '';
  let listItemProps = '';
  if (item.url) {
    listItemProps = item.external ? { component: 'a', href: item.url } : { component: Link, to: item.url };
  }

  const itemHandler = () => {
    onClickProp && onClickProp();
    !hasChildren(item) && matchDownMd && dispatch({ type: DRAWER_OPEN, payload: false });
  };

  useEffect(() => {
    setActive(location.pathname === item.url);
  }, [location, item]);

  return (
    <MuiListItemButton
      {...listItemProps}
      level={level}
      disabled={item.disabled}
      selected={open || active}
      onClick={itemHandler}
      target={itemTarget}
    >
      <MuiListItemIcon itemIcon={item.icon}>{itemIcon}</MuiListItemIcon>

      <ListItemText
        primary={
          <Typography variant={open || active ? 'h5' : 'body1'} color="inherit" lineHeight="inherit">
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <SubMenuCaption variant="caption" display="block" gutterBottom>
              {item.caption}
            </SubMenuCaption>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
      {open !== undefined && (open ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />)}
    </MuiListItemButton>
  );
};
