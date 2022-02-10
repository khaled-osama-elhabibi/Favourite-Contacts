import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Favourite from '../screens/favourite';
import {createStackNavigator} from '@react-navigation/stack';
import AddContact from '../screens/addContact';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddContact" component={AddContact} />
    </Stack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name="HomeStack" component={HomeNav} />
        <Tab.Screen name="Favourite" component={Favourite} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
