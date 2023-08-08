import { AntDesign, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { Alert, Dimensions, Image, Pressable, ScrollView, Text as RNText, View } from 'react-native';

import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from 'react';
import { Button } from '../components/base/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../store/CartStore';
import { useShippingAddrStore } from '../store/ShippingAddrStore';
import { GetValueForKey, SaveKeyPair } from '../utils/ExpoStore';
import Toast from 'react-native-toast-message';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN_USER_MUTATION } from '../graphql/Auth.gql';
import { CKECKOUT_MUTATION, PAYEMENT_GATEWAYS } from '../graphql/Products.gql';
import * as Linking from 'expo-linking';
import _ from 'lodash';
import { CLEAR_CART_MUTATION, GET_CART } from '../graphql/Card.gql';
import { getFormattedCart } from '../utils/CartFunction';



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
    title: "Jongon ",
    price: "$129.99",
    link: require("../../assets/demo/2.png"),
  },
  {
    title: "Jongon111 ",
    price: "$129.99",
    link: require("../../assets/demo/2.png"),
  },
];









const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const Text = styled(RNText)
const StyledPressable = styled(Pressable)

// const defaultCustomerInfo = {
//   "firstName": 'Imran',
//   "lastName": 'Sayed',
//   "address1": '123 Abc farm',
//   "address2": 'Hill Road',
//   "city": 'Mumbai',
//   "country": 'CI',
//   "state": 'Maharastra',
//   "postcode": '221029',
//   "email": 'codeytek.academy@gmail.com',
//   "phone": '9883778278',
//   "company": 'The Company'
// }


const defaultCustomerInfo = {
  "firstName": '',
  "lastName": 'Sayed',
  "address1": '',
  "address2": '',
  "city": '',
  "country": 'CI',
  "state": '',
  "postcode": '',
  "email": '',
  "phone": '',
  "company": ''
}


const initialState = {
  billing: {
    ...defaultCustomerInfo,
  },
  shipping: {
    ...defaultCustomerInfo
  },
  // "createAccount": false,
  "customerNote": '',
  // "billingDifferentThanShipping": false,
  "paymentMethod": 'cinetpaystd',
};


