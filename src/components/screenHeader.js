import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.header__text}>{props.title}</Text>
      <View>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
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
export default Header;
