import { styled } from 'nativewind';
import { Dimensions, ScrollView, Text as RNText, View } from 'react-native';

import CategoryTitle from '@/core/components/base/CategoryTitle';
import { ProductItem } from '@/core/components/design-system/ProductItem';
import { FlashList } from "@shopify/flash-list";
import React, { useState } from 'react';
import { ProductCard } from '../components/design-system/ProductCard';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


const DATA = [
  {
    title: "Nancy Chair",
    price: "$129.99",
    link: require("../../assets/demo/1.png"),
  },
  {
    title: "Jongon Jensen Minimal Chair",
    price: "$129.99",
    link: require("../../assets/demo/2.png"),
  },
];

const CATEGORYData = [
  {
    title: "Chairs",
    sub: "1256 items",
    link: require("../../assets/armchair.png"),
  },
  {
    title: "Office Chair",
    sub: "96 items",
    link: require("../../assets/office-chair.png"),
  },
  {
    title: "Smartphones",
    sub: "126 items",
    link: require("../../assets/smartphone.png"),
  },
  {
    title: "Clothing",
    sub: "4526 items",
    link: require("../../assets/suit.png"),
  },
  {
    title: "Shoes",
    sub: "526 items",
    link: require("../../assets/sneakers.png"),
  },
  {
    title: "Watches",
    sub: "66 items",
    link: require("../../assets/wristwatch.png"),
  },
]



const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const Text = styled(RNText)

export default function ExploreScreen() {
  const [isSelected, setIsSelected] = useState("");
  const insets = useSafeAreaInsets();


  return (
    <>
      <StyledScrollView style={{
        flex: 1,
        backgroundColor: "white",

      }}
        className="px-4"
      >

        <Text className='text-2xl font-bold mt-20'>Explore</Text>

        <StyledView className='mt-4' style={{ height: Dimensions.get("screen").height / 3.5, }}>

          <FlashList
            data={CATEGORYData}
            renderItem={({ item }) => <ProductCard  active={isSelected===item.title} onPress={(e) => {
              setIsSelected(e)
            }} title={item.title} description={item.sub} image={item.link} />}
            estimatedItemSize={300}
            horizontal={true}
            key={isSelected}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={
              () => (
                <StyledView className='w-4' />
              )
            }

          />
        </StyledView>

        <CategoryTitle title='Best sellers' secondText='Show all' />
 
        <StyledView

className='flex items-start flex-row justify-center  flex-wrap gap-2 pb-40' style={{ height: Dimensions.get("screen").height *DATA.length/5 }}>

{
  DATA.map((item, index) => (
    <StyledView
      style={{
        width: Dimensions.get("screen").width / 2 -25,
      }}
    >
      <ProductItem key={index} title={item.title} description={item.price} image={item.link} />
    </StyledView>
  ))
}

{/* <FlashList
  data={DATA}
  renderItem={({ item }) => <ProductItem title={item.title} description={item.price} image={item.link} />}
  estimatedItemSize={300}
  numColumns={2}
  horizontal={false}
  scrollEnabled={false}
/> */}
</StyledView>
      </StyledScrollView>
    </>
  );
}

