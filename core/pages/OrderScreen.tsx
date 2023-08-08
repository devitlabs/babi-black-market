import { styled } from 'nativewind';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';

import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import React from 'react';
import { Button } from '../components/base/Button';
import { LOAD_ORDERS } from '../graphql/Products.gql';
import { useFavoriteStore } from '../store/FavoriteStore';
import { useAuthStore } from '../store/AuthStore';





const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)

export default function OrderScreen() {

  const user = useAuthStore((state) => state.user);

  const favoriteStore = useFavoriteStore((state) => state.favorites)
  const { data, loading } = useQuery(LOAD_ORDERS, {
    variables: {
      id: user?.customer?.id
    }
  });



  return (

    <>
      <StyledScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
        className="pt-4"
      >



        <StyledView className='mt-2' style={{ height: Dimensions.get("screen").height, }}>
          <FlashList
            data={data?.orders?.nodes || []}
            renderItem={({ item, index }) => <ShipppingAddr index={index} id={item?.id} title={item?.total} address={item.orderNumber} />}
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


      </StyledScrollView>
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
            navigation.navigate("home")

          }}
          text='Ajouter une adresse de livraison' size='max' />
      </StyledView>
    </StyledView>
  )
}



const ShipppingAddr = ({ title, address, onSelect, index, id }: any) => {

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
            <StyledText className='font-bold max-w-[250px]'>
              Commande Numéro {address}
            </StyledText>
            <StyledText className='text-gray-400'>
              Total: {title}
            </StyledText>
          </StyledView>
        </StyledView>

      </StyledView>

    </StyledPressable>
  )
}


