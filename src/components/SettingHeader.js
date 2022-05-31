import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { font } from "./fonts";

const SettingHeader = ({ title, onPress }) => {
  return (
    <View
      style={{
        width: "100%",
        height: 100,
        backgroundColor: "#5FAEB6",
        padding: 20,
      }}
    >
      <TouchableOpacity onPress={onPress} style={styles.backButtonContainer}>
        <Image
          source={require("../../assets/icons/Left.png")}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>

      <View style={{ width: "100%", alignItems: "center", marginTop: 5 }}>
        <Text
          style={{
            color: "#fff",
            fontFamily: font.Medium,
            fontSize: 20,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    height: 30,
    width: 30,
    backgroundColor: "#C4C4C48F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
});

export default SettingHeader;
