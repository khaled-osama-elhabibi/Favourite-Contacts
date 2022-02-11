import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalDB {
  static get(key) {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.getItem(key, (error, result) => {
          resolve(result);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  static remove(key) {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.removeItem(key, (error, result) => {
          resolve(result);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
  static set(key, value) {
    return new Promise((resolve, reject) => {
      try {
        AsyncStorage.setItem(key, value, (error, result) => {
          resolve(result);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
