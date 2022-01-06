import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { styled } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText, Typography, Chip, Avatar, useMediaQuery } from '@mui/material';

// icons
import { FiChevronUp } from '@react-icons/all-files/fi/FiChevronUp';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';

// project imports
import { Roles } from 'constants/constants';
import { hasChildren, useAuth } from 'utils';
import { DRAWER_OPEN } from 'constants/actionTypes';

//================================|| STYLED COMPONENTS ||================================//

const StyledListItemButton = styled(ListItemButton)(({ level }) => ({
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

const StyledListItemIcon = styled(ListItemIcon, { shouldForwardProp: (prop) => prop !== 'itemIcon' })(({ itemIcon }) => ({
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
  const userInfo = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const matchDownMd = useMediaQuery((theme) => theme.breakpoints.down('md'));

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

  const renderMenu = (itemProp) => (
    <StyledListItemButton
      {...listItemProps}
      level={level}
      disabled={itemProp.disabled}
      selected={open || active}
      onClick={itemHandler}
      target={itemTarget}
    >
      <StyledListItemIcon itemIcon={itemProp.icon}>{itemIcon}</StyledListItemIcon>

      <ListItemText
        primary={
          <Typography variant={open || active ? 'h5' : 'body1'} color="inherit" lineHeight="inherit">
            {itemProp.title}
          </Typography>
        }
        secondary={
          itemProp.caption && (
            <SubMenuCaption variant="caption" display="block" gutterBottom>
              {itemProp.caption}
            </SubMenuCaption>
          )
        }
      />
      {itemProp.chip && (
        <Chip
          color={itemProp.chip.color}
          variant={itemProp.chip.variant}
          size={itemProp.chip.size}
          label={itemProp.chip.label}
          avatar={itemProp.chip.avatar && <Avatar>{itemProp.chip.avatar}</Avatar>}
        />
      )}
      {open !== undefined && (open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />)}
    </StyledListItemButton>
  );

  const adminMenus = (item) => item.role === Roles.Admin && renderMenu(item);
  const commonMenus = (item) => item.role !== Roles.Admin && renderMenu(item);
  const mergedMenus = userInfo.role === Roles.Admin ? { ...adminMenus(item), ...commonMenus(item) } : commonMenus(item);

  return mergedMenus;
};
