import { Feather as Icon } from "@expo/vector-icons";
import { styled } from 'nativewind';
import { ActivityIndicator, Dimensions, Platform, Pressable, ScrollView, Text, View } from 'react-native';

import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LOAD_CATEGORY_MUTATION, NUMBER_OF_PRODUCT_BY_CATEGORY } from "../graphql/Products.gql";
import { useQuery } from "@apollo/client";
import { CategoryRange } from "../utils/CategoryRange";
import Shimmer from "../components/base/Shimmer";
import { range } from "lodash";
import Image from 'react-native-image-progress';
import { isValidHttpUrl } from "../utils/isValidHttpUrl";
import { useFilterStore } from "../store/FilterStore";


const DATA = [
  {
    title: "Decoration",
    nbr: "274 items",
    link: require("../../assets/demo/1.png"),
  },
  {
    title: "Ceiling",
    nbr: "274 items",
    link: require("../../assets/demo/2.png"),
  },
  {
    title: "Shoes",
    nbr: "274 items",
    link: require("../../assets/demo/1.png"),
  },
  {
    title: "Furniture",
    nbr: "274 items",
    link: require("../../assets/demo/2.png"),
  },
  {
    title: "Ceiling",
    nbr: "274 items",
    link: require("../../assets/demo/2.png"),
  },
  {
    title: "Lamps",
    nbr: "274 items",
    link: require("../../assets/demo/1.png"),
  },
  {
    title: "Wooden",
    nbr: "274 items",
    link: require("../../assets/demo/2.png"),
  },
];



const StyledView = styled(View)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const StyledPressable = styled(Pressable)

export default function CategoryScreen() {

  const [items, setItems] = React.useState([]);

  const insets = useSafeAreaInsets();
  const { data, loading } = useQuery(LOAD_CATEGORY_MUTATION);
  const setSubCategory = useFilterStore((state) => state.setSubCategory)

  
  useEffect(() => {
    if (data) {
      setItems(CategoryRange(data?.productCategories?.nodes))
    }
  }, [data])

  useEffect(() => {
    setSubCategory("")
  },[])
  return (
    <>
      <ScrollView style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? 80 : 80,

      }}

      >

        {/* <ItemsCarousel /> */}

        <StyledView className={
          `
          pb-20
          ${loading ? "px-4 mt-4" : "px-0 mt-0"}	
          `
        }>
          <StyledView style={{ height: Dimensions.get("screen").height * DATA.length / 6.7, width: Dimensions.get("screen").width }}>


            {!loading && <FlashList
              data={items}
              renderItem={({ item }) => <CategoryItem id={item?.id} title={item.name} item={item} description={item?.count || 0} image={item?.image} />}
              estimatedItemSize={50}
              scrollEventThrottle={100}
              numColumns={1}
              ItemSeparatorComponent={() => <StyledView className="h-[1px] bg-gray-100" />}
            />
            }
            {loading && <FlashList
              data={range(0, 30)}
              renderItem={({ item }) => <ShimmerProductItem />}
              estimatedItemSize={50}
              scrollEventThrottle={100}
              numColumns={1}
              ItemSeparatorComponent={() => <StyledView className="h-[1px] my-4 bg-gray-100" />}
            />}


          </StyledView>

        </StyledView>
      </ScrollView>
    </>
  );
}



const ShimmerProductItem = () => {
  return (
    <StyledView className='flex flex-row justify-between'>
      <StyledView className="flex items-center flex-row">
        <Shimmer width={75} height={75} />
        <StyledView className="ml-4">
          <Shimmer width={Dimensions.get("screen").width / 4} height={10} />
          <StyledView className='mt-2'>
            <Shimmer width={Dimensions.get("screen").width / 2 - 20} height={5} />
          </StyledView>
        </StyledView>
      </StyledView>
      <StyledView className='mt-2'>
      </StyledView>
    </StyledView>
  )
}



const CategoryItem = ({ title, description, image, id }: any) => {

  const navigation = useNavigation();


  const { data, loading } = useQuery(NUMBER_OF_PRODUCT_BY_CATEGORY, {
    variables: {
      category: title
    }
  });


  return (
    <StyledPressable
      onPress={() => {
        navigation.navigate(title === "Shoes" ? "product-swipe" : "productList", {
          category: title,
          id: id
        })
      }}
      className='flex-row  items-center justify-between px-4 pr-6 py-3  bg-white'>
      <StyledView className='flex items-center flex-row'>
        <StyledView className="bg-gray-100 h-20 w-20 rounded-md flex items-center justify-center relative">
          {/* <StyledImage source={{
            uri: image
          }}
            className='h-12 w-12'
          /> */}

          <StyledImage source={{
            uri: isValidHttpUrl(image) ? image : 'https://images.unsplash.com/photo-1616166330003-8b5f2b2b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',

          }}
            className='h-12 w-12'
            indicator={() => <ActivityIndicator color={"black"} size="small" />}

          />


        </StyledView>
        <StyledView className='ml-4'>
          <StyledText className='font-bold'>{title}</StyledText>
          {!loading && <StyledText className='text-gray-400 mt-2'>{data?.products?.edges?.length || 0}</StyledText>}
          {loading && <StyledView className='mt-2'>
            <Shimmer width={Dimensions.get("screen").width / 10} height={5} />
          </StyledView>}
        </StyledView>
      </StyledView>
      <Icon name='chevron-right' color={"black"} size={20} />
    </StyledPressable>
  )
}
