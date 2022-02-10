import {SET_CONTACTS} from '../constants';

export function setContacts(contacts) {
  return {
    type: SET_CONTACTS,
    payload: contacts,
  };
}
