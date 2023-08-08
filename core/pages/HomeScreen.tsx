import { styled } from 'nativewind';
import { Dimensions, ScrollView, View } from 'react-native';

import CategoryTitle from '@/core/components/base/CategoryTitle';
import HeaderProduct from '@/core/components/base/HeaderProduct';
import { ProductItem } from '@/core/components/design-system/ProductItem';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavigationHeader from '../components/base/NavigationHeader';
import { SaveKeyPair } from '../utils/ExpoStore';
import { USER_QUERY } from '../graphql/Test.gql';
import { useQuery } from '@apollo/client';
import Shimmer from '../components/base/Shimmer';
import { LOAD_NEW_PRODUCT, PRODUCT_BY_CATEGORY } from '../graphql/Products.gql';
import { range } from 'lodash';


export const DATA = [
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



const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const [showNavigation, setShowNavigation] = React.useState(false);

  const navigation = useNavigation();

  const route = useRoute();


  const { data, loading } = useQuery(LOAD_NEW_PRODUCT);


  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })

    // SaveKeyPair("test", "test")

  }, [])


  return (
    <StyledView
      style={{
        flex: 1,

      }}
      className='bg-gray-200 '
    >
      <NavigationHeader isWhite={showNavigation} />

      <StyledScrollView style={{
        flex: 1,
      }}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y > 250) {
            // navigation.setOptions({
            //   headerShown: true
            // })
            setShowNavigation(true)
          } else {
            setShowNavigation(false)

            // navigation.setOptions({
            //   headerShown: false
            // })
          }
        }}
        className='bg-white'
      >

        <HeaderProduct />

        <StyledView
          style={{
            flex: 1,

          }}
          className='mt-4'
        >

          <StyledView className='px-4  bg-gray-50/20 py-1 border-b border-gray-100 pb-2'>
            <StyledView className='mb-2'>
              <CategoryTitle title='Nouvelle arrivage' secondText='Voir tout' onPress={() => {
                navigation.navigate('category')
              }} />
            </StyledView>

          </StyledView>


          <StyledView

            className='flex items-start flex-row justify-center px-4 flex-wrap gap-2 pb-40' style={{ height: Dimensions.get("screen").height * DATA.length / 5 }}>

            {!loading &&
              data?.products?.nodes?.map((item, index) => (
                <StyledView
                  key={item.id}
                  style={{
                    width: Dimensions.get("screen").width / 2 - 20,
                  }}
                >
                  <ProductItem title={item.name} productId={item?.productId} id={item.id} description={item.price} image={item?.image?.sourceUrl} />

                </StyledView>
              ))
            }

            {loading &&
              range(0, 30).map((item, index) => (
                <StyledView
                  key={item}
                  style={{
                    width: Dimensions.get("screen").width / 2 - 20,
                  }}
                >
                  <ShimmerProductItem />
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

        </StyledView>
      </StyledScrollView>
    </StyledView>
  );
}



const ShimmerProductItem = () => {
  return (
    <StyledView className=''>
      <Shimmer width={Dimensions.get("screen").width / 2 - 20} height={200} />
      <StyledView className='mt-2'>
        <Shimmer width={Dimensions.get("screen").width / 2 - 20} height={10} />
        <StyledView className='mt-2'>
          <Shimmer width={Dimensions.get("screen").width / 2 - 20} height={5} />
        </StyledView>
      </StyledView>
    </StyledView>
  )
}