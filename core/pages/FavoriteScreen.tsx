import { styled } from 'nativewind';
import { Dimensions, ScrollView, View, Text, Platform } from 'react-native';

import CategoryTitle from '@/core/components/base/CategoryTitle';
import HeaderProduct from '@/core/components/base/HeaderProduct';
import { ProductItem } from '@/core/components/design-system/ProductItem';
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../components/design-system/ProductCard';
import SafeView from '../components/layouts/SafeView';
import { GetValueForKey } from '../utils/ExpoStore';
import { useFavoriteStore } from '../store/FavoriteStore';


const DATA = [
  {
    title: "Nancy Chair",
    price: "$129.99",
    link: require("../../assets/demo/1.png"),
  },
  {
    title: "Jongon Jensen Minimal Chair",
    price: "$129.199",
    link: require("../../assets/demo/2.png"),
  },
  {
    title: "Nancy Chair",
    price: "$129.00",
    link: require("../../assets/demo/1.png"),
  },
  {
    title: "Jongon Jensen Minimal Chair",
    price: "$129.39",
    link: require("../../assets/demo/2.png"),
  },
  {
    title: "Nancy Chair",
    price: "$129.89",
    link: require("../../assets/demo/1.png"),
  },
  {
    title: "Jongon Jensen Minimal Chair",
    price: "$129.49",
    link: require("../../assets/demo/2.png"),
  },
];




const StyledView = styled(View)
const StyledScrollView = styled(ScrollView)
const StyledText = styled(Text)

export default function FavoriteScreen() {


  const favoriteStore = useFavoriteStore((state) => state.favorites)


  return (

    <>
      <StyledScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
        className="pt-4"
      >


        <StyledView

          className='flex items-start flex-row justify-start px-4 flex-wrap gap-2 pb-40 mt-20' style={{ height: Dimensions.get("screen").height * DATA.length / 4.8 }}>

          {
            (favoriteStore || []).map((item, index) => (
              <StyledView
                key={item.id}
                style={{
                  width: Dimensions.get("screen").width / 2 - 20,
                }}
              >
                <ProductItem productId={item?.product?.productId} title={item.product?.name} id={item.product?.id} description={item.product?.price} image={item?.product?.image?.sourceUrl} />
              </StyledView>
            ))
          }

        </StyledView>


      </StyledScrollView>
    </>
  );
}

