import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { Alert, Dimensions, Image, ImageBackground, Pressable, ScrollView, Text as RNText, View } from 'react-native';

import { useMutation, useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import _ from "lodash";
import React, { useEffect, useRef, useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import StarRating from 'react-native-star-rating-widget';
import { Button } from '../components/base/Button';
import CategoryTitle from '../components/base/CategoryTitle';
import ImgCarousel from '../components/base/ImgCarousel';
import ProductReview from '../components/base/ProductReview';
import Shimmer from '../components/base/Shimmer';
import ColorPicker from '../components/design-system/Filters/ColorPicker';
import { ProductItem } from '../components/design-system/ProductItem';
import { ProductSimpleImage } from '../components/design-system/ProductSimpleImage';
import { ADD_TO_CART, GET_CART } from '../graphql/Card.gql';
import { LOAD_PRODUCT_DESCRIPTION_QUERY } from '../graphql/Products.gql';
import { useCartStore } from '../store/CartStore';
import { useFavoriteStore } from '../store/FavoriteStore';
import { getFormattedCart } from '../utils/CartFunction';
import { SaveKeyPair } from '../utils/ExpoStore';
import { DATA } from './HomeScreen';
import { useProductDescriptionStore } from '../store/ProductDescriptionStore';




const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const StyledImageBackground = styled(ImageBackground)
const StyledPressable = styled(Pressable)
const Text = styled(RNText)



export default function ProductDescriptionScreen() {
  const [isSelected, setIsSelected] = useState("#F99404");
  const [items, setItems] = useState([
    { label: 'Red', value: '#E6E5EB' },

    { label: 'Blue', value: '#F99404' },
    {
      label: 'Orange', value: '#307AFF',
    },
    {
      label: 'Yellow', value: '#DDB792',
    },
    {
      label: 'Purple', value: '#5855D6',
    }
  ]);




  const navigation = useNavigation();
  const route = useRoute();
  const favoriteStore = useFavoriteStore((state) => state.favorites)
  const setFavorite = useFavoriteStore((state) => state.setFavorite)
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite)

  const cartId = useCartStore((state) => state.uniqId)
  const setCard = useCartStore((state) => state.setCard)

  const productQryInput = {
    clientMutationId: cartId,
    productId: route.params?.productId,
  };


  const { data: cartData, refetch: refechCart } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: async () => {

      //console.log(cartData, 'cartData')

      const updatedCart = getFormattedCart(cartData);
      if (updatedCart) {
        await SaveKeyPair('woo-next-cart', JSON.stringify(updatedCart));

      }
      // // Update cart data in React Context.
      setCard(updatedCart);
    }
  });


  const { data, loading, refetch, error } = useQuery(LOAD_PRODUCT_DESCRIPTION_QUERY, {
    variables: {
      id: route.params?.id
    }
  });

  const currentId = useProductDescriptionStore((state) => state.currentId)



  useEffect(() => {
    refetch({
      id: currentId || route.params?.id
    })
  }, [currentId]);


  // Add to Cart Mutation.
  const [addToCart, {
    data: addToCartRes,
    loading: addToCartLoading,
    error: addToCartError
  }] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: () => {
      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refechCart()
      // 2. Show a success message.
      Alert.alert('Success', 'Le produit a été ajouté au panier avec succès');


    },
    onError: (error) => {
      if (error) {
        //setRequestError(error?.graphQLErrors?.[0]?.message ?? '');
      }
    }
  });




  const regex = /(<([^>]+)>)/ig;

  const scrollRef = useRef();

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }


  const SaveFavorite = async () => {
    try {
      await SaveKeyPair('favorites', JSON.stringify(favoriteStore))
    } catch (error) {
    }
  }

  useEffect(() => {
    SaveFavorite()
  }, [favoriteStore])


  const ExistInFavorites = (id) => {
    return favoriteStore.find((item) => item?.product?.id === id)
  }




  return (
    <MenuProvider>
      <StyledScrollView
        ref={scrollRef}
        style={{
          flex: 1,

        }}
        className="bg-white relative"
      >


        {/* <StyledImageBackground
          source={{
            uri: data?.product?.image?.sourceUrl
          }}
          imageStyle={{ resizeMode: 'contain' }}
          className='h-64  bg-gray-100 relative'>

          <StyledPressable
            onPress={() => {
              navigation.goBack()
            }}
            className='fixed top-4 left-4'>
            <AntDesign name='arrowleft' color={"black"} size={25} />
          </StyledPressable>


        </StyledImageBackground> */}

        <ImgCarousel images={_.concat(data?.product?.galleryImages?.nodes || [], data?.product?.image)} />

        <StyledPressable
          onPress={() => {
            navigation.goBack()
          }}
          className='absolute top-4 left-4 '>
          <AntDesign name='arrowleft' color={"black"} size={25} />
        </StyledPressable>

        <StyledView className='px-4 mt-1 border-b border-gray-100 pb-2'>

          <StyledView className='flex flex-row items-center justify-between'>


            {loading && <Shimmer width={Dimensions.get("screen").width / 2 - 20} height={15} />}

            {!loading && <Text
              style={{
                width: 300,
                fontFamily: 'Avenir-Black'
              }}
              className='text-2xl'>
              {
                data?.product?.name
              }
            </Text>}

            {!loading && <StyledPressable
              onPress={() => {
                ExistInFavorites(currentId || route.params?.id) ? removeFavorite(currentId || route.params?.id) : setFavorite({
                  ..._.omit(data, ["product.averageRating", "product.reviewCount", "product.galleryImages", "product.reviews", "product.status", "product.stockQuantity", "product.description", "product.onSale", "product.price", "product.regularPrice", "product.salePrice", "product.related", "product.shortDescription"])
                })
              }}
              className='h-10 w-10 flex items-center justify-center'>
              <AntDesign name={
                ExistInFavorites(currentId || route.params?.id) ? 'heart' : 'hearto'
              } size={
                ExistInFavorites(currentId || route.params?.id) ? 30 : 20
              } color={
                ExistInFavorites(currentId || route.params?.id) ? 'red' : 'black'
              } />
            </StyledPressable>}


          </StyledView>

          <StyledView className='flex flex-row justify-between items-center'>

            {loading && <Shimmer width={Dimensions.get("screen").width / 3 - 20} height={10} />}


            {!loading && <Text
              style={{
                fontFamily: 'Avenir-Book'
              }}
              className='text-red-400 text-lg mt-1'>{
                data?.product?.price
              }</Text>
            }
            <StarRating
              rating={data?.product?.averageRating}
              onChange={() => { }}
              starSize={15}
              starStyle={{ marginHorizontal: 2 }}
              color="#F29217"
              emptyColor='#f1f2f6'


            />

          </StyledView>


        </StyledView>



        <StyledView className='px-4  border-b border-gray-100 pb-4'>
          <StyledView className='mt-4'>
            <Text
              style={{
                width: 250,
                fontFamily: 'Avenir-Black'

              }}
              className='text-[16px] font-bold'>
              Couleurs
            </Text>
            <ColorPicker hideText />
          </StyledView>

        </StyledView>


        <StyledView className='px-4 py-4 border-b border-gray-100 pb-4'>
          <StyledView className='mb-2'>
            <CategoryTitle title='Vous aimerez peut-être aussi' secondText='Show all' onPress={() => {
              navigation.navigate('review')
            }} />
          </StyledView>


          <StyledView className='mt-4' style={{ width: Dimensions.get("screen").width, }}>

            {!loading && <FlashList
              data={
                data?.product?.related?.nodes || []
              }
              renderItem={({ item }) => <ProductSimpleImage productId={item?.productId} id={item.id} title={item.name} description={item.price} image={item?.image?.sourceUrl} />}
              estimatedItemSize={300}
              horizontal={true}

              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={
                () => (
                  <StyledView className='w-2' />
                )
              }

            />}

            {loading && <FlashList
              data={[1, 2, 4]}
              renderItem={({ item }) => <ShimmerSimilar />}
              estimatedItemSize={300}
              horizontal={true}

              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={
                () => (
                  <StyledView className='w-2' />
                )
              }

            />}
          </StyledView>

        </StyledView>

        <StyledView className='px-4  border-b border-gray-100 pb-4'>
          <StyledView className='mt-4' style={{ width: Dimensions.get("screen").width }}>
            <Text
              style={{
                width: 250,
                fontFamily: 'Avenir-Black'

              }}
              className='text-[16px] mb-2 font-bold'>
              Descriptions
            </Text>

            {loading && <Shimmer width={Dimensions.get("screen").width / 1.5 - 20} height={10} />}
            <StyledView className='mt-2'>
              {loading && <Shimmer width={Dimensions.get("screen").width / 1.2 - 20} height={10} />}
            </StyledView>
            <StyledView className='mt-2'>
              {loading && <Shimmer width={Dimensions.get("screen").width / 1.2} height={10} />}
            </StyledView>
            <StyledView className='mt-2'>
              {loading && <Shimmer width={Dimensions.get("screen").width - 40} height={10} />}
            </StyledView>


            {!loading && <Text style={{
              width: Dimensions.get("screen").width - 40,
              fontFamily: 'Avenir-Roman'
            }} className='break-words leading-5'>

              {
                _.padStart(_.padEnd(data?.product?.shortDescription.replace(regex, '')))
              }
            </Text>}



          </StyledView>
          {!loading && <StyledView className=' w-full mt-4'>

            <StyledView className="flex-row items-center justify-between bg-white mt-1">
              <Text className='text-sm text-gray-400' style={{
                fontFamily: 'Avenir-Roman'
              }}>Sku:</Text>
              <Text
                style={{
                  fontFamily: 'Avenir-Roman'
                }}
                className='text-sm text-black font-semibold'>563</Text>
            </StyledView>
            <StyledView className="flex-row items-center justify-between bg-white mt-1">
              <Text className='text-sm text-gray-400' style={{
                fontFamily: 'Avenir-Roman'
              }}>Categories:</Text>
              <Text
                style={{
                  fontFamily: 'Avenir-Roman'
                }}
                className='text-sm text-black font-medium'>Accessoires</Text>
            </StyledView>
            <StyledView className="flex-row items-center justify-between bg-white mt-1">
              <Text className='text-sm text-gray-400' style={{
                fontFamily: 'Avenir-Roman'
              }}>Tags:</Text>
              <Text
                style={{
                  fontFamily: 'Avenir-Roman'
                }}
                className='text-sm text-black  font-medium'>#cool, #app</Text>
            </StyledView>
            <StyledView className="flex-row items-center justify-between bg-white mt-1">
              <Text
                style={{
                  fontFamily: 'Avenir-Roman'
                }}
                className='text-sm  text-gray-400'>Dimensions:</Text>
              <Text
                style={{
                  fontFamily: 'Avenir-Roman'
                }}
                className='text-sm text-black font-medium'>185 x 40 x 62 cm (L x W x H)</Text>
            </StyledView>

          </StyledView>}



        </StyledView>

        <StyledView className='px-4  bg-gray-50/20 py-4 border-b border-gray-100 pb-4'>
          <StyledView className='mb-2'>
            <CategoryTitle title='Avis' secondText={data?.product?.reviewCount + " Avis"} onPress={() => {
              navigation.navigate('review', {
                id: currentId || route.params?.id
              })
            }} />
          </StyledView>
          {!loading && <ProductReview count={data?.product?.reviewCount} avgRating={
            data?.product?.averageRating
          }

          />}

          {loading && <ShimmerReview />}
        </StyledView>



        <StyledView className='  border-b border-gray-100 pb-4'>
          <StyledView className='mt-4 px-4' style={{ width: Dimensions.get("screen").width }}>
            <Text
              style={{
                width: 250,
                fontFamily: 'Avenir-Black'

              }}
              className='text-[16px] mb-2 font-bold'>
              Articles similaires
            </Text>


            <StyledView

              className='flex items-start flex-row justify-start flex-wrap gap-2 pb-40' style={{ height: Dimensions.get("screen").height * DATA.length / 30 }}>

              {!loading &&
                (
                  data?.product?.related?.nodes || []

                ).slice(1, 3).map((item, index) => (
                  <StyledView
                    style={{
                      width: Dimensions.get("screen").width / 2 - 20,
                    }}
                  >
                    <ProductItem id={
                      item?.id
                    }
                      key={index}
                      handler={onPressTouch}
                      productId={item?.productId} id={item.id} title={item.name} description={item.price} image={item?.image?.sourceUrl}
                    />
                  </StyledView>
                ))
              }

              {loading &&
                <StyledView className='mt-4 flex flex-row'>
                  <ShimmerProductItem />

                  <StyledView className='ml-2'>
                    <ShimmerProductItem />
                  </StyledView>
                </StyledView>
              }
            </StyledView>



          </StyledView>

        </StyledView>

         <StyledView className='px-4 mb-4'>
          <Button
            isLoading={addToCartLoading || loading}
            disabled={addToCartLoading || loading}
            onPress={addToCart}
            text='Ajouter Au panier' />
        </StyledView>


      </StyledScrollView>

    </MenuProvider>
  );
}




const ShimmerReview = () => {
  return (
    <StyledView className='flex flex-row '>
      <Shimmer width={90} height={90} />
      <StyledView className='ml-4'>
        <Shimmer width={Dimensions.get("screen").width / 2 - 20} height={10} />
        <StyledView className='mt-2'>
          <Shimmer width={Dimensions.get("screen").width / 2 - 90} height={10} />
        </StyledView>
        <StyledView className='mt-2'>
          <Shimmer width={Dimensions.get("screen").width / 2 - 150} height={10} />
        </StyledView>
      </StyledView>
    </StyledView>
  )
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


const ShimmerSimilar = () => {
  return (
    <StyledView className=''>
      <Shimmer width={80} height={80} />
    </StyledView>
  )
}