import React, {useEffect} from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {requestPermissionForAccesssContact} from '../../helper/permissions';
import Contacts from 'react-native-contacts';
import {useDispatch, useSelector} from 'react-redux';
import {setContacts} from '../../store/actions/contactActions';
import Header from '../../components/screenHeader';
import R from '../../resources/R';

let initialRender = true;
const Home = props => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactReducers.contacts);

  const transformContactsToContactsWithAddedDisableProp = contacts =>
    contacts.map(contact => {
      contact.disabled = false;
      return contact;
    });

  const transformContactsToSortedContacts = contactsUnsorted => {
    const contactsSorted = [];
    contactsUnsorted
      .map(contactObj => contactObj.displayName)
      .sort()
      .forEach(contactString => {
        contactsSorted.push(
          contactsUnsorted.filter(
            contact => contact.displayName === contactString,
          )[0],
        );
      });

    return contactsSorted;
  };
  const saveAllContactsAtStore = () => {
    Contacts.getAll()
      .then(contactsUnsorted => {
        const contactsSorted =
          transformContactsToSortedContacts(contactsUnsorted);
        const contactsAfterAddedDisableProp =
          transformContactsToContactsWithAddedDisableProp(contactsSorted);
        dispatch(setContacts(contactsAfterAddedDisableProp));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const startAddingContactsToFav = async () => {
    const response = await requestPermissionForAccesssContact();
    if (response == 'granted') {
      if (initialRender) {
        saveAllContactsAtStore();
        initialRender = false;
      }
      props.navigation.navigate('AddContact');
    } else if (response == 'denied') {
      console.log('denied');
    }
  };

  console.log(contacts);
  return (
    <View style={styles.screen}>
      <Header title="Home" />
      <View style={styles.screen__mainContent}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={startAddingContactsToFav}>
          <Text style={styles.addBtn__text}>Add To Favourite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgb(108, 122, 137)',
  },
  screen__mainContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  addBtn__text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '800',
  },
});

export default Home;
