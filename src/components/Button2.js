import React, {useState, useRef} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {font} from '../components/fonts';
import {Icon} from 'react-native-elements';
// https://youtu.be/6-r9PVI94hE?list=RDB8G3zCnZvMU
// https://youtu.be/6-r9PVI94hE
const Button = ({text, icon, Pressed}) => {
  return (
    <TouchableOpacity
      onPress={Pressed}
      style={[styles.ButtonContainer, styles.shodow]}>
      <Image source={icon} style={{width: 30, height: 30, marginLeft: 10}} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: '#416181',
            fontSize: 18,
            fontFamily: font.Bold,
            marginRight: 30,
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkblue',
  },
  ButtonContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // margin: 10,
  },
  shodow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default Button;
