import {SET_PHONE_NUM} from '../constants';

let initialState = {phoneNumber: ''};

const contactReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHONE_NUM:
      return {...state, phoneNumber: action.payload};
    default:
      return state;
  }
};

export default contactReducers;
