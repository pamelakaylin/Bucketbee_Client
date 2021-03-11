import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DotLoading from '../Components/dotLoading';
import { LOGIN_USER } from '../Services/Users/UsersMutation';
import theme from '../styles/theme.style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/client';
import { AuthContext } from '../Operations/Store';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wait, setWait] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const { dispatch } = useContext(AuthContext);

  const [loginUser, { error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      if (data && data.loginUser) {
        try {
          const jsonData = JSON.stringify(data.loginUser);
          dispatch({ type: 'LOGIN', data: jsonData });
          setWait(false);
        } catch (e) {
          console.log(e);
        }
      }
      setWait(false);
    },
    onError: (e) => console.log('Error with login', e),
  });

  const handleStart = () => {
    setIsLoaded(false);
    if (
      !email.replace(/\s/g, '').length ||
      !password.replace(/\s/g, '').length
    ) {
      Alert.alert('Please fill in email and password');
      return;
    }
    setWait(true);
  };

  const handleLogin = async () => {
    const input = { email, password };
    loginUser({
      variables: { input },
    });
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    let timer;
    if (wait) {
      timer = setTimeout(handleLogin, 1000);
    }
    return () => clearTimeout(timer);
  }, [wait]);

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.centered}>
      <View style={styles.circle}>
        <Image
          style={styles.logo}
          source={require('./../assets/bbLogo3.png')}
        />
      </View>
      <Text style={styles.title}>Welcome back.</Text>
      <View style={styles.loginContainer}>
        <Input
          value={email}
          onChangeText={(val) => setEmail(val)}
          style={styles.inputWrapper}
          inputContainerStyle={styles.input}
          placeholder="EMAIL"
          keyboardAppearance="dark"
          keyboardType="email-address"
          selectionColor={theme.PRIMARY_COLOR_XLITE}
          spellCheck={false}
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
          secureTextEntry={true}
          selectionColor={theme.PRIMARY_COLOR_XLITE}
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
          <TouchableOpacity activeOpacity={0.6} onPress={handleStart}>
            <View style={styles.btn}>
              <Text style={styles.text}>LOGIN</Text>
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
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.altText}>CREATE AN ACCOUNT </Text>
        </TouchableOpacity>
        {error && <Text>{error.message}</Text>}
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
    borderRadius: 100,
    borderColor: theme.PRIMARY_COLOR_XLITE,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
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
    height: 50,
    width: 320,
    backgroundColor: '#106a7a',
    borderRadius: 40,
    paddingHorizontal: 15,
    borderBottomWidth: 0,
  },
});

export default Login;
