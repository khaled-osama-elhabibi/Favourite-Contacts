import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import R from '../../resources/R';
import {useDispatch, useSelector} from 'react-redux';
import {setContacts, setFavContacts} from '../../store/actions/contactActions';
import ContactList from '../../components/contactsList';
import LocalDB from '../../helper/asyncStorage';

const AddContact = props => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contactReducers.contacts);
  const favContacts = useSelector(state => state.contactReducers.favContacts);
  const [searchKeyWord, setSearchKeyWord] = useState('');
  const [displayedContacts, setDisplayedContacts] = useState(contacts);
  const [chosenContactsTemp, setChosenContactsTemp] = useState([]);

  const nameTransformIfNeeded = name =>
    name.length > 10 ? name.slice(0, 10) + '...' : name;

  const isContactInChosenContactsTemp = newContact =>
    chosenContactsTemp.filter(
      contact => contact.displayName === newContact.displayName,
    ).length != 0;

  const addContactToChosenContactsTemp = newContact =>
    !isContactInChosenContactsTemp(newContact)
      ? setChosenContactsTemp([...chosenContactsTemp, newContact])
      : null;

  const removeContactFromChosenContactsTemp = removedContact => {
    setChosenContactsTemp([
      ...chosenContactsTemp.filter(
        contact => removedContact.displayName !== contact.displayName,
      ),
    ]);
  };

  const handleSearchTermChange = val => {
    setSearchKeyWord(val);
    setDisplayedContacts(
      contacts.filter(({displayName}) => {
        if (displayName.includes(val)) {
          return true;
        }
      }),
    );
  };

  const disableAddedContactsInContacts = () => {
    let tempContactsAfterDisable = contacts;
    chosenContactsTemp.forEach(tempContact => {
      tempContactsAfterDisable = tempContactsAfterDisable.map(item => {
        if (item.displayName == tempContact.displayName) {
          item.disabled = true;
          return item;
        } else return item;
      });
    });
    return tempContactsAfterDisable;
  };
  const addChosenContactsTempToFav = () => {
    const tempContactsAfterDisable = disableAddedContactsInContacts();
    dispatch(setContacts(tempContactsAfterDisable));
    dispatch(setFavContacts([...favContacts, ...chosenContactsTemp]));
    LocalDB.set(
      'favourite',
      JSON.stringify([...favContacts, ...chosenContactsTemp]),
    );
    props.navigation.goBack();
  };

  useEffect(() => {
    setDisplayedContacts(contacts);
  }, [contacts]);
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}
          style={styles.header__btn}>
          <Text style={styles.header__btn__text}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.header__mainSection}>
          <Text style={styles.header__mainSection__title}>
            Add To Favourite
          </Text>
          <Text style={styles.header__mainSection__number}>
            {chosenContactsTemp?.length}/{contacts?.length}
          </Text>
        </View>
        <TouchableOpacity
          onPress={addChosenContactsTempToFav}
          style={styles.header__btn}>
          <Text style={styles.header__btn__text}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          value={searchKeyWord}
          onChangeText={handleSearchTermChange}
          style={styles.searchBar__input}
        />
        <Image source={R.images.icon_search} style={styles.searchBar__img} />
      </View>
      {chosenContactsTemp.length == 0 ? null : (
        <View style={styles.chosenContactContainer}>
          <FlatList
            data={chosenContactsTemp}
            horizontal={true}
            renderItem={({item}) => {
              return (
                <View style={styles.chosenContact}>
                  <TouchableOpacity
                    onPress={removeContactFromChosenContactsTemp.bind(
                      this,
                      item,
                    )}
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
      )}
      <View>
        <ContactList
          contacts={displayedContacts}
          onPressOnItem={addContactToChosenContactsTemp}
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
    width: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  chosenContact__text: {
    width: '90%',
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
});

export default AddContact;
