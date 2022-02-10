import {SET_CONTACTS} from '../constants';

let initialState = {contacts: []};

const contactReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return {...state, contacts: action.payload};
    default:
      return state;
  }
};

export default contactReducers;
