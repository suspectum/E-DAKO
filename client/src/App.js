// routing
import { AppRoutes } from 'routes/routes';

// defaultTheme
import ThemeConfig from 'theme/theme';

//
import { Customization, Alert } from 'components';

//-----------------------|| APP ||-----------------------//

const App = () => {
  return (
    <ThemeConfig>
      <AppRoutes />
      <Customization />
      <Alert />
    </ThemeConfig>
  );
};

export default App;
