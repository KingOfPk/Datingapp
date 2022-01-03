import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  AsyncStorage,
} from "react-native";
import Button from "../components/Button";
import { font } from "../components/fonts";
import RangeSliderRN from "rn-range-slider";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../Store/Action/user.action.js";
import { Loader } from "../components/Loader";
const { height, width } = Dimensions.get("window");

import Label from "./RangeSlider/Label";
import Notch from "./RangeSlider/Notch";
import Rail from "./RangeSlider/Rail";
import RailSelected from "./RangeSlider/RailSelected";
import Thumb from "./RangeSlider/Thumb";
import RangeSlider from "./RangeSlider";

const renderThumb = () => <Thumb />;
const renderRail = () => <Rail />;
const renderRailSelected = () => <RailSelected />;
const renderLabel = (value) => <Label text={value} />;
const renderNotch = () => <Notch />;

class ChooseAgeOrDistance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LowAge: 20,
      heighAge: 60,
      minDistance: 20,
      maxDistance: 60,
      isloading: false,
    };
  }

  SetConnections = async () => {
    var token = await AsyncStorage.getItem("userToken");
    this.setState({
      isloading: true,
    });
    var data = JSON.stringify({
      min_age: this.state.LowAge,
      max_age: this.state.heighAge,
    });

    var config = {
      method: "put",
      url: `${baseurl}/api/v1/preferences/update_user_age`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };
    console.log(config);

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        var res = response.data;

        var data1 = JSON.stringify({
          min_distance: this.state.minDistance,
          max_distance: this.state.maxDistance,
        });

        var config = {
          method: "put",
          url: `${baseurl}/api/v1/preferences/update_user_distance`,
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          data: data1,
        };
        console.log(config);

        axios(config)
          .then(async (response) => {
            console.log(JSON.stringify(response.data));
            var res = response.data;
            this.setState({
              isloading: false,
            });
            await AsyncStorage.removeItem("isComplete");
            this.props.navigation.navigate("HomeScreen");
            // this.props.navigation.navigate("ChooseInterest");
          })
          .catch(function (error) {
            console.log(error);
          });
        // this.props.navigation.navigate("ChooseInterest");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { LowAge, heighAge, minDistance, maxDistance, isloading } =
      this.state;

    const left = (this.state.LowAge * (width - 60)) / 100 - 15;
    const right = (this.state.heighAge * (width - 60)) / 100 - 15;
    const DistLeft = (this.state.minDistance * (width - 60)) / 100 - 15;
    const DistRight = (this.state.maxDistance * (width - 60)) / 100 - 15;
    return isloading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        {/* <ScrollView style={{ width: "100%", height: "100%" }}> */}
        <View
          style={{
            width: "100%",
            height: "30%",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <View style={styles.rowContainer}>
            <Text style={styles.userNameText}>{this.props.user.name},</Text>
            <Image
              source={
                this.props.user.profile_pic.url
                  ? { uri: this.props.user.profile_pic.url }
                  : require("../../assets/images/dummyUser.png")
              }
              style={styles.userImage}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headingText}>Your prefered</Text>
            <Text
              style={[
                styles.headingText,
                { color: "#5FAEB6", left: 5, fontStyle: "italic" },
              ]}
            >
              age
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headingText}>and</Text>
            <Text
              style={[
                styles.headingText,
                { color: "#5FAEB6", left: 5, fontStyle: "italic" },
              ]}
            >
              distance
            </Text>
          </View>
        </View>
        <View
          style={{
            // flexGrow: 1,
            width: "100%",
            height: "70%",
            // alignItems: "center",
            paddingHorizontal: 15,
            // backgroundColor: "red",
          }}
        >
          <Text style={styles.headingText}>Age</Text>

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
            renderLabel={null}
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
            <Text style={[styles.headingText]}>{this.state.LowAge}</Text>
            <Text style={[styles.headingText]}>{this.state.heighAge}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              marginTop: 20,
            }}
          >
            <Text style={styles.headingText}>Distance</Text>
            <Text
              style={[
                styles.headingText,
                { fontFamily: font.Regular, fontSize: 14, top: 4, left: 4 },
              ]}
            >
              In Miles
            </Text>
          </View>

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
            <Text style={[styles.headingText]}>{this.state.minDistance}</Text>
            <Text style={[styles.headingText]}>{this.state.maxDistance}</Text>
          </View>
          <View
            style={{ width: "85%", paddingTop: "15%", alignSelf: "center" }}
          >
            <Button
              text="Save"
              backgroundColor="#5FAEB6"
              Pressed={() => this.SetConnections()}
            />
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  userNameText: {
    fontFamily: font.Bold,
    fontSize: 25,
    color: "#000",
  },
  headingText: {
    fontFamily: font.Medium,
    fontSize: 25,
    color: "#000",
  },

  rowContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userImage: {
    width: 80,
    height: 80,
    // resizeMode: "contain",
    borderRadius: 40,
  },
});

function mapStateToProps(state) {
  console.log(state.User.user.bio);
  return {
    Address: state.Data.address,
    user: state.User.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserDetail,
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseAgeOrDistance);
// export default ChooseAgeOrDistance;
