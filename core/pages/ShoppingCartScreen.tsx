import { AntDesign, Ionicons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { ActivityIndicator, Alert, Dimensions, Pressable, ScrollView, Text as RNText, View } from 'react-native';
import Image from 'react-native-image-progress';

import { FlashList } from "@shopify/flash-list";
import { Button } from '../components/base/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../store/CartStore';
import Lottie from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { isValidHttpUrl } from '../utils/isValidHttpUrl';
import { useMutation, useQuery } from '@apollo/client';
import { CLEAR_CART_MUTATION, GET_CART, UPDATE_CART } from '../graphql/Card.gql';
import { getFormattedCart, getUpdatedItems } from '../utils/CartFunction';
import { GetValueForKey, SaveKeyPair } from '../utils/ExpoStore';
import { useShippingAddrStore } from '../store/ShippingAddrStore';

const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const Text = styled(RNText)
const StyledPressable = styled(Pressable)



export default function ShoppingCartScreen() {

  const [deleteMode, setDeleteMode] = useState(false);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const cart = useCartStore((state) => state.cart);
  const setCard = useCartStore((state) => state.setCard);
  const setCardProcessing = useCartStore((state) => state.setCardProcessing);

  const shippings = useShippingAddrStore(state => state.shippings)

  const defaultShipping = useShippingAddrStore(state => state.defaultShipping)

  
  const selectShipping = (id: string) => {
    useShippingAddrStore.setState({ defaultShipping: id })
  }

  const LoadShippings = async () => {
    const data = await GetValueForKey("shipping")
    if (data) {
      try {
        const jsonValue = JSON.parse(data)
        useShippingAddrStore.setState({ shippings: jsonValue })

        if (defaultShipping.length === 0) {
          selectShipping(jsonValue[0].id)
        }
      } catch (e) {
        // error reading value
      }
    }
  }

  
  const CartLength = () => {
    return cart ? cart?.totalProductsCount : 0
  }


  const animationRef = useRef<Lottie>(null)

  useEffect(() => {
    LoadShippings()
    animationRef.current?.play()
    animationRef.current?.play(0, 120);
  }, [])



  const DeleteItem = (index: number) => {

  }


  const { data: cartData, refetch: refechCart } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: async () => {
      const updatedCart = getFormattedCart(cartData);
      if (updatedCart) {
        await SaveKeyPair('woo-next-cart', JSON.stringify(updatedCart));
      }
      setCard(updatedCart);
      setCardProcessing(false);

    }
  });



  const [updateCart, { data: updateCartResponse, loading: updateCartProcessing, error: updateCartError }] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      setCardProcessing(true);
      refechCart();
    },
    onError: (error) => {
      if (error) {
        // const errorMessage = error?.graphQLErrors?.[0]?.message ? error.graphQLErrors[0].message : '';
        // setRequestError(errorMessage);
      }
    }
  });


  const [clearCart, { data: clearCartRes, loading: clearCartProcessing, error: clearCartError }] = useMutation(CLEAR_CART_MUTATION, {
    onCompleted: () => {
      setCardProcessing(true);

      refechCart();
    },
    onError: (error) => {
      if (error) {
        // const errorMessage = ! isEmpty(error?.graphQLErrors?.[ 0 ]) ? error.graphQLErrors[ 0 ]?.message : '';
        // setRequestError( errorMessage );
      }
    }
  });



  const handleRemoveProductClick = (cartKey, products, newQty) => {
    setCardProcessing(true);

    if (products.length) {

      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      // const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            items: updatedItems
          }
        },
      });
    }
  };

  // Clear the entire cart.
  const handleClearCart = () => {
    if (clearCartProcessing) {
      return;
    }

    clearCart({
      variables: {
        input: {
          clientMutationId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          all: true
        }
      },
    });
  }


  const EmptyComfirm = () => {
    Alert.alert(
      'Vider le panier',
      'Voulez-vous vraiment vider le panier ?',
      [
        {
          text: 'Annuler',

          style: 'destructive',
        },
        {
          text: 'Vider',
          onPress: () => handleClearCart(),
          style: 'destructive',
        },
      ],
    )
  }



  return (
    <>
      <StyledScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,

        }}
        className=""
      >
        <StyledView className=' border-b border-gray-100 py-4 px-4'>

          <StyledView className='flex items-center justify-between flex-row'>
            <StyledPressable
              onPress={() => navigation.goBack()}
            >
              <AntDesign name='close' color={"black"} size={25} />
            </StyledPressable>


            <StyledView className='flex flex-row  items-center'>
              {CartLength() !== 0 && <StyledPressable
                onPress={() => {
                  setDeleteMode(!deleteMode);
                }}
              >
                <Text className='text-blue-600 -mr-4'>
                  {deleteMode ? "Ok" : "Modifier"}
                </Text>
              </StyledPressable>}

              {CartLength() !== 0 && <StyledPressable
                onPress={() => {
                  EmptyComfirm()
                }}

              >
                <Text className='text-red-600 ml-10'>
                  {clearCartProcessing ? <ActivityIndicator color={"black"} size={"small"} /> : <Ionicons name='ios-trash-bin-outline' size={20} />}
                </Text>
              </StyledPressable>}
            </StyledView>
          </StyledView>


          <Text className='text-2xl font-bold mt-2'>Panier d'achat</Text>
          {CartLength() !== 0 && <StyledText className='mt-2'><StyledText className="font-bold">{CartLength()} Produits</StyledText></StyledText>}
        </StyledView>


        <StyledView className={`${CartLength() !== 0 ? "px-4" : "px-0"}`}>

          <StyledView className="overflow-hidden">

            <ScrollView style={{ height: Dimensions.get("screen").height / 1.6, width: Dimensions.get("screen").width, marginTop: 15, marginBottom: 20 }}>
              <FlashList
                data={CartLength() === 0 ? [] : cart?.products}
                renderItem={({ item, index }) => <CartItem UpdateCart={(key, qt) => {
                  handleRemoveProductClick(key, cart?.products, qt)
                }} cartKey={item?.cartKey} deleteMode={deleteMode} updateCartProcessing={updateCartProcessing} index={index} onDelete={DeleteItem} title={item.name} description={item.totalPrice} image={item.image?.sourceUrl} count={item?.qty} />}
                estimatedItemSize={300}
                numColumns={1}
                key={deleteMode ? "delete" : "normal"}
                ItemSeparatorComponent={() => <StyledView className="h-[1px] my-2 bg-gray-100" />}
                ListEmptyComponent={() => <ListEmptyComponent />}
              />
            </ScrollView>

            {/* <Button text="Valider mon panier" /> */}

          </StyledView>

        </StyledView>
      </StyledScrollView>
      {CartLength() !== 0 && <StyledPressable
        disabled={CartLength() === 0 || updateCartProcessing}
        onPress={() => navigation.navigate("checkout")}
        style={{
          backgroundColor: "black",
          width: Dimensions.get("screen").width,
          bottom: 0,

        }}
        className={
          `
          absolute bottom-0  h-20 flex items-center justify-center flex-row
          ${updateCartProcessing ? "opacity-50" : ""}
          `
        }>

        <ActivityIndicator size={"small"} color={"white"} animating={updateCartProcessing || clearCartProcessing} />

        <StyledText className='text-white text-lg text-center uppercase ml-2'>Commander</StyledText>

      </StyledPressable>}
    </>
  );
}




