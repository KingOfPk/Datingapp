import React, { useState, useRef } from "react";
import {
  Button,
  View,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
// https://youtu.be/6-r9PVI94hE?list=RDB8G3zCnZvMU
// https://youtu.be/6-r9PVI94hE
export default Footer = ({
  selectedIcon,
  settingPress,
  preferencePress,
  likePress,
  homePress,
}) => {
  return (
    <View
      style={{
        width: "100%",
        height: 60,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={
          selectedIcon == "Home" ? styles.selectedBtn : styles.btnContainer
        }
      >
        <TouchableOpacity onPress={homePress} style={styles.btn}>
          <Image
            source={require("../../assets/icons/Compass.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={
          selectedIcon == "Like" ? styles.selectedBtn : styles.btnContainer
        }
      >
        <TouchableOpacity onPress={likePress} style={styles.btn}>
          <Image
            source={require("../../assets/icons/Hand.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={
          selectedIcon == "Preference"
            ? styles.selectedBtn
            : styles.btnContainer
        }
      >
        <TouchableOpacity onPress={preferencePress} style={styles.btn}>
          <Image
            source={require("../../assets/icons/Slider.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={
          selectedIcon == "Setting" ? styles.selectedBtn : styles.btnContainer
        }
      >
        <TouchableOpacity onPress={settingPress} style={styles.btn}>
          <Image
            source={require("../../assets/icons/Settings.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  btnContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: "#ACABB4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBtn: {
    width: 60,
    height: 50,
    borderWidth: 3,
    borderColor: "#416181",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
