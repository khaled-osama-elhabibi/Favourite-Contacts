import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
const Home = () => {
  return (
    <View style={styles.screen}>
      <Text>hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: 'black',
  },
});

export default Home;
