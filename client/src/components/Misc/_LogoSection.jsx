import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

//material-ui
import { Link } from '@mui/material';

// projects import
import { config } from 'config';
import LogoLight from 'assets/images/logo.svg';
import LogoDark from 'assets/images/logo-dark.svg';

//================================|| LOGO SECTION ||================================//

export const LogoSection = () => {
  const { themeMode } = useSelector((state) => state.customization);
  const Logo = themeMode === 'light' ? LogoLight : LogoDark;
  return (
    <Link component={RouterLink} to={config.defaultPath}>
      <img src={Logo} alt="logo" height="34" />
    </Link>
  );
};
