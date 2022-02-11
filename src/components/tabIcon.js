import * as React from 'react';
import {StyleSheet, Image, View} from 'react-native';

const TabIcon = props => {
  return (
    <View>
      <Image
        style={styles.tabImg}
        source={props.focused ? props.iconObj.inactive : props.iconObj.active}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabImg: {
    width: 40,
    height: 40,
  },
});
export default TabIcon;
