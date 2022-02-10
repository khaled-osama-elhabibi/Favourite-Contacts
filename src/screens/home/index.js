import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {requestPermissionForAccesssContact} from '../../helper/permissions';
import Contacts from 'react-native-contacts';
import {useDispatch, useSelector} from 'react-redux';
import {setContacts} from '../../store/actions/contactActions';
import Header from '../../components/screenHeader';

const Home = props => {
  // const [contacts,setContacts] = useState([])
  const contacts = useSelector(state => state.contactReducers.contacts);
  const dispatch = useDispatch();

  const saveAllContactsAtStore = () => {
    Contacts.getAll()
      .then(contacts => {
        dispatch(setContacts(contacts));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const startAddingContactsToFav = async () => {
    const response = await requestPermissionForAccesssContact();
    console.log(response);
    if (response == 'granted') {
      saveAllContactsAtStore();
      props.navigation.navigate('AddContact');
    } else if (response == 'denied') {
      console.log('denied');
    }
  };

  useEffect(() => {
    console.log(contacts);
  }, [contacts]);
  return (
    <View style={styles.screen}>
      <Header title="Home" />
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={startAddingContactsToFav}>
          <Text>Add To Favourite</Text>
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
  addBtn: {},
});

export default Home;
