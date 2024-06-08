
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Login = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    // Handle login logic
    console.log('Login button pressed');
  };

  const navigateToSignUp = () => {
    router.push('/(tabs)/SignUp');
  };

  const navigateToForgotPassword = () => {
    // Navigate to Forgot Password page
    console.log('Navigate to Forgot Password');
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/uni-cashlog.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.passwordTextInput}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <MaterialIcons
              name={passwordVisible ? 'visibility' : 'visibility-off'}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.forgotPasswordLink} onPress={navigateToForgotPassword}>
        <Text style={styles.linkText}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signUpLinkContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={navigateToSignUp}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  logo: {
    width: 120,
    height: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 54,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'linear-gradient(90deg, rgba(27, 228, 218, 1) 0%, rgba(79, 146, 230, 1) 100%)',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  passwordTextInput: {
    flex: 1,
    color: '#fff',
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPasswordLink: {
    marginBottom: 20,
  },
  linkText: {
    color: '#5B7FE9',
  },
  loginButton: {
    backgroundColor: '#5B7FE9',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',

  },
  signUpLinkContainer: {
    flexDirection: 'row',
  },
  signupText: {
    color: '#fff',
  },
  signupLink: {
    color: '#5B7FE9',
    marginLeft: 5,
  },
});

export default Login;