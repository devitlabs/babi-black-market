import { styled } from 'nativewind';
import { Dimensions, Platform, Pressable, ScrollView, Text, View } from 'react-native';

import { ProductItem } from '@/core/components/design-system/ProductItem';
import { useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from 'react';
import BackNavigationHeader from '../components/base/BackNavigationHeader';
import { LOAD_SUBCATEGORY_BY_CATEGORY, PRODUCT_BY_CATEGORY } from '../graphql/Products.gql';
import Shimmer from '../components/base/Shimmer';
import { range } from 'lodash';
import { useProductDescriptionStore } from '../store/ProductDescriptionStore';
import { useFilterStore } from '../store/FilterStore';




const Cat = [
  {
    title: "Features",
  }, {
    title: "Collection",
  },
  {
    title: "Trends",
  },
  {
    title: "Features2",
  }, {
    title: "Collection",
  },
  {
    title: "Trends",
  }
]



const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const StyledText = styled(Text)
const StyledPressable = styled(Pressable)

export default function ProductsListScreen() {
  const setCurrentId = useProductDescriptionStore((state) => state.setCurrentId)
  const setCurrentProductId = useProductDescriptionStore((state) => state.setCurrentProductId)

  const minPrice = useFilterStore((state) => state.minPrice)
  const maxPrice = useFilterStore((state) => state.maxPrice)
  const search = useFilterStore((state) => state.search)
  const subCategory = useFilterStore((state) => state.subCategory)
  const setSubCategory = useFilterStore((state) => state.setSubCategory)



  useEffect(() => {
    setSubCategory("")
  }, [])

  const navigation = useNavigation();
  const route = useRoute();

  const { data, loading } = useQuery(PRODUCT_BY_CATEGORY, {
    variables: {
      categoryIn: route.params?.category,
      category: subCategory || "",
      //  minPrice: minPrice*100 || 0,
      // maxPrice: maxPrice*100 || 100000000,
      search: search || "",
    }
  });


  const { data: subData, loading: subLoading } = useQuery(LOAD_SUBCATEGORY_BY_CATEGORY, {
    variables: {
      id: route.params?.id,
    }
  });

  useEffect(() => {

    navigation.setOptions({
      header: () => <BackNavigationHeader hasFilter title={route.params?.category} />
    })

    setCurrentProductId(null)
    setCurrentId(null)
  }, [])


  const HeighthDector = () => {
    if ((subData?.productCategory?.children?.nodes || []).length === 0) {
      return 20
    }
    if (subLoading) return 20
    return 45
  }
  return (

    <>
      <StyledView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
        className="pt-4"
      >

        <StyledView className={`${Platform.OS === "android" ? "mt-16" : "mt-20"} border-b px-4 border-gray-100`} style={{ height: HeighthDector(), width: Dimensions.get("screen").width }}>

          {!subLoading && < FlashList
            data={subData?.productCategory?.children?.nodes || []}
            renderItem={({ item }) => <CategoryItem title={item?.name} id={item?.id} />}
            estimatedItemSize={300}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={
              () => (
                <StyledView className='w-4' />
              )
            }
          />}


          {
            subLoading &&
            <StyledView className='flex flex-row'>
              {
                range(0, 5).map((item, index) => (
                  <StyledView className='mr-2'>
                    <Shimmer width={100} height={15} />
                  </StyledView>
                ))
              }
            </StyledView>

          }
        </StyledView>

        <StyledScrollView
          style={{ height: Dimensions.get("screen").height }}
        >
          <StyledView

            className='flex items-start flex-row justify-start px-4 flex-wrap gap-2 pb-40 mt-4' >





            {!loading &&
              data?.products?.nodes?.map((item, index) => (
                <StyledView
                  key={item.id}
                  style={{
                    width: Dimensions.get("screen").width / 2 - 20,
                  }}
                >
                  <ProductItem productId={item?.productId} title={item.name} id={item.id} description={item.price} image={item?.image?.sourceUrl} />

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

          </StyledView>


        </StyledScrollView>

      </StyledView>
    </>
  );
}


export const ShimmerProductItem = () => {
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

const CategoryItem = ({ title }) => {

  const subCategory = useFilterStore((state) => state.subCategory)
  const setSubCategory = useFilterStore((state) => state.setSubCategory)
  return (
    <StyledPressable
      onPress={() => setSubCategory(title)}
    >
      <StyledText className={` ${title === subCategory ? "text-black font-bold" : "text-stone-400"} text-xl `}>{title}</StyledText>
    </StyledPressable>
  )
}