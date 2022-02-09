import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import Contacts from 'react-native-contacts';
import {request, PERMISSIONS} from 'react-native-permissions';

const Home = () => {
  const [contacts, setContacts] = useState();
  const requestPermissionForAccesssContact = async () => {
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

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        onPress={() => {
          requestPermissionForAccesssContact();
          console.log('test');
        }}>
        <Text style={styles.btn__text}>ACCESS Phone Contact</Text>
      </TouchableOpacity>

      <View>
        <FlatList
          data={contacts}
          renderItem={({item}) => (
            <View style={{backgroundColor: 'red', borderWidth: 1}}>
              <Text style={styles.btn__text}>{item.displayName}</Text>
            </View>
          )}
          keyExtractor={contact => contact.displayName}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'black',
  },
  btn__text: {
    color: '#FFF',
  },
});

export default Home;
