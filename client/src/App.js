import { AppRoutes } from 'routes/routes';
import { ThemeConfig } from 'theme/theme';
import { Customization, Alert } from 'components';

//================================|| APP ||================================//

export const App = () => {
  return (
    <ThemeConfig>
      <AppRoutes />
      <Customization />
      <Alert />
    </ThemeConfig>
  );
};
