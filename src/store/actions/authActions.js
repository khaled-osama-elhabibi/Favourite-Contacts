import {SET_PHONE_NUM} from '../constants';

export function setPhoneNumberAtStore(phoneNumber) {
  return {
    type: SET_PHONE_NUM,
    payload: phoneNumber,
  };
}
