import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from './screens/HomeStack';
import AddNewBook from './screens/AddNewBook';

/*

Navigation Container
npm install @react-navigation/native

npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

npm install @react-navigation/bottom-tabs

npm install --save react-native-vector-icons

npm install firebase
*/

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='HomeStack'
        screenOptions={{
          tabBarActiveTintColor: 'navy',
          headerShown: false
        }} >
        <Tab.Screen
          name='HomeStack'
          component={HomeStack}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <Icon name='home' size={32} color={color} />
            )
          }} />
        <Tab.Screen
          name='AddNewBook'
          component={AddNewBook}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color }) => (
              <Icon name='plus-circle' size={32} color={color} />
            )
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;