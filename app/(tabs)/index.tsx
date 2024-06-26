import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  FlatList,
  Dimensions,
  ScrollView,
  Pressable
} from "react-native";
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { Easing } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

const loadFonts = async () => {
  await Font.loadAsync({
    "Rubik-Mono-One": require("@/assets/fonts/RubikMonoOne-Regular.ttf"),
  });
};

type Slide = {
  img: any;
  title: string;
  description: string;
  price: string;
};

type PaginationProps = {
  data: Slide[];
  scrollX: Animated.Value;
};

const Pagination = ({ data, scrollX }: PaginationProps) => {
  const pageSize = Math.ceil(data.length / 3);
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: pageSize }).map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.2, 1, 0.2],
          extrapolate: "clamp",
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ["#ccc", "#000", "#ccc"],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, { width: dotWidth, opacity, backgroundColor }]}
          />
        );
      })}
    </View>
  );
};

type SlideItemProps = {
  item: Slide;
};

const SlideItem = ({ item }: SlideItemProps) => {
  const translateYImage = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  }, []);

  return (
    <View style={styles.slideItemContainer}>
      <Animated.Image
        source={item.img}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [{ translateY: translateYImage }],
          },
        ]}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );
};

const Index = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  const handleOnScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
          },
        },
      },
    ],
    {
      useNativeDriver: false,
    }
  );

  const handleOnViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const firstVisibleItem = viewableItems[0];
      if (firstVisibleItem.index !== null) {
        setIndex(firstVisibleItem.index);
      }
    }
  ).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  if (!fontsLoaded) {
    return null;
  }

  const slides: Slide[] = [
    {
      img: require("@/assets/images/student.jpg"),
      title: "Title 1",
      description: "Description 1",
      price: "$10",
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Title 2",
      description: "Description 2",
      price: "$20",
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Title 3",
      description: "Description 3",
      price: "$30",
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Title 4",
      description: "Description 4",
      price: "$40",
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Title 5",
      description: "Description 5",
      price: "$50",
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Title 6",
      description: "Description 6",
      price: "$60",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
      <View>
        <FlatList
          data={slides}
          renderItem={({ item }) => <SlideItem item={item} />}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          contentContainerStyle={{ paddingHorizontal: width * 0.00 }}
        />
        <Pagination data={slides} scrollX={scrollX} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "black",
  },
  unicashlogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 158,
    height: 146,
    resizeMode: "contain",
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
    textAlign: "center",
  },
  slogan: {
    paddingTop: 10,
    paddingBottom: 20,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
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
    textAlign: "center",
  },
  uniSale: {
    color: "white",
    width: 190,
    fontSize: 30,
    fontFamily: "Rubik-Mono-One",
    lineHeight: 40,
    paddingBottom: 20,
    textAlign: "center",
  },
  New: {
    color: "white",
    fontSize: 30,
    fontFamily: "Rubik-Mono-One",
    textAlign: "center",
  },
  newContainer: {
    padding: 20,
    backgroundColor: "black",
    fontWeight: "bold",
    color: "white",
  },
  neverseen: {
    color: "white",
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  paginationContainer: {
    position: "absolute",
    bottom: -20,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 3,
    backgroundColor: "#ccc",
  },
  slideItemContainer: {
    width: width / 3,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  image: {
    width: "100%",
    height: width / 3
  },
  content: {
    alignItems: 'center',
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: 'white',
  },
  description: {
    fontSize: 12,
    marginVertical: 8,
    textAlign: "center",
    color: 'white',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: 'white',
    textAlign: "center",
    fontWeight: 'bold',
  },
  IconsubContainer: {
    color: "white",
    fontSize: 30,
  },
  IconContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    gap: 20,
    justifyContent: 'center',
    marginTop: 20
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5
  }
});

export default Index;