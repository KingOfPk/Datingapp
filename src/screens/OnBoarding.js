import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  AsyncStorage,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Button from '../components/Button2';
import color from 'color';
import {font} from '../components/fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from 'react-native-ui-lib';
const {width, height} = Dimensions.get('window');
class OnBoarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategory: [
        {label: 'Sunday', value: 1},
        {label: '10', value: 10},
        {label: '20', value: 20},
        {label: '30', value: 30},
        {label: '40', value: 40},
        {label: '50', value: 50},
        {label: '60', value: 60},
        {label: '70', value: 70},
        {label: '80', value: 80},
        {label: '90', value: 90},
        {label: '100', value: 100},
      ],
    };
    this.timeout = null;
  }

  componentDidMount = () => {};

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            height: '25%',
            // backgroundColor: '#f00',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 24, fontFamily: font.Bold}}>
                Hi Steven
              </Text>
              <Text
                style={{fontSize: 16, fontFamily: font.Bold, marginTop: 10}}>
                Nice to meet you : )
              </Text>
            </View>
            <Image
              source={require('../../assets/images/Rectangle.png')}
              style={{width: 80, height: 80}}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: '75%',
            backgroundColor: '#5FAEB6',
            borderTopRightRadius: width * 0.6,
            // alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
          }}>
          <Text style={{fontSize: 34, fontFamily: font.Bold, color: '#fff'}}>
            Please help us to build up a profile of what you are looking for.
          </Text>

          <View style={{width: '100%', marginTop: 60}}>
            <View
              style={{
                width: 230,
                height: 5,
                backgroundColor: '#406284',
              }}></View>
          </View>
          <View
            style={{
              width: '100%',
              height: 60,
              marginTop: 50,
              //   backgroundColor: '#f00',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 60,
            }}>
            <View style={{width: '75%'}}>
              <Button
                icon={''}
                text="CONTINUE"
                Pressed={() => this.props.navigation.navigate('OtpScreen')}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 120,
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  headerdescription: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
  },
  categoryIconStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ACABB4',
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
  inputContainer2: {
    width: '100%',
    // height: 70,
    // borderWidth: 1,
    borderColor: '#ACABB4',
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
});

export default OnBoarding;
