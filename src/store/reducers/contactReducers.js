import {SET_CONTACTS, SET_FAV_CONTACTS} from '../constants';

let initialState = {contacts: [], favContacts: []};

const contactReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return {...state, contacts: action.payload};
    case SET_FAV_CONTACTS:
      return {...state, favContacts: action.payload};
    default:
      return state;
  }
};

export default contactReducers;
