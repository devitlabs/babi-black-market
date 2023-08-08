import React from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

//import components
import ImgSliderItem from "./ImgSliderItem";

//import styles and assets

const { width, height } = Dimensions.get("window");

const ImgCarousel = ({ images }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => "key" + index}
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <ImgSliderItem item={item?.sourceUrl} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: width,
    height: height / 3,
    borderRadius: 10,
  },
});

export default ImgCarousel;
