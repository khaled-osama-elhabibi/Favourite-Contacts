import {createStore, combineReducers, applyMiddleware} from 'redux';

import contactReducers from './reducers/contactReducers';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  contactReducers,
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(ReduxThunk));
};

export default configureStore;
