import React, { useState, useRef } from "react";
import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { font } from "../components/fonts";
import { Icon } from "react-native-elements";
// https://youtu.be/6-r9PVI94hE?list=RDB8G3zCnZvMU
// https://youtu.be/6-r9PVI94hE
const Button = ({
  text,
  icon,
  Pressed,
  backgroundColor,
  textColor,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={Pressed}
      style={[
        styles.ButtonContainer,
        styles.shodow,
        { backgroundColor: backgroundColor ? backgroundColor : "#416181" },
      ]}
    >
      <Image source={icon} style={{ width: 30, height: 30, marginLeft: 10 }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: textColor ? textColor : "#fff",
            fontSize: 18,
            fontFamily: font.Bold,
            marginRight: 30,
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "darkblue",
  },
  ButtonContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "#416181",
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    // margin: 10,
  },

  shodow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});

export default Button;
