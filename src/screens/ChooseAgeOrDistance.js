import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import {font} from '../components/fonts';
import RangeSliderRN from 'rn-range-slider';
const {height, width} = Dimensions.get('window');

import Label from './RangeSlider/Label';
import Notch from './RangeSlider/Notch';
import Rail from './RangeSlider/Rail';
import RailSelected from './RangeSlider/RailSelected';
import Thumb from './RangeSlider/Thumb';
import RangeSlider from './RangeSlider';

const renderThumb = () => <Thumb />;
const renderRail = () => <Rail />;
const renderRailSelected = () => <RailSelected />;
const renderLabel = value => <Label text={value} />;
const renderNotch = () => <Notch />;

class ChooseAgeOrDistance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LowAge: 20,
      heighAge: 60,
      minDistance: 20,
      maxDistance: 60,
    };
  }
  render() {
    const {LowAge, heighAge, minDistance, maxDistance} = this.state;

    const left = (this.state.LowAge * (width - 60)) / 100 - 15;
    const right = (this.state.heighAge * (width - 60)) / 100 - 15;
    const DistLeft = (this.state.minDistance * (width - 60)) / 100 - 15;
    const DistRight = (this.state.maxDistance * (width - 60)) / 100 - 15;
    return (
      <View style={styles.container}>
        <ScrollView style={{width: '100%'}}>
          <View
            style={{
              width: '100%',
              height: '30%',
              justifyContent: 'center',
              padding: 10,
            }}>
            <View style={styles.rowContainer}>
              <Text style={styles.userNameText}>Steven,</Text>
              <Image
                source={require('../../assets/images/dummyUser.png')}
                style={styles.userImage}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.headingText}>Your prefered</Text>
              <Text
                style={[
                  styles.headingText,
                  {color: '#ACABB4', left: 5, fontStyle: 'italic'},
                ]}>
                age
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.headingText}>and</Text>
              <Text
                style={[
                  styles.headingText,
                  {color: '#ACABB4', left: 5, fontStyle: 'italic'},
                ]}>
                distance
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: '70%',
              // alignItems: "center",
              paddingHorizontal: 15,
            }}>
            <Text style={styles.headingText}>Age</Text>

            <RangeSliderRN
              style={{width: '100%', height: 70}}
              // gravity={"center"}
              lineWidth={8}
              textSize={8}
              thumbRadius={15}
              thumbColor={'#416181'}
              selectionColor="#5FAEB6"
              blankColor="#E5E5E5"
              min={20}
              max={60}
              step={5}
              floatingLabel
              selectionColor="#5FAEB6"
              blankColor="#E5E5E5"
              onValueChanged={(low, high, fromUser) => {
                this.setState({LowAge: low, heighAge: high});
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                top: 5,
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.headingText,
                  {marginLeft: LowAge == 20 ? 0 : left},
                ]}>
                {this.state.LowAge}
              </Text>
              <Text style={[styles.headingText, {marginLeft: right - left}]}>
                {this.state.heighAge}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                marginTop: 20,
              }}>
              <Text style={styles.headingText}>Distance</Text>
              <Text
                style={[
                  styles.headingText,
                  {fontFamily: font.Regular, fontSize: 14, top: 4, left: 4},
                ]}>
                In Miles
              </Text>
            </View>

            <RangeSliderRN
              style={{width: '100%', height: 70}}
              // gravity={"center"}
              thumbRadius={15}
              thumbColor={'#416181'}
              selectionColor="#5FAEB6"
              blankColor="#E5E5E5"
              lineWidth={8}
              textSize={8}
              floatingLabel
              min={20}
              max={60}
              step={5}
              selectionColor="#5FAEB6"
              blankColor="#E5E5E5"
              onValueChanged={(low, high, fromUser) => {
                this.setState({minDistance: low, maxDistance: high});
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.headingText,
                  {marginLeft: minDistance == 20 ? 0 : DistLeft},
                ]}>
                {this.state.minDistance}
              </Text>
              <Text
                style={[
                  styles.headingText,
                  {marginLeft: DistRight - DistLeft},
                ]}>
                {this.state.maxDistance}
              </Text>
            </View>
            <View
              style={{width: '85%', paddingTop: '15%', alignSelf: 'center'}}>
              <Button
                text="Save"
                backgroundColor="#5FAEB6"
                Pressed={() => this.props.navigation.navigate('HomeScreen')}
              />
            </View>
          </View>
        </ScrollView>
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
  userNameText: {
    fontFamily: font.Bold,
    fontSize: 25,
    color: '#000',
  },
  headingText: {
    fontFamily: font.SemiBold,
    fontSize: 25,
    color: '#000',
  },

  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
export default ChooseAgeOrDistance;
