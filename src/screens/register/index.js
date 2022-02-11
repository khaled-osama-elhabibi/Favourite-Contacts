import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {setPhoneNumberAtStore} from '../../store/actions/authActions';
import LocalDB from '../../helper/asyncStorage';
import Btn from '../../components/btn';

const Register = props => {
  const [loadingOfSignUp, setLoadingOfSignUp] = useState(false);
  const [loadingOfCodeConfirm, setLoadingOfCodeConfirm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const executeOnSuccessOTP = res => {
      setLoadingOfCodeConfirm(false);
      dispatch(setPhoneNumberAtStore(phoneNumber));
      LocalDB.set('phoneNumber', JSON.stringify(phoneNumber));
      props.navigation.navigate('Home');
    },
    executeOnFailOTP = error => {
      Alert.alert('Incorrect OTP Code', 'Please try again', [
        {text: 'OK', onPress: () => {}},
      ]);
      setLoadingOfCodeConfirm(false);
      console.log(error);
    };
  const confirmCode = async () => {
    setLoadingOfCodeConfirm(true);
    confirm
      .confirm(code)
      .then(res => {
        executeOnSuccessOTP(res);
      })
      .catch(error => {
        executeOnFailOTP(error);
      });
  };
  const signInWithPhoneNumber = async phoneNumber => {
    setLoadingOfSignUp(true);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    setLoadingOfSignUp(false);
  };
  const signUp = async () => {
    try {
      await signInWithPhoneNumber(`+20 ${phoneNumber}`);
    } catch (err) {
      console.error('error signing up: ', err);
    }
  };
  if (!confirm)
    return (
      <View style={styles.screen}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => setPhoneNumber(val)}
        />
        <Btn onPress={signUp}>
          {loadingOfSignUp ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            'Sign Up'
          )}
        </Btn>
      </View>
    );
  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.input}
        placeholder="Code"
        value={code}
        placeholderTextColor="white"
        onChangeText={text => setCode(text)}
      />
      <Btn onPress={() => confirmCode()}>
        {loadingOfCodeConfirm ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          'Confirm Code'
        )}
      </Btn>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(108, 122, 137)',
  },

  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Register;
