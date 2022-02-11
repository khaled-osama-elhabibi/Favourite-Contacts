import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const Btn = props => {
  return (
    <TouchableOpacity style={styles.addBtn} onPress={props.onPress}>
      <Text style={styles.addBtn__text}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    minWidth: 150,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  addBtn__text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: '800',
  },
});

export default Btn;
