import { render } from 'react-dom';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import App from './App';
import store from 'reducers/store';
import { refreshToken } from 'actions/userActions';

import * as serviceWorker from './serviceWorker';

// style + assets
import './assets/scss/style.scss';

//-----------------------|| REACT DOM RENDER  ||-----------------------//

// attempt silent token refresh
store.dispatch(refreshToken());

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
