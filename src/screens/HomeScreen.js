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
  FlatList,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Button from '../components/Button2';
import color from 'color';
import {font} from '../components/fonts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Picker} from 'react-native-ui-lib';
const {width, height} = Dimensions.get('window');
class HomeScreen extends Component {
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
      Post: [
        {
          id: 0,
          username: 'Kelly O’liver',
          age: '27',
          meet: 'Meetups',
          image: require('../../assets/images/Rectangle1.png'),
          date: 'April 26,2020 | 11:30 AM',
          process: 'In Process',
          price: '$ 129.1',
          uid: '#6257441',
          status: 'Assign on April 26,2020 | 11:00 AM',
          orderid: '#6257441',
        },
        {
          id: 1,
          username: 'Kelly O’liver',
          age: '27',
          meet: 'Meetups',
          image: require('../../assets/images/Rectangle2.png'),
          date: 'April 26,2020 | 11:30 AM',
          process: 'In Process',
          price: '$ 129.1',
          uid: '#6257441',
          status: 'Assign on April 26,2020 | 11:00 AM',
          orderid: '#6257441',
        },
        {
          id: 2,
          username: 'Kelly O’liver',
          age: '27',
          meet: 'Meetups',
          image: require('../../assets/images/Rectangle3.png'),
          date: 'April 26,2020 | 11:30 AM',
          process: 'In Process',
          price: '$ 129.1',
          uid: '#6257441',
          status: 'Assign on April 26,2020 | 11:00 AM',
          orderid: '#6257441',
        },
        {
          id: 3,
          username: 'Kelly O’liver',
          age: '27',
          meet: 'Meetups',
          image: require('../../assets/images/Rectangle1.png'),
          date: 'April 26,2020 | 11:30 AM',
          process: 'In Process',
          price: '$ 129.1',
          uid: '#6257441',
          status: 'Assign on April 26,2020 | 11:00 AM',
          orderid: '#6257441',
        },
      ],
    };
    this.timeout = null;
  }

  componentDidMount = () => {};

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={{width: '100%'}}>
          <View
            style={{
              width: '100%',
              height: 110,
              backgroundColor: '#5FAEB6',
              padding: 20,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomLeftRadius: 50,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                height: '100%',
              }}>
              <Image
                source={require('../../assets/images/Rectangle.png')}
                style={{width: 50, height: 50}}
              />
              <Image
                source={require('../../assets/icons/Chat.png')}
                style={{width: 50, height: 50}}
              />
              {/* <View style={{flex: 1}}>
                <Text style={{fontSize: 24, fontFamily: font.Bold}}>
                  Hi Steven
                </Text>
                <Text
                  style={{fontSize: 16, fontFamily: font.Bold, marginTop: 10}}>
                  Nice to meet you : )
                </Text>
              </View> */}
            </View>
          </View>
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            width: '100%',
            // justifyContent: 'center',
            padding: 15,
            // backgroundColor: '#f00',
            // marginBottom: 10,
          }}>
          <ScrollView>
            <FlatList
              data={this.state.Post}
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ImageBackground
                  source={item.image}
                  style={{
                    width: '100%',
                    height: 240,
                    backgroundColor: '#f00',
                    marginTop: 10,
                    borderRadius: 20,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20,
                      backgroundColor: 'rgba(0,0,0,.5)',
                      //   alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                      padding: 15,
                    }}>
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text
                          style={{
                            fontSize: 24,
                            fontFamily: font.Bold,
                            color: '#fff',
                          }}>
                          {item.username}, {item.age}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: font.Regular,
                            color: '#fff',
                          }}>
                          {item.meet}, New Friend
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: font.SemiBold,
                          color: '#fff',
                        }}>
                        10 Miles
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
              )}
            />
          </ScrollView>
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

export default HomeScreen;
