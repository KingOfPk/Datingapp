import React from 'react';

import {View, Modal, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
export const Loader = ({color = 'grey'}) => {
  return (
    <Modal transparent={true}>
      <View style={styles.modal}>
        <View
          style={{
            marginHorizontal: '30%',
            height: '40%',
            width: '40%',
          }}>
          <LottieView
            source={require('../../assets/lottie/loader.json')}
            autoPlay={true}
            loop={true}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: 5,
  },
});
