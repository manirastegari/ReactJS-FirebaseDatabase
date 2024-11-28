import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import CryptoDetailsScreen from './screens/CryptoDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

const HeaderButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const headerOptions = ({ navigation }) => ({
  headerRight: () => (
    <HeaderButton
      title="Logout"
      onPress={() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          })
        );
      }}
    />
  ),
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerTitle: 'Login' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerTitle: 'Register' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={headerOptions}
        />
        <Stack.Screen
          name="CryptoDetails"
          component={CryptoDetailsScreen}
          options={headerOptions}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'crimson',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export default App;