import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class SpacerWidth extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        width: 20
    }
})