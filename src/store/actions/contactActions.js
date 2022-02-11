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
    const contactsStringsToDisable = contactsToDisable.map(
      contactToDisable => contactToDisable.displayName,
    );
    contactsAfterDisable = contactsAfterDisable.map(item => {
      if (
        contactsStringsToDisable.find(
          contactStringToDisable => contactStringToDisable === item.displayName,
        ) === item.displayName
      ) {
        item.disabled = true;
        return item;
      } else {
        item.disabled = false;
        return item;
      }
    });
    dispatch(setContacts(contactsAfterDisable));
  };
}
