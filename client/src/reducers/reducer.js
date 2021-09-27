import { combineReducers } from 'redux';

// reducer import
import { customizationReducer as customization } from './_customizationReducer';
import { userSignInReducer as userSignIn } from './_userReducer';
import { alertReducer as alert } from './_alertReducer';

//-----------------------|| COMBINE REDUCER ||-----------------------//

export default combineReducers({ customization, userSignIn, alert });
