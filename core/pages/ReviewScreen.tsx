import { AntDesign } from '@expo/vector-icons';
import { styled } from 'nativewind';
import { ActivityIndicator, Dimensions, ScrollView, Text as RNText, View } from 'react-native';

import { FlashList } from "@shopify/flash-list";
import Lottie from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import StarRating from 'react-native-star-rating-widget';
import { Button } from '../components/base/Button';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { LOAD_PRODUCT_BY_REVIEW_ID, LOAD_PRODUCT_DESCRIPTION_QUERY } from '../graphql/Products.gql';
import _ from 'lodash';
import Image from 'react-native-image-progress';
import { isValidHttpUrl } from '../utils/isValidHttpUrl';







const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(RNText)
const StyledScrollView = styled(ScrollView)
const Text = styled(RNText)



export default function ReviewScreen() {
  const [isSelected, setIsSelected] = useState("");
  const [items, setItems] = useState<any>([]);

  const route = useRoute();


  const { data, loading, refetch, error } = useQuery(LOAD_PRODUCT_BY_REVIEW_ID, {
    variables: {
      id: route.params?.id
    }
  });





  console.log(data?.product?.reviews, "data")
  const regex = /(<([^>]+)>)/ig;

  return (
    <>
      <StyledScrollView style={{
        flex: 1,
        backgroundColor: "white",

      }}
        className="mt-20"
      >
        <StyledView className={`${(data?.product?.reviews?.nodes || []).length!== 0 ? "px-4" : "px-0"}`}>

          <StyledView className="overflow-hidden">

            <ScrollView style={{ height: Dimensions.get("screen").height, width: Dimensions.get("screen").width, marginTop: 15, marginBottom: 20 }}>
              <FlashList
                data={data?.product?.reviews?.nodes || []}
                renderItem={({ item }) => <ReviewItem title={item.author?.node?.name} content={
                  _.padStart(_.padEnd(item?.content.replace(regex, '')))

                } description={item.price} image={item.author?.node?.avatar?.url} count={9} />}
                estimatedItemSize={300}
                numColumns={1}
                ItemSeparatorComponent={() => <StyledView className="h-[1px] my-2 bg-gray-100" />}
                ListEmptyComponent={() => <ListEmptyComponent />}
              />
            </ScrollView>

            {/* <Button text="Valider mon panier" /> */}

          </StyledView>

        </StyledView>
      </StyledScrollView>

    </>
  );
}




const ListEmptyComponent = () => {


  const animationRef = useRef<Lottie>(null)

  useEffect(() => {
    animationRef.current?.play()

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, [])




  return (
    <>
      <StyledView className="flex-1 items-center justify-center ">
        {/* <StyledView
        style={{
          borderRadius: 100,
          borderStyle: "dashed",
        }}
        className='h-40 w-40  !border-dashed border-gray-200  flex items-center justify-center'>
        <AntDesign

          name='shoppingcart' size={100} color={"#f1f2f6"} />
      </StyledView> */}

        <Lottie
          ref={animationRef}
          source={require('@/assets/91173-customer-review.json')}
          style={{
            height: 300
          }}
        />
        <StyledView className='flex items-center  flex-col'>
          <StyledText className="text-gray-300 text-md ">Aucun avis trouvé</StyledText>
          <StyledText className="text-black font-bold my-4  text-md">
            Les Avis Apparaitrons ici une fois que vous d'autres utilisateurs auront acheté le produit
          </StyledText>
          <Button

            text='Go Shopping' size='max' />
        </StyledView>
      </StyledView>

    </>
  )
}



const ReviewItem = ({ title, description, image, content }: any) => {
  return (
    <StyledView className="flex-row items-start">
    

        <StyledImage source={{
          uri: isValidHttpUrl(image) ? image : 'https://images.unsplash.com/photo-1616166330003-8b5f2b2b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',

        }}
      
        className="bg-gray-200 h-12 w-12 rounded-full flex items-center justify-center relative"
          indicator={() => <ActivityIndicator color={"black"} size="small" />}

        />


    
      <StyledView className="flex-1 ml-4">
        <StyledText className="font-bold ">{title}</StyledText>
        {/* <StyledText className="text-gray-400 text-[11px]">{description}</StyledText> */}
        <StyledView className='flex flex-row items-center mt-2'>
          {/* <StyledText className="font-bold mr-2">5.0</StyledText>
          <StarRating
            rating={Math.round(Math.random() * 5)}
            onChange={() => { }}
            starSize={15}
            starStyle={{ marginHorizontal: 1 }}
            color="#F29217"
            emptyColor='#f1f2f6'

          /> */}


        </StyledView>
        <StyledText className="text-black text-xs ">
          {content}
        </StyledText>
      </StyledView>
    </StyledView>
  )
}