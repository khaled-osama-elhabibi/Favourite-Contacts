import {createStore, combineReducers, applyMiddleware} from 'redux';

import contactReducers from './reducers/contactReducers';
import authReducer from './reducers/authReducer';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  contactReducers,
  authReducer,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(ReduxThunk));
};

export default configureStore;