const ListEmptyComponent = () => {
  const navigation = useNavigation();
  return (
    <StyledView className="flex-1 items-center justify-center mt-20">
      <StyledView
        style={{
          borderRadius: 100,
          borderStyle: "dashed",
        }}
        className='h-40 w-40  !border-dashed border-gray-200  flex items-center justify-center'>
        <AntDesign

          name='shoppingcart' size={100} color={"#f1f2f6"} />
      </StyledView>
      <StyledView className='flex items-center  flex-col'>
        <StyledText className="text-gray-300 text-md">Aucun Produits Trouvé</StyledText>
        <StyledText className="text-black font-bold my-2 mb-10 text-md">
          Heureusement, il existe une solution facile
        </StyledText>
        <Button
          onPress={() => {
            navigation.navigate("home")
          }}
          text='Faire du shopping' size='max' />
      </StyledView>
    </StyledView>
  )
}



const CartItem = ({ deleteMode, title, description, image, count, onDelete, index, cartKey, UpdateCart }: any) => {
  const cartProcessing = useCartStore((state) => state.cartProcessing);
  return (
    <StyledView>
      <StyledView className="flex-row items-start relative">

        <StyledView className="bg-gray-200 h-20 w-20 rounded-md flex items-center justify-center relative">

          <StyledImage source={{
            uri: isValidHttpUrl(image) ? image : 'https://images.unsplash.com/photo-1616166330003-8b5f2b2b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',

          }}
            className='h-12 w-12'
            indicator={() => <ActivityIndicator color={"black"} size="small" />}

          />
          <StyledView className="absolute top-1 left-1  px-1 rounded-full bg-black">
            <StyledText className="text-white text-[10px]">{
              count
            }</StyledText>
          </StyledView>



        </StyledView>
        <StyledView className="flex-1 r ml-4">
          <StyledText className="font-bold">{title}</StyledText>
          <StyledText className="text-gray-400">{description}</StyledText>
        </StyledView>
        {/* {deleteMode && <StyledPressable onPress={() => onDelete(index)} className="f top-1 right-10  px-1  z-50">
          <Ionicons name="trash-bin-outline" size={14} color="red" />
        </StyledPressable>} */}

      </StyledView>
      {deleteMode && <StyledView className='flex items-center justify-end mr-10 flex-row '>
        <StyledPressable
          disabled={cartProcessing}
          onPress={() => {
            UpdateCart(cartKey, count + 1)
          }}
          className={`
          rounded-full bg-black h-8 flex items-center justify-center w-8 
          ${cartProcessing ? "opacity-50" : ""}
          `}
        >

          <StyledText className='text-2xl text-white'>+</StyledText>
        </StyledPressable>

        <StyledText className='mx-2 font-bold'>
          {
            cartProcessing ? <ActivityIndicator color={"black"} size={"small"} /> : count
          }
        </StyledText>
        <StyledPressable
          disabled={cartProcessing}
          onPress={() => {
            UpdateCart(cartKey, count - 1)
          }}
          className={`
          rounded-full bg-black h-8 flex items-center justify-center w-8 
          ${cartProcessing ? "opacity-50" : ""}
          `}
        >

          <StyledText className='text-2xl text-white'>-</StyledText>
        </StyledPressable>
      </StyledView>}
    </StyledView>
  )
}