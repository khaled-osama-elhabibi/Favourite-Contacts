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
export function disableArrayOfContacts(contactsToDisable) {
  return (dispatch, getState) => {
    const {contacts} = getState().contactReducers;
    let contactsAfterDisable = contacts;
    console.log(contacts, contactsToDisable);

    contactsToDisable.forEach(contactToDisable => {
      contactsAfterDisable = contactsAfterDisable.map(item => {
        if (item.displayName == contactToDisable.displayName) {
          item.disabled = true;
          return item;
        } else return item;
      });
    });
    console.log(contactsAfterDisable);
    dispatch(setContacts(contactsAfterDisable));
  };
}
