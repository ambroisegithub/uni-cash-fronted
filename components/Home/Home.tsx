import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Font from "expo-font";

const loadFonts = async () => {
  await Font.loadAsync({
    "Rubik-Mono-One": require("@/assets/fonts/RubikMonoOne-Regular.ttf"),
  });
};

const Home = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  React.useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <View>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/uni-cashlog.png")}
          style={styles.unicashlogo}
        />
        <Text style={styles.text}>UniShop</Text>
        <Text style={styles.slogan}>Shop Slogan</Text>
        <View>
          <Text style={styles.uniSale}>UNISHOP SALE</Text>
        </View>
        <LinearGradient
          colors={["#1BE4DA", "#4F92E6"]}
          style={styles.textContainer}
        >
          <TouchableOpacity>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.newContainer}>
        <Text style={styles.New}>New</Text>
        <Text style={styles.neverseen}>You’ve never seen it before!</Text>
      </View>
      <View style={styles.ImageView}>
      <View>
        <Image
          source={require("@/assets/images/student.jpg")}
          style={styles.postImage}
        />
        <TouchableOpacity style={styles.ViewAll}><Text style={styles.ViewAllText} >View</Text></TouchableOpacity>
        </View>
        <View>
        <Image
          source={require("@/assets/images/student.jpg")}
          style={styles.postImage}
        />
        <TouchableOpacity style={styles.ViewAll}><Text style={styles.ViewAllText} >View</Text></TouchableOpacity>
        </View>

        <View>
        <Image
          source={require("@/assets/images/student.jpg")}
          style={styles.postImage}
        />
        <TouchableOpacity style={styles.ViewAll}><Text style={styles.ViewAllText} >View</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  unicashlogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 158,
    height: 146,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: "100%",
    height: "auto",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#5B7FE9",
    fontFamily: "Rubik-Mono-One",
  },
  slogan: {
    paddingTop: 10,
    paddingBottom: 20,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  textContainer: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 50,
  },
  gradientText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  uniSale: {
    color: 'white',
    width: 190,
    fontSize: 30,
    fontFamily: "Rubik-Mono-One",
    lineHeight:40,
    paddingBottom:20
  },
  New: {
    color: 'white',
    fontSize: 30,
    fontFamily: "Rubik-Mono-One",
  },
  newContainer: {
    padding: 20,
    backgroundColor: 'black',
    fontWeight: 'bold',
    color: 'white',
  },
  neverseen:{
    color:'white',
    marginTop:20,
    fontWeight:'bold'
  },
  ImageView:{
    backgroundColor:'red',
    width:'100%',
    paddingLeft:20,
    height:200,
    display:'flex',
    flexDirection:'row',
    gap:10
    
  
  },
  postImage:{
    width: 130,
    height: 130,
    marginTop:20,
    display:'flex',
    paddingLeft:20,backgroundColor:'black',
    borderRadius:5

  },
  ViewAll:{
    color:'white',
    backgroundColor:'black',
    width:59,
    height:34,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    textAlign:'center',
    borderRadius:5,
    zIndex:20,
    marginTop:-120,
    marginLeft:10

  },
  ViewAllText:{
    color:'white'
  }
});

export default Home;
