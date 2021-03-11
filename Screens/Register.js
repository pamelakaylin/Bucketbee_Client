import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { REGISTER_USER } from '../Services/Users/UsersMutation';
import { AuthContext } from '../Operations/Store';
import theme from '../styles/theme.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/client';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wait, setWait] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const { dispatch } = useContext(AuthContext);

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      if (data && data.registerUser) {
        try {
          const jsonData = JSON.stringify(data.registerUser);
          dispatch({ type: 'REGISTER', data: jsonData });
        } catch (e) {
          console.log(e);
        }
      }
    },
    onError: (e) => console.log('Error with registration', e),
  });

  const handleStartPress = () => {
    setIsLoaded(false);
    if (
      !name.replace(/\s/g, '').length ||
      !username.replace(/\s/g, '').length ||
      !email.replace(/\s/g, '').length ||
      !password.replace(/\s/g, '').length
    ) {
      Alert.alert('Please fill in all fields!');
      return;
    }
    setWait(true);
  };

  const handleRegister = async () => {
    try {
      let nameArr = name.trim().split(' ');
      const firstName = nameArr[0];
      let lastName;
      if (nameArr.length > 1) lastName = nameArr[nameArr.length - 1];
      const input = {
        firstName,
        lastName,
        username: username.trim(),
        email: email.trim(),
        password,
      };
      registerUser({ variables: { input } });
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setWait(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    let timer;
    if (wait) {
      timer = setTimeout(handleRegister, 1000);
    }
    return () => clearTimeout(timer);
  }, [wait]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.centered}>
      <Image style={styles.logo} source={require('./../assets/bbLogo3.png')} />
      <Text style={styles.title}>Lets begin.</Text>
      <View style={styles.loginContainer}>
        <Input
          value={name}
          onChangeText={(val) => setName(val)}
          style={styles.inputWrapper}
          inputContainerStyle={styles.input}
          placeholder="FULL NAME"
          keyboardAppearance="dark"
          textContentType="name"
          spellCheck={false}
          leftIcon={
            <Icon
              style={{ marginRight: 10 }}
              name="user-o"
              size={24}
              color={theme.PRIMARY_COLOR_XLITE}
            />
          }
        />
        <Input
          value={username}
          onChangeText={(val) => setUsername(val)}
          style={styles.inputWrapper}
          inputContainerStyle={styles.input}
          placeholder="USERNAME"
          keyboardAppearance="dark"
          spellCheck={false}
          leftIcon={
            <Icon
              style={{ marginRight: 10 }}
              name="user-o"
              size={24}
              color={theme.PRIMARY_COLOR_XLITE}
            />
          }
        />
        <Input
          value={email}
          onChangeText={(val) => setEmail(val)}
          style={styles.inputWrapper}
          inputContainerStyle={styles.input}
          placeholder="EMAIL"
          keyboardAppearance="dark"
          leftIcon={
            <Icon
              style={{ marginRight: 10 }}
              name="envelope-o"
              size={24}
              color={theme.PRIMARY_COLOR_XLITE}
            />
          }
        />
        <Input
          value={password}
          onChangeText={(val) => setPassword(val)}
          style={styles.inputWrapper}
          inputContainerStyle={styles.input}
          placeholder="PASSWORD"
          keyboardAppearance="dark"
          textContentType="password"
          secureTextEntry={true}
          leftIcon={
            <Icon
              style={{ marginRight: 10 }}
              name="lock"
              size={24}
              color={theme.PRIMARY_COLOR_XLITE}
            />
          }
        />
        {isLoaded ? (
          <TouchableOpacity activeOpacity={0.6} onPress={handleStartPress}>
            <View style={styles.btn}>
              <Text style={styles.text}>SIGN UP</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableWithoutFeedback>
            <View style={styles.btn}>
              <ActivityIndicator size="small" color={theme.PRIMARY_COLOR} />
            </View>
          </TouchableWithoutFeedback>
        )}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.altText}>I HAVE AN ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#0d525f',
  },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  title: {
    color: theme.PRIMARY_COLOR_XLITE,
    fontSize: 34,
    fontFamily: 'Poppins_300Light',
    paddingTop: 20,
  },
  loginContainer: {
    marginTop: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: theme.PRIMARY_COLOR_XLITE,
    width: 220,
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  text: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: theme.PRIMARY_COLOR,
  },
  altText: {
    fontFamily: 'Poppins_300Light',
    fontSize: 16,
    color: theme.PRIMARY_COLOR_XLITE,
    textDecorationLine: 'underline',
  },
  circle: {
    height: 130,
    width: 130,
    borderRadius: 100,
    borderWidth: 6,
    borderColor: theme.PRIMARY_COLOR_XLITE,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 140,
    width: 140,
    borderRadius: 100,
  },
  inputWrapper: {
    fontFamily: 'Poppins_400Regular',
    color: theme.PRIMARY_COLOR_XLITE,
  },
  input: {
    height: 45,
    width: 320,
    backgroundColor: '#106a7a',
    borderRadius: 40,
    paddingHorizontal: 15,
    borderBottomWidth: 0,
  },
});

export default Register;
