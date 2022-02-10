import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import ContactList from '../../components/contactsList';
import Header from '../../components/screenHeader';

const Favourite = () => {
  const favContacts = useSelector(state => state.contactReducers.favContacts);
  return (
    <View style={styles.screen}>
      <Header title="Favourite Contacts" />

      <ContactList contacts={favContacts} onPressOnItem={() => {}} />
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
  header: {
    backgroundColor: 'rgb(66, 75, 84)',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  header__text: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
});
export default Favourite;
