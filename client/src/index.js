// scroll bar
import 'simplebar/dist/simplebar.min.css';

import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import { App } from './App';
import { store } from 'reducers/store';
import { refreshToken } from 'actions';

//================================|| REACT DOM RENDER  ||================================//

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

// * this one waits until return refreshToken() to start app
// store.dispatch(refreshToken()).then(startApp);

// function startApp () {
//   render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>,
//     document.getElementById('root')
//   );
// }
