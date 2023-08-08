import React from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, View, Text } from "react-native";
import Animated, {
  interpolateColor, useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from "react-native-reanimated";

import Card, { CARD_HEIGHT } from "@/core/components/base/Philz/Card";
import Products from "@/core/components/base/Philz/components/Product";
import { products } from "@/core/components/base/Philz/Model";
import { styled } from "nativewind";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  slider: { height: CARD_HEIGHT, paddingTop: 30 },
});
const snapToOffsets = [0, CARD_HEIGHT];

const CategoryScreenTwo = () => {
  const translateX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateX.value = event.contentOffset.x;
    },
  });
  const style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      products.map((_, i) => width * i),
      products.map((product) => product.color2)
    ) as string;
    return { flex: 1, backgroundColor };
  });

  const StyledView = styled(View)
  const StyledText = styled(Text)
  const StyledPressable = styled(Pressable)

  const navigation = useNavigation()

  return (

    <>

      <Animated.View style={style}>
        <StyledView className=' py-4 px-4 pt-10'>

          <StyledPressable
            onPress={() => navigation.goBack()}
          >
            <AntDesign name='close' color={"black"} size={25} />
          </StyledPressable>


          <StyledText className='text-2xl font-bold mt-8'>Nos Nouvelles paires</StyledText>
        </StyledView>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          snapToOffsets={snapToOffsets}
          snapToEnd={false}
          decelerationRate="fast"
        >
          <View style={styles.slider}>
            <Animated.ScrollView
              onScroll={onScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={width}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {products.map((product, index) => (
                <Card product={product} key={index} />
              ))}
            </Animated.ScrollView>
            <Products x={translateX} />
          </View>

        </ScrollView>
      </Animated.View>

    </>
  );
};

export default CategoryScreenTwo;