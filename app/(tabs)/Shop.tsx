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
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Easing } from "react-native";

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
  rating: number;
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
  item1: Slide;
  item2?: Slide;
};

const SlideItem = ({ item1, item2 }: SlideItemProps) => {
  const translateYImage = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  }, []);

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <View style={styles.ratingContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <MaterialIcons key={`full-${i}`} name="star" size={16} color="#FFD700" />
        ))}
        {halfStar && <MaterialIcons name="star-half" size={16} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, i) => (
          <MaterialIcons key={`empty-${i}`} name="star-border" size={16} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.slideItemContainer}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={item1.img}
          resizeMode="contain"
          style={[
            styles.image,
            {
              transform: [{ translateY: translateYImage }],
            },
          ]}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{item1.title}</Text>
          <Text style={styles.description}>{item1.description}</Text>
          <Text style={styles.price}>{item1.price}</Text>
          {renderRating(item1.rating)}
        </View>
      </View>
      {item2 && (
        <View style={styles.imageContainer}>
          <Animated.Image
            source={item2.img}
            resizeMode="contain"
            style={[
              styles.image,
              {
                transform: [{ translateY: translateYImage }],
              },
            ]}
          />
          <View style={styles.content}>
            <Text style={styles.title}>{item2.title}</Text>
            <Text style={styles.description}>{item2.description}</Text>
            <Text style={styles.price}>{item2.price}</Text>
            {renderRating(item2.rating)}
          </View>
        </View>
      )}
    </View>
  );
};

const Shop = () => {
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
      title: "Touchable screen",
      description: "Material Sales",
      price: "$400",
      rating: 4.5,
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Touchable screen",
      description: "Material Sales",
      price: "$350",
      rating: 4.0,
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Touchable screen",
      description: "Material Sales",
      price: "$450",
      rating: 4.8,
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Touchable screen",
      description: "Material Sales",
      price: "$500",
      rating: 4.9,
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Touchable screen",
      description: "Material Sales",
      price: "$400",
      rating: 4.5,
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Touchable screen",
      description: "Material Sales",
      price: "$350",
      rating: 4.0,
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Touchable screen",
      description: "Material Sales",
      price: "$450",
      rating: 4.8,
    },
    {
      img: require("@/assets/images/student.jpg"),
      title: "Touchable screen",
      description: "Material Sales",
      price: "$500",
      rating: 4.9,
    },
  ];

  const pairedSlides = [];
  for (let i = 0; i < slides.length; i += 2) {
    pairedSlides.push({ item1: slides[i], item2: slides[i + 1] });
  }

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
          <Text style={styles.uniSale}>Work With Us</Text>
        </View>
      </View>
      <View style={styles.salesContainer}>
        <Text style={styles.salesText}>Sales</Text>
        <View style={styles.materialsSales}>
          <Text style={styles.materialsSalesText}>Materials Sales</Text>
        </View>
        <FlatList
          data={pairedSlides}
          renderItem={({ item }) => <SlideItem item1={item.item1} item2={item.item2} />}
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
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "black",
  },
  unicashlogo: {
    width: 100,
    height: 100,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  slogan: {
    color: "white",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  uniSale: {
    paddingTop: 40,
    paddingBottom: 0,
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  salesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  salesText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
  },
  materialsSales: {
    justifyContent: "center",
    alignItems: "center",
  },
  materialsSalesText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000",
    marginHorizontal: 8,
  },
  slideItemContainer: {
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: width / 2 - 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: width / 2,
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
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Shop;