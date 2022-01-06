import { useState } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { IconButton, Dialog } from '@mui/material';

// icons
import { FiEdit } from '@react-icons/all-files/fi/FiEdit';

// project imports
import { TransactionForm } from 'views/transactions/TransactionForm';

//================================|| STYLED COMPONENTS ||================================//

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  ...theme.typography.commonIconButton,
  ...theme.typography.mediumIconButton,
}));

//================================|| TRANSACTION EDIT BUTTON ||================================//

export const TransactionEditButton = ({ selectedTransaction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <StyledIconButton onClick={handleToggle}>
        <FiEdit />
      </StyledIconButton>
      <Dialog open={isOpen} onClose={handleToggle}>
        <TransactionForm selectedTransaction={selectedTransaction} handleClose={handleToggle} />
      </Dialog>
    </>
  );
};
