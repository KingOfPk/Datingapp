import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { font } from "../components/fonts";
import Footer from "../components/Footer";
import RangeSliderRN from "rn-range-slider";
const { height, width } = Dimensions.get("window");

import Label from "./RangeSlider/Label";
import Notch from "./RangeSlider/Notch";
import Rail from "./RangeSlider/Rail";
import RailSelected from "./RangeSlider/RailSelected";
import Thumb from "./RangeSlider/Thumb";
import RangeSlider from "./RangeSlider";
import Button from "../components/Button";

const renderThumb = () => <Thumb />;
const renderRail = () => <Rail />;
const renderRailSelected = () => <RailSelected />;
const renderLabel = (value) => <Label text={value} />;
const renderNotch = () => <Notch />;

class Preference extends Component {
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
    const { LowAge, heighAge, minDistance, maxDistance } = this.state;

    const left = (this.state.LowAge * (width - 60)) / 100 - 15;
    const right = (this.state.heighAge * (width - 60)) / 100 - 15;
    const DistLeft = (this.state.minDistance * (width - 60)) / 100 - 15;
    const DistRight = (this.state.maxDistance * (width - 60)) / 100 - 15;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              height: 100,
              backgroundColor: "#5FAEB6",
              padding: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.backButtonContainer}
            >
              <Image
                source={require("../../assets/icons/Left.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>

            <View style={{ width: "100%", alignItems: "center", marginTop: 5 }}>
              <Text
                style={{
                  color: "#fff",
                  fontFamily: font.SemiBold,
                  fontSize: 20,
                }}
              >
                PREFERENCES
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <Text style={styles.headingText}>Intrested connections</Text>
              <View style={styles.mainWhiteContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>Online Dating</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>New Friends</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>Dating</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>Meetups</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
              </View>
              <Text style={styles.headingText}>Intrested in</Text>
              <View style={styles.mainWhiteContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>Men</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>Women</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>Both</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
              </View>
              <Text style={styles.headingText}>Intrested in</Text>
              <View style={styles.mainWhiteContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>
                    Meet up with new friends{" "}
                  </Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>Romantic relationships</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>Both</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>
                    Meet up with new friends
                  </Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>Romantic relationships</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={styles.rowContainer}>
                  <Text style={styles.normalText}>Both</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
              </View>
              <Text style={styles.headingText}>Age and Distance</Text>
              <View
                style={{ width: "100%", backgroundColor: "#fff", padding: 10 }}
              >
                <Text style={[styles.normalText, { paddingVertical: 10 }]}>
                  Age
                </Text>
                <RangeSliderRN
                  style={{ width: "100%", height: 70 }}
                  // gravity={"center"}
                  lineWidth={8}
                  textSize={8}
                  thumbRadius={15}
                  thumbColor={"#416181"}
                  selectionColor="#5FAEB6"
                  blankColor="#E5E5E5"
                  min={20}
                  max={60}
                  step={5}
                  floatingLabel
                  selectionColor="#5FAEB6"
                  blankColor="#E5E5E5"
                  renderThumb={renderThumb()}
                  renderRail={renderRail}
                  renderRailSelected={renderRailSelected}
                  renderLabel={renderLabel}
                  renderNotch={renderNotch}
                  onValueChanged={(low, high, fromUser) => {
                    this.setState({ LowAge: low, heighAge: high });
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    top: 5,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      styles.headingText,
                      { marginLeft: LowAge == 20 ? 0 : left },
                    ]}
                  >
                    {this.state.LowAge}
                  </Text>
                  <Text
                    style={[styles.headingText, { marginLeft: right - left }]}
                  >
                    {this.state.heighAge}
                  </Text>
                </View>
                <Text style={[styles.normalText, { paddingVertical: 10 }]}>
                  Age
                </Text>
                <RangeSliderRN
                  style={{ width: "100%", height: 70 }}
                  // gravity={"center"}
                  thumbRadius={15}
                  thumbColor={"#416181"}
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
                    this.setState({ minDistance: low, maxDistance: high });
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      styles.headingText,
                      { marginLeft: minDistance == 20 ? 0 : DistLeft },
                    ]}
                  >
                    {this.state.minDistance}
                  </Text>
                  <Text style={[styles.headingText, { marginRight: 10 }]}>
                    {this.state.maxDistance}
                  </Text>
                </View>
                <View
                  style={{ width: "70%", alignSelf: "center", marginTop: 50 }}
                >
                  <Button
                    text="Save"
                    backgroundColor="#5FAEB6"
                    // Pressed={() => this.props.navigation.navigate("HomeScreen")}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
          <Footer />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E5E5E5",
  },
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
  headingText: {
    fontFamily: font.SemiBold,
    fontSize: 20,
    color: "#000",
    padding: 10,
  },
  mainWhiteContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    // padding: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,

    // elevation: 3,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  normalText: {
    fontFamily: font.Regular,
    color: "#000000CF",
    fontSize: 18,
  },
  rightSideCircleView: {
    width: 25,
    height: 25,
    borderRadius: 10,
    backgroundColor: "#416181",
  },
});

export default Preference;
