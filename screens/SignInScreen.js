import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Switch } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = () => {
  const [userObject, setUserObject] = useState({
    email: '',
    password: '',
    error: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('email');
        const savedPassword = await AsyncStorage.getItem('password');
        if (savedEmail && savedPassword) {
          setUserObject({ email: savedEmail, password: savedPassword, error: '' });
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Failed to load credentials', error);
      }
    };
    loadCredentials();
  }, []);

  
async function signIn() {
  if (userObject.email === '' || userObject.password === '') {
    setUserObject({
      ...userObject,
      error: 'Enter Email and Password.'
    });
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, userObject.email, userObject.password)
      .then((result) => {
        console.log("User Logged in: " + result.user.email);
        if (rememberMe) {
          AsyncStorage.setItem('email', userObject.email);
          AsyncStorage.setItem('password', userObject.password);
        } else {
          AsyncStorage.removeItem('email');
          AsyncStorage.removeItem('password');
        }
        navigation.navigate('Home');
      });
  } catch (e) {
    setUserObject({
      ...userObject,
      error: 'Invalid email or password!'
    });
    Alert.alert('Error', 'Invalid email or password!');
  }
}

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder='Enter Email'
        keyboardType='email-address'
        autoCapitalize="none"
        autoCorrect={false}
        value={userObject.email}
        onChangeText={(text) => setUserObject({ ...userObject, email: text })}
      />
      <TextInput
        style={styles.inputText}
        placeholder='Enter Password'
        secureTextEntry={true}
        autoCorrect={false}
        autoCapitalize='none'
        value={userObject.password}
        onChangeText={(text) => setUserObject({ ...userObject, password: text })}
      />
      <View style={styles.rememberMeContainer}>
        <Text>Remember Me</Text>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
        />
      </View>
      {!!userObject.error && (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: 'red', fontSize: 14 }}>{userObject.error}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.buttonStyle} onPress={signIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    width: '80%',
    height: 50,
    borderColor: 'crimson',
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 18,
    marginBottom: 20
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'crimson',
    borderRadius: 10,
    height: 40
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white'
  }
});

export default SignInScreen;