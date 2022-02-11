import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import R from '../resources/R';
const ContactList = props => {
  return (
    <FlatList
      data={props.contacts}
      renderItem={({item}) => {
        return (
          <View
            style={
              item.disabled && !props.neglectDisable
                ? styles.contactDisabled
                : null
            }>
            <TouchableOpacity
              disabled={item.disabled}
              onPress={props.onPressOnItem.bind(this, item)}
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
          </View>
        );
      }}
      keyExtractor={contact => contact.displayName}
    />
  );
};

const styles = StyleSheet.create({
  contact: {
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  contactDisabled: {
    opacity: 0.4,
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

export default ContactList;
