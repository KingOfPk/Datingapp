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
import SettingHeader from "../components/SettingHeader";
import Styles from "../components/CommanStyle";

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
        <View style={[Styles.container, { backgroundColor: "#E5E5E5" }]}>
          <SettingHeader title="PREFERENCES" />

          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <Text style={Styles.settingHeadingText}>
                Intrested connections
              </Text>
              <View style={Styles.mainWhiteContainer}>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Online Dating</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>New Friends</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Dating</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Meetups</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
              </View>
              <Text style={Styles.settingHeadingText}>Intrested in</Text>
              <View style={Styles.mainWhiteContainer}>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Men</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Women</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Both</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
              </View>
              <Text style={Styles.settingHeadingText}>Intrested in</Text>
              <View style={Styles.mainWhiteContainer}>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>
                    Meet up with new friends{" "}
                  </Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Romantic relationships</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Both</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>
                    Meet up with new friends
                  </Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Romantic relationships</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Both</Text>
                  <TouchableOpacity style={styles.rightSideCircleView} />
                </View>
              </View>
              <Text style={Styles.settingHeadingText}>Age and Distance</Text>
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
                      Styles.settingHeadingText,
                      { marginLeft: LowAge == 20 ? 0 : left },
                    ]}
                  >
                    {this.state.LowAge}
                  </Text>
                  <Text
                    style={[
                      Styles.settingHeadingText,
                      { marginLeft: right - left },
                    ]}
                  >
                    {this.state.heighAge}
                  </Text>
                </View>
                <Text style={[styles.normalText, { paddingVertical: 10 }]}>
                  Distance
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
                      Styles.settingHeadingText,
                      { marginLeft: minDistance == 20 ? 0 : DistLeft },
                    ]}
                  >
                    {this.state.minDistance}
                  </Text>
                  <Text
                    style={[Styles.settingHeadingText, { marginRight: 10 }]}
                  >
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
          <Footer
            selectedIcon="Preference"
            homePress={() => this.props.navigation.navigate("HomeScreen")}
            likePress={() => this.props.navigation.navigate("LikeScreen")}
            preferencePress={() => this.props.navigation.navigate("Preference")}
            settingPress={() => this.props.navigation.navigate("Setting")}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
    fontFamily: font.Medium,
    fontSize: 20,
    color: "#000",
    padding: 10,
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
