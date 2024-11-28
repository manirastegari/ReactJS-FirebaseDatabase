import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const AuthScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Login') {
            iconName = 'log-in-outline';
          } else if (route.name === 'Register') {
            iconName = 'person-add-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Login" component={SignInScreen} />
      <Tab.Screen name="Register" component={SignUpScreen} />
    </Tab.Navigator>
  );
};

export default AuthScreen;