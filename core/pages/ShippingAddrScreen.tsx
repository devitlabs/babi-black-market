import { AntDesign, Fontisto } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { Dimensions, Image, Pressable, ScrollView, Text as RNText, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/base/Button';
import { useCartStore } from '../store/CartStore';
import { useShippingAddrStore } from '../store/ShippingAddrStore';
import { GetValueForKey } from '../utils/ExpoStore';






const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const Text = styled(RNText)
const StyledPressable = styled(Pressable)



export default function ShippingAddrScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const defaultShipping = useShippingAddrStore(state => state.defaultShipping)

  const cart = useCartStore((state) => state.cart);
  const shippings = useShippingAddrStore(state => state.shippings)



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
    useShippingAddrStore.setState({ defaultShipping: id})
  }

  useEffect(() => {
    LoadShippings()
  }, [])




  return (
    <>
      <StyledView
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


          <Text className='text-2xl font-bold mt-2'>Adresse de livraison</Text>
        </StyledView>


        <StyledView className={`${shippings.length !== 0 ? "px-4" : "px-0"}`}>

          <StyledView className="overflow-hidden">


            <StyledView className='mt-2' style={{ height: Dimensions.get("screen").height, }}>
              <FlashList
                data={shippings}
                renderItem={({ item, index }) => <ShipppingAddr index={index} onSelect={selectShipping} id={item?.id} title={item.firstname + " " + item?.lastname} address={item.city} />}
                estimatedItemSize={300}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={ListEmptyComponent}
                ItemSeparatorComponent={
                  () => (
                    <StyledView className='h-4' />
                  )
                }

              />
            </StyledView>



          </StyledView>

        </StyledView>

        <StyledView
          style={{
            width: Dimensions.get("screen").width,
            bottom: 0,
          }}
          className='absolute bottom-0   flex items-center justify-center'>


          <Button
            onPress={() => navigation.navigate("add-shipping")}
            ContainerclassName={"py-8"}
            TextclassName={"text-lg"} text={"Nouvelle Adresse"} />

        </StyledView>
      </StyledView>

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
        <StyledText className="text-gray-300 text-md">Aucunes addresse de livraions</StyledText>
        <StyledText className="text-black font-bold my-2 mb-4 text-md">
        </StyledText>
        <Button
          onPress={() => {
            navigation.navigate("add-shipping")

          }}
          text='Ajouter une adresse de livraison' size='max' />
      </StyledView>
    </StyledView>
  )
}



const ShipppingAddr = ({ title, address, onSelect, index,id }: any) => {
  const defaultShipping = useShippingAddrStore(state => state.defaultShipping)

  return (
    <StyledPressable
      onPress={() => onSelect(id)}
      style={{
        width: Dimensions.get("screen").width - 30,
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
          {defaultShipping===id && <AntDesign name='checkcircle' color={"#3078FE"} size={20} />}
        </StyledView>
      </StyledView>

    </StyledPressable>
  )
}


