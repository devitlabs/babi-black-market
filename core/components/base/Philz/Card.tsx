import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import Button from "./components/Button";
import { Product } from "./Model";

const { width } = Dimensions.get("window");
export const CARD_HEIGHT = (width * 1264) / 874;
const styles = StyleSheet.create({
  container: {
    width,
    height: CARD_HEIGHT,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    color: "#432406",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#432406",
  },
});

interface CardProps {
  product: Product;
}

const Card = ({ product: { color1, title, subtitle } }: CardProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 16,
          marginLeft: 42,
          marginRight: 42,
          marginTop: 10,
          marginBottom: 42,
          flex: 1,
          backgroundColor: color1,
          padding: 16,
          paddingBottom: 32,
          justifyContent: "space-between",
        }}
      >
        <View>
          {/* <CardHeader /> */}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Button label="Acheter" />
      </View>
    </View>
  );
};

export default Card;