import React from "react";
import { Dimensions, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Image from 'react-native-image-progress';

const { width, height } = Dimensions.get("window");

const ImgSliderItems = ({ item }) => {
  return (
    <View>
      <Image style={styles.image} source={{ 
        uri: item,
        
      
    }}
        indicator={() => <ActivityIndicator color={"black"} size="large" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width,
    height: "100%",
    resizeMode: "cover",
  },
});

export default ImgSliderItems;
