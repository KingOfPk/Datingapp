import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
export default class Footer extends Component {
  render() {
    return (
      <View
        style={{
          width: '100%',
          height: 60,
          backgroundColor: '#FCE60B',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={this.props.Current}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderBottomColor: '#000',
            // borderBottomWidth: 1,
          }}>
          <Image
            source={require('../../assets/icons/Dot.png')}
            style={{width: 15, height: 15, resizeMode: 'contain'}}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Medium',
              marginLeft: 5,
              color: '#000',
              borderBottomWidth: this.props.page == 'current' ? 3 : 0,
              borderBottomColor: '#000',
            }}>
            Current
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.Finished}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/icons/Dot.png')}
            style={{width: 15, height: 15, resizeMode: 'contain'}}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Medium',
              marginLeft: 5,
              color: '#000',
              borderBottomWidth: this.props.page == 'finished' ? 3 : 0,
            }}>
            Finished
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.Cancelled}
          style={{
            alignItems: 'center',
            // marginLeft: 5,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../assets/icons/Dot.png')}
            style={{width: 15, height: 15, resizeMode: 'contain'}}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Medium',
              marginLeft: 5,
              color: '#000',
              borderBottomWidth: this.props.page == 'canclled' ? 3 : 0,
            }}>
            Cancelled
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Footer.PropTypes = {
  Current: PropTypes.func,
  Finished: PropTypes.func,
  Cancelled: PropTypes.func,
};
