import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Favourite from '../screens/favourite';
import {createStackNavigator} from '@react-navigation/stack';
import AddContact from '../screens/addContact';
import {Text} from 'react-native';
import TabIcon from '../components/tabIcon';
import R from '../resources/R';
import {useSelector} from 'react-redux';
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
  const favContacts = useSelector(state => state.contactReducers.favContacts);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, size}) => {
            let iconObj = {};
            switch (route.name) {
              case 'HomeStack':
                iconObj = R.images.icon_home;
                break;
              case 'Favourite':
                iconObj = R.images.icon_fav;
                break;
            }
            return <TabIcon iconObj={iconObj} focused={focused} size={size} />;
          },
          headerShown: false,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="HomeStack" component={HomeNav} />
        <Tab.Screen
          name="Favourite"
          options={{tabBarBadge: favContacts?.length}}
          component={Favourite}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
