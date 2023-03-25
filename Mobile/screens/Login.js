import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, NativeBaseProvider, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';

function Login() {
  const url = 'http://10.196.9.129:8000/api/v1/users/login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const fetchApi = async () => {
    try {
      const res = await Axios.post(url, {
        email: email,
        password: password,
      });
      console.log(res.data);
      if (res.data.body.profession == 'student') {
        navigation.navigate('StudentDash', {
          email: res.data.body.email,
        });
      } else if (res.data.body.profession == 'teacher') {
        navigation.navigate('TeacherDash', {
          email: res.data.body.email,
        });
      }
      setError('');
    } catch (err) {
      setError('Invalid email or password');
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Input
        placeholder="Email"
        variant="underlined"
        defaultValue={email}
        onChangeText={(x) => setEmail(x)}
        style={styles.input}
        _focus={{ borderColor: '#026efd' }}
        _hover={{ borderColor: '#026efd' }}
      />
      <Input
        placeholder="Password"
        variant="underlined"
        defaultValue={password}
        onChangeText={(x) => setPassword(x)}
        style={styles.input}
        _focus={{ borderColor: '#026efd' }}
        _hover={{ borderColor: '#026efd' }}
        type="password"
      />
      <Button style={styles.button} onPress={fetchApi}>
        Login
      </Button>
      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate('Signup')}>
          Sign up
        </Text>
      </View>
    </View>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loginText: {
    paddingTop:20,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    fontSize: 20,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#026efd',
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 300,
  },
  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#026efd',
  },
});

