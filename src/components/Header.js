import React, {useState, useRef} from 'react';
import {Button, View, Alert, StyleSheet} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {Icon} from 'react-native-elements';
// https://youtu.be/6-r9PVI94hE?list=RDB8G3zCnZvMU
// https://youtu.be/6-r9PVI94hE
export default Header = () => {
  return (
    <View
      style={{width: '100%', height: 80, backgroundColor: '#fa9441'}}></View>
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
});
