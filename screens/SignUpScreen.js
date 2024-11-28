import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [userObject, setUserObject] = useState({
    email: '',
    password: '',
    error: ''
  });
  const navigation = useNavigation();

  async function signUp() {
  if (userObject.email === '' || userObject.password === '') {
    setUserObject({
      ...userObject,
      error: 'Email and Password are mandatory.'
    });
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, userObject.email, userObject.password)
      .then((result) => {
        Alert.alert('Success', 'User Created: ' + result.user.email);
        navigation.navigate('Home');
      });
  } catch (e) {
    setUserObject({
      ...userObject,
      error: e.message || 'Something went wrong!'
    });
    Alert.alert('Error', e.message || 'Something went wrong!');
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
      {!!userObject.error && (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ color: 'red', fontSize: 14 }}>{userObject.error}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.buttonStyle} onPress={signUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
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

export default SignUpScreen;