export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [isPaying, setIsPaying] = useState(false);
  const [shippingItems, setShippingItems] = useState(initialState)
  const [PayementItems, setPayementItems] = useState([])

  const setCard = useCartStore((state) => state.setCard);



  const { data: cartData, refetch: refechCart } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: async () => {
      const updatedCart = getFormattedCart(cartData);
      if (updatedCart) {
        await SaveKeyPair('woo-next-cart', JSON.stringify([]));
      }
      setCard([]);


    }
  });




  const [clearCart, { data: clearCartRes, loading: clearCartProcessing, error: clearCartError }] = useMutation(CLEAR_CART_MUTATION, {
    onCompleted: () => {
      refechCart();
    },
    onError: (error) => {
      if (error) {
        // const errorMessage = ! isEmpty(error?.graphQLErrors?.[ 0 ]) ? error.graphQLErrors[ 0 ]?.message : '';
        // setRequestError( errorMessage );
      }
    }
  });



  const [mutateFunction, { data, loading, error }] = useMutation(CKECKOUT_MUTATION, {
    onCompleted: async (data) => {
      if (payementMethod === 'cinetpaystd') {



        Redirect(data?.checkout?.redirect || null)
      } else {
        await clearCart();

      }
      await clearCart();


      navigation.navigate('thank-you', {
        orderId: data?.checkout?.orderNumber
      })



    }
  });

  const { data: gateways, loading: gatewaysLoading } = useQuery(PAYEMENT_GATEWAYS, {
    onCompleted: (data) => {
      setPayementItems(
        gateways?.paymentGateways?.edges || []
      )
    }
  });




  const Redirect = async (url: string) => {
    if (url) {
      // let URL = "https://babiblackmarket.com/paiement/order-pay/27847/?key=wc_order_ykDHgBXvNvcVE";
      const response = await fetch(url);   // fetch page
      const htmlString = await response.text();
      const urlRegex = /https:\/\/checkout\.cinetpay\.com\/payment\/[a-zA-Z0-9]+/g;
      const matches = htmlString.match(urlRegex);
      if (matches && matches[0]) {
        Linking.openURL(matches[0]);
      }
    }

  }


  const LoadUserCredential = async () => {
    const username = await GetValueForKey("user-username")
    const password = await GetValueForKey("user-password")
    if (username && password) {
      setEmail(username)
      setPassword(password)
    }
  }


  const cart = useCartStore((state) => state.cart);




  const shippings = useShippingAddrStore(state => state.shippings)

  const defaultShipping = useShippingAddrStore(state => state.defaultShipping)
  const payementMethod = useCartStore(state => state.payementMethod)


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

  const selectShipping = (id: string) => {
    useShippingAddrStore.setState({ defaultShipping: id })
  }

  useEffect(() => {
    LoadShippings()
  }, [])


  useEffect(() => {
    const seletectShipping = shippings.find(item => item?.id === defaultShipping)
    let shipping = {
      "firstName": _.get(seletectShipping, 'firstname', ''),
      "lastName": _.get(seletectShipping, 'lastname', ''),
      "address1": _.get(seletectShipping, 'city', ''),
      "address2": _.get(seletectShipping, 'city', ''),
      "city": _.get(seletectShipping, 'city', ''),
      "country": 'CI',
      "state": _.get(seletectShipping, 'state', ''),
      "postcode": _.get(seletectShipping, 'postcode', ''),
      "email": _.get(seletectShipping, 'email', ''),
      "phone": _.get(seletectShipping, 'phone', ''),
      "company": ''
    }



    let checkoutInput = {
      billing: {
        ...shipping,
      },
      shipping: {
        ...shipping
      },
      "customerNote": '',
      "paymentMethod": payementMethod,
      account: {
        "username": email,
        "password": password
      }
    };


    setShippingItems(checkoutInput)

  }, [defaultShipping, PayementItems, payementMethod])


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

          <StyledPressable
            onPress={() => navigation.goBack()}
          >
            <AntDesign name='arrowleft' color={"black"} size={25} />
          </StyledPressable>


          <Text className='text-2xl font-bold mt-2'>Commander</Text>
        </StyledView>


        <StyledView className={`${DATA.length !== 0 ? "px-4" : "px-0"}`}>

          <StyledView className="overflow-hidden">

            <Text className='text-lg font-bold mt-4'>Adresse de livraison</Text>
            <StyledView className='mt-2' style={{ height: 100, }}>
              <FlashList
                data={shippings}
                renderItem={({ item, index }) => <ShipppingAddr index={index} onSelect={selectShipping} id={item?.id} title={item.firstname + " " + item?.lastname} address={item.city} />}
                estimatedItemSize={300}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={
                  () => (
                    <StyledView className='w-4' />
                  )
                }

              />
            </StyledView>



          </StyledView>

        </StyledView>

        <StyledView className={`${DATA.length !== 0 ? "px-4" : "px-0"}`}>

          <StyledView className="overflow-hidden">

            <Text className='text-lg font-bold mt-4'>Méthodes de payement</Text>
            <StyledView className='mt-2 ' style={{ height: Dimensions.get("screen").height / 3, }}>
              <FlashList
                data={PayementItems || []}
                renderItem={({ item, index }) => <PayementMethods id={item.node.id} icon={item.node.icon} index={index} title={item.node.title} info={item.node.title} />}
                estimatedItemSize={300}

                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={
                  () => (
                    <StyledView className='h-5' />
                  )
                }

              />
            </StyledView>



          </StyledView>

        </StyledView>


      </StyledScrollView>
      <StyledView
        style={{
          width: Dimensions.get("screen").width,
          bottom: 0,
        }}
        className='absolute bottom-0   flex items-center justify-center'>

        <StyledView className='w-full px-4 mb-4 border-t border-gray-100 pt-2 bg-white'>

          <StyledView className="flex-row items-center justify-between bg-white mt-2">
            <Text className='text-sm text-gray-400'>Frais de livraison</Text>
            <Text className='text-sm text-gray-400'>0.0 FCFA</Text>
          </StyledView>
          <StyledView className="flex-row items-center justify-between bg-white mt-2">
            <Text className='text-sm text-gray-400'>Nbre Total de produits</Text>
            <Text className='text-sm text-gray-400'>{
              cart?.totalProductsCount
            }</Text>
          </StyledView>
          <StyledView className="flex-row items-center justify-between bg-white mt-2">
            <Text className='text-sm text-black font-bold'>Total</Text>
            <Text className='text-sm text-black font-bold'>{
              cart?.totalProductsPrice
            }</Text>
          </StyledView>

        </StyledView>

        <Button

          // disabled={cart?.totalProductsCount === 0 || shippings.length === 0}
          onPress={async () => {

            if (shippings.length === 0) {
              Alert.alert("Veuillez ajouter une adresse de livraison")
              return
            }
            if (cart?.totalProductsCount === 0) {
              Alert.alert("Votre panier est vide")
            }

            await mutateFunction({
              variables: {
                input: shippingItems
              }
            })


            // setIsPaying(true)

            // setTimeout(() => {
            //   setIsPaying(false)
            //   navigation.navigate("thank-you")
            // }, 2000);


          }}
          ContainerclassName={"py-8"}
          isLoading={isPaying || loading}
          disabled={loading}
          TextclassName={"text-lg"} text={
            isPaying ? "Payement..." : "Valider mon panier"
          } />

      </StyledView>
    </>
  );
}




