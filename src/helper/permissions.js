export const requestPermissionForAccesssContact = async () => {
  let responseOfPermissionRequest =
    Platform.OS === 'ios'
      ? await request(PERMISSIONS.IOS.CONTACTS)
      : await request(PERMISSIONS.ANDROID.READ_CONTACTS);

  if (responseOfPermissionRequest === 'denied') {
    console.log('denied');
  } else if (responseOfPermissionRequest == 'granted') {
    Contacts.getAll()
      .then(contacts => {
        // work with contacts
        console.log(contacts);
        setContacts(contacts);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
