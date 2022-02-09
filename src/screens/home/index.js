import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Contacts from 'react-native-contacts';
import {request, PERMISSIONS} from 'react-native-permissions';
import R from '../../resources/R';

const Home = () => {
  const [contacts, setContacts] = useState();
  const [chosenContacts, setChosenContacts] = useState([]);

  const nameTransformIfNeeded = name =>
    name.length > 10 ? name.slice(0, 10) + '...' : name;

  const isContactInChosenContacts = newContact =>
    chosenContacts.filter(
      contact => contact.displayName === newContact.displayName,
    ).length != 0;
  const addContactToChosenContacts = newContact => {
    if (!isContactInChosenContacts(newContact)) {
      setChosenContacts([...chosenContacts, newContact]);
    }
  };
  const removeContactFromChosenContacts = removedContact => {
    setChosenContacts([
      ...chosenContacts.filter(
        contact => removedContact.displayName !== contact.displayName,
      ),
    ]);
  };
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.header__btn}>
          <Text style={styles.header__btn__text}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.header__mainSection}>
          <Text style={styles.header__mainSection__title}>
            Add To Favourite
          </Text>
          <Text style={styles.header__mainSection__number}>
            {chosenContacts?.length}/{contacts?.length}
          </Text>
        </View>
        <TouchableOpacity style={styles.header__btn}>
          <Text style={styles.header__btn__text}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <TextInput style={styles.searchBar__input} />
        <Image source={R.images.icon_search} style={styles.searchBar__img} />
      </View>
      <View style={styles.chosenContactContainer}>
        <FlatList
          data={chosenContacts}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <View style={styles.chosenContact}>
                <TouchableOpacity
                  onPress={removeContactFromChosenContacts.bind(this, item)}
                  style={styles.chosenContact__closeIconContainer}>
                  <Image
                    style={styles.chosenContact__closeIcon}
                    source={R.images.icon_close}
                  />
                </TouchableOpacity>
                <Image
                  style={styles.chosenContact__image}
                  source={
                    item.thumbnailPath === ''
                      ? R.images.blank_user
                      : {uri: item.thumbnailPath}
                  }
                />
                <Text style={styles.chosenContact__text}>
                  {nameTransformIfNeeded(item.displayName)}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View>
        <FlatList
          data={contacts}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={addContactToChosenContacts.bind(this, item)}
                style={styles.contact}>
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
    backgroundColor: 'rgb(108, 122, 137)',
  },
  header: {
    backgroundColor: 'rgb(66, 75, 84)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    alignItems: 'center',
    paddingTop: 13,
  },
  header__mainSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header__mainSection__title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  header__mainSection__number: {
    fontSize: 15,
    fontWeight: '400',
    color: '#fff',
  },
  header__btn: {},
  header__btn__text: {
    color: 'rgb(10, 57, 102)',
    fontSize: 17,
    fontWeight: '500',
  },
  searchBar: {
    backgroundColor: 'rgb(66, 75, 84)',
    position: 'relative',
    paddingHorizontal: 8,
    paddingVertical: 10,
    paddingBottom: 15,
  },
  searchBar__input: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingLeft: 60,
    paddingRight: 20,
  },
  searchBar__img: {
    top: 10,
    left: 5,
    width: 50,
    height: 50,
    position: 'absolute',
  },
  chosenContactContainer: {
    width: '100%',
    borderBottomColor: '#000',
    borderBottomWidth: 3,
    paddingVertical: 15,
  },
  chosenContact: {
    width: 130,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chosenContact__text: {
    width: '80%',
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    lineHeight: 15,
  },
  chosenContact__image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  chosenContact__closeIcon: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    padding: 5,
  },
  chosenContact__closeIconContainer: {
    top: 0,
    right: 30,
    zIndex: 10,
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 1,
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
    borderRadius: 50,
  },
});

export default Home;
