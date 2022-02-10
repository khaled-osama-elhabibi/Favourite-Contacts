import {SET_CONTACTS, SET_FAV_CONTACTS} from '../constants';

export function setContacts(contacts) {
  return {
    type: SET_CONTACTS,
    payload: contacts,
  };
}
export function setFavContacts(favContacts) {
  return {
    type: SET_FAV_CONTACTS,
    payload: favContacts,
  };
}
