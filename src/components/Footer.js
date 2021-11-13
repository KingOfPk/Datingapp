import React, {useState, useRef} from 'react';
import {
  Button,
  View,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
// https://youtu.be/6-r9PVI94hE?list=RDB8G3zCnZvMU
// https://youtu.be/6-r9PVI94hE
export default Footer = () => {
  return (
    <View
      style={{
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.selectedBtn}>
          <Image
            source={require('../../assets/icons/Compass.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require('../../assets/icons/Hand.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require('../../assets/icons/Slider.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn}>
          <Image
            source={require('../../assets/icons/Settings.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkblue',
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnContainer: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: '#ACABB4',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBtn: {
    width: 60,
    height: 50,
    borderWidth: 3,
    borderColor: '#416181',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
