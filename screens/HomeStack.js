import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookList from './BookList';
import BookDetail from './BookDetail';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: 'lightsteelblue', height: 50 },
                headerTintColor: 'navy',
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 24, fontWeight: '700' }
            }} >
            <Stack.Screen
                name='BookList'
                component={BookList} />
            <Stack.Screen
                name='BookDetail'
                component={BookDetail} />
        </Stack.Navigator>
    );
}

export default HomeStack;