const ListEmptyComponent = () => {
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
        <StyledText className="text-gray-300 text-md">No products found</StyledText>
        <StyledText className="text-black font-bold my-2 mb-10 text-md">
          Fortunately there are an easy solution
        </StyledText>
        <Button text='Go Shopping' size='max' />
      </StyledView>
    </StyledView>
  )
}





const ShipppingAddr = ({ title, address, onSelect, id }: any) => {
  const defaultShipping = useShippingAddrStore(state => state.defaultShipping)

  return (
    <StyledPressable
      onPress={() => onSelect(id)}
      style={{
        width: Dimensions.get("screen").width - 150,
      }}
      className="flex-row items-center justify-cente p-2 bg-gray-100 rounded-md h-20">

      <StyledView className='flex items-center flex-row justify-between w-full'>
        <StyledView className='flex items-center flex-row '>
          <StyledView className='bg-white p-1 rounded-lg py-[6px]'>
            <AntDesign name='home' color={"#3078FE"} size={30} />
          </StyledView>
          <StyledView className='ml-2'>
            <StyledText className='font-bold max-w-[180px]'>
              {address}
            </StyledText>
            <StyledText className='text-gray-400'>
              {title}
            </StyledText>
          </StyledView>
        </StyledView>
        <StyledView className=''>
          {defaultShipping === id && <AntDesign name='checkcircle' color={"#3078FE"} size={20} />}
        </StyledView>
      </StyledView>

    </StyledPressable>
  )
}
const PayementMethods = ({ title, info, icon, id }: any) => {

  const selected = useCartStore(state => state.payementMethod)
  const setPayementMethod = useCartStore(state => state.setPayementMethod)


  return (
    <StyledPressable
      onPress={() => setPayementMethod(id)}

      className={`
      flex-row items-center justify-cente p-2
    
      `}>

      <StyledView className='flex items-center flex-row justify-between w-full'>
        <StyledView className='flex items-center flex-row '>
          <StyledView className='bg-white p-1 rounded-lg py-[6px]'>
            {icon !== null && <StyledImage
              source={{ uri: icon }}
              className="w-10 h-8"
            />}

            {icon === null && <MaterialIcons name="delivery-dining" size={35} color="black" />
            }
          </StyledView>
          <StyledView className='ml-2'>
            <StyledText className='font-bold '>
              {info}
            </StyledText>
            <StyledText className='text-gray-400'>
              {title.slice(9, 200)}
            </StyledText>
          </StyledView>
        </StyledView>
        <StyledView className=''>
          {selected === id && <AntDesign name='checkcircle' color={"#3078FE"} size={20} />}
        </StyledView>
      </StyledView>

    </StyledPressable>
  )
}