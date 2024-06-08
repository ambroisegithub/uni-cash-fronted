
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import * as Font from "expo-font";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const loadsFonts = async () => {
  await Font.loadAsync({
    "AlegreyaSans-Black": require("@/assets/fonts/AlegreyaSans-Black.ttf"),
  });
};

const SignUp = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadsFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleSignUp = () => {
    Alert.alert("Sign Up", "Sign up button pressed");
  };

  const navigateToLogin = () => {
    router.push("(screens)/Login"); 
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.signupContainer}>
          <Image
            source={require("@/assets/images/uni-cashlog.png")}
            style={styles.uniShoLogo}
          />
          <Text style={styles.signUpText}>Sign Up</Text>
          <View style={styles.TextInputContainer}>
            <View>
              <Text style={styles.textTitle}>Name</Text>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="white"
                placeholder="Uni Shop"
              />
            </View>
            <View>
              <Text style={styles.textTitle}>Email</Text>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="white"
                placeholder="uni.shop@gmail.com"
              />
            </View>
            <View>
              <Text style={styles.textTitle}>TelePhone</Text>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="white"
                placeholder="+250 788437823"
              />
            </View>
            <View>
              <Text style={styles.textTitle}>Registration Number</Text>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="white"
                placeholder="221003333..."
              />
            </View>
            <View>
              <Text style={styles.textTitle}>Password</Text>
              <TextInput
                style={styles.TextInput}
                placeholderTextColor="white"
                placeholder="••••••••"
                secureTextEntry={!passwordVisible}
              />
              <Pressable onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                <MaterialIcons
                  name={passwordVisible ? 'visibility' : 'visibility-off'}
                  size={24}
                  color='white'
                />
              </Pressable>
            </View>

            <View style={styles.checkboxContainer}>
              <Pressable onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
                <MaterialIcons
                  name={rememberMe ? "check-box" : "check-box-outline-blank"}
                  size={24}
                  color="white"
                />
              </Pressable>
              <Text style={styles.checkboxLabel}>Remember Me</Text>
            </View>

            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>Already have an account?</Text>
              <Pressable onPress={navigateToLogin}>
                <Text style={styles.loginLink}>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "black",
  },
  signupContainer: {
    backgroundColor: "black",
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  uniShoLogo: {
    width: 101,
    height: 74,
  },
  signUpText: {
    fontFamily: "AlegreyaSans-Black",
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
    paddingTop: 20,
    paddingBottom: 20,
  },
  TextInputContainer: {
    paddingLeft: 35,
    width: "100%",
    height: "auto",
    marginTop: 20,
    alignContent: "center",
    textAlign: "left",
    flexDirection: "column",
  },
  TextInput: {
    width: "92%",
    height: 64,
    backgroundColor: "#121212",
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 20,
    color: "white",
  },
  textTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  eyeIcon: {
    position: "absolute",
    right: 40,
    bottom: 30,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    color: "white",
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "92%",
  },
  signUpButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "white",
    fontSize: 14,
  },
  loginLink: {
    color: "#007bff",
    fontSize: 14,
    marginLeft: 5,
  },
});