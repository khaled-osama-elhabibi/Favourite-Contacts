import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Contacts from 'react-native-contacts';
import {request, PERMISSIONS} from 'react-native-permissions';
import R from '../../resources/R';

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
          renderItem={({item}) => {
            console.log(item.thumbnailPath);
            return (
              <TouchableOpacity style={styles.contact}>
                <Image
                  style={styles.contact__image}
                  source={
                    item.thumbnailPath === ''
                      ? R.images.blank_user
                      : {uri: item.thumbnailPath}
                  }
                />
                <Text style={styles.contact__text}>{item.displayName}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={contact => contact.displayName}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'gray',
  },
  contact: {
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  contact__text: {
    paddingHorizontal: 20,
    width: '80%',
    color: '#FFF',
    fontSize: 19,
    fontWeight: '700',
  },
  contact__image: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});

export default Home;
