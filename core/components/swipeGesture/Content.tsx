import React from 'react'
import { View, Text, Dimensions, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import ProductDescriptionScreen from '../base/ListingByCategory'


const PADDING_HORIZONTAL = 20
const WINDOW = Dimensions.get('window')

const POINT_WIDTH = 10
const NUM_POINTS = Math.floor((WINDOW.width - PADDING_HORIZONTAL - 20) / POINT_WIDTH)

const POINTS = new Array(NUM_POINTS).fill(0)

const Content = () => (
  <View style={{ flex: 1 }}>
    <View style={styles.content}>
      <ProductDescriptionScreen name='Categorie' />
      <ProductDescriptionScreen name='Categorie2' />
      <ProductDescriptionScreen name='Categorie3' />
    </View>

  </View>
)

const styles = StyleSheet.create({
  content: {
    paddingVertical: 10,
    paddingHorizontal: PADDING_HORIZONTAL,
  },

  text: {
    fontSize: Math.min(WINDOW.width * 0.053, 20),
    color: 'black'
  },
  textBold: {
    color: 'black',
    fontWeight: '600'
  },

  separator: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 25,
    paddingHorizontal: 20
  },
  point: {
    width: POINT_WIDTH,
    color: '#3D3D3D',
    fontSize: 15
  },

  line: {
    backgroundColor: '#3D3D3D',
    width: '100%',
    height: StyleSheet.hairlineWidth
  },
  btnWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  },

  btn: {
    width: '45%',
    backgroundColor: '#2C2C2C',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  btnText: {
    color: '#FFF',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 4
  }
})

export default Content