import { Link as RouterLink } from 'react-router-dom';

//material-ui
import { Link } from '@mui/material';

// projects import
import Logo from 'assets/images/logo.svg';
import config from 'config';

export const LogoSection = () => (
  <Link component={RouterLink} to={config.defaultPath}>
    <img src={Logo} alt="logo" height="34" />
  </Link>
);
