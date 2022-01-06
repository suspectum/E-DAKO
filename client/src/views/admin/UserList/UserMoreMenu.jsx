import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material
import { styled } from '@mui/material/styles';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Dialog } from '@mui/material';

// icons
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';
import { FiTrash } from '@react-icons/all-files/fi/FiTrash';
import { FiMoreVertical } from '@react-icons/all-files/fi/FiMoreVertical';

// project imports
import { UserDelete } from 'components';

//================================|| STYLED COMPONENTS ||================================//

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.mediumIconButton,
}));

//================================|| USER MORE MENU ||================================//

export const UserMoreMenu = ({ id }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
    setIsOpen(false);
  };

  return (
    <>
      <StyledIconButton ref={ref} onClick={handleToggle}>
        <FiMoreVertical />
      </StyledIconButton>

      <Dialog open={isDialogOpen} onClose={handleDialogToggle}>
        <UserDelete handleClose={handleDialogToggle} id={id} />
      </Dialog>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={handleToggle}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem component={RouterLink} to={`edit/${id}`}>
          <ListItemIcon>
            <FiEdit />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>

        <MenuItem onClick={handleDialogToggle}>
          <ListItemIcon>
            <FiTrash />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
};
