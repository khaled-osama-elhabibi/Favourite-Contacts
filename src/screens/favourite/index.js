import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ContactList from '../../components/contactsList';
import Header from '../../components/screenHeader';
import LocalDB from '../../helper/asyncStorage';
import {
  disableArrayOfContacts,
  setFavContacts,
} from '../../store/actions/contactActions';

const Favourite = () => {
  const favContacts = useSelector(state => state.contactReducers.favContacts);
  const dispatch = useDispatch();
  const removeAllFav = () => {
    LocalDB.remove('favourite');
    dispatch(setFavContacts([]));
    dispatch(disableArrayOfContacts([]));
  };
  return (
    <View style={styles.screen}>
      <Header title="Favourite Contacts">
        <View style={styles.header__row}>
          <TouchableOpacity
            onPress={removeAllFav}
            style={styles.header__row__btn}>
            <Text style={styles.header__row__btn__text}>
              remove all favourites
            </Text>
          </TouchableOpacity>
        </View>
      </Header>

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
  header__row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  header__row__btn: {
    marginTop: 10,
    width: 180,
  },
  header__row__btn__text: {
    textAlign: 'center',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
  },
});
export default Favourite;
