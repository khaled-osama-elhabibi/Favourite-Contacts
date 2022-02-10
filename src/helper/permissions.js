import {PERMISSIONS, request} from 'react-native-permissions';

export const requestPermissionForAccesssContact = async () => {
  let responseOfPermissionRequest =
    Platform.OS === 'ios'
      ? await request(PERMISSIONS.IOS.CONTACTS)
      : await request(PERMISSIONS.ANDROID.READ_CONTACTS);
  return responseOfPermissionRequest;
};
