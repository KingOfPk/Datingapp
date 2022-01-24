import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from "react-native";
import Button from "../components/Button";
import { font } from "../components/fonts";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../Store/Action/user.action.js";
import { Loader } from "../components/Loader";
import Toast from "react-native-simple-toast";
const { height, width } = Dimensions.get("window");

class ChooseInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInterestType: "",
      isloading: false,
    };
  }

  SetConnections = async () => {
    var token = await AsyncStorage.getItem("userToken");
    if (this.state.selectedInterestType == "") {
      Toast.show("Please choose your interest", Toast.LONG);
    } else {
      this.setState({
        isloading: true,
      });
      var data = JSON.stringify({
        interest_ids: this.state.selectedInterestType,
      });

      var config = {
        method: "put",
        url: `${baseurl}/api/v1/preferences/interest_update`,
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
          this.setState({
            isloading: false,
          });
          // this.props.navigation.navigate("ChooseConnections");
          this.props.navigation.navigate("ChooseLookingFor");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    const { selectedInterestType, isloading } = this.state;

    return isloading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
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
            <Text style={styles.headingText}>Who you are</Text>
            <Text
              style={[
                styles.headingText,
                { color: "#5FAEB6", left: 5, fontStyle: "italic" },
              ]}
            >
              interested
            </Text>
            <Text style={[styles.headingText, { left: 10 }]}>in</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "70%",
            // backgroundColor: "#ff0",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", height: "85%", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedInterestType: "1",
                  });
                }}
                style={[
                  styles.connectionTypeContainer,

                  selectedInterestType == "1"
                    ? { borderWidth: 3 }
                    : { borderWidth: 0 },
                  selectedInterestType == "1"
                    ? { borderColor: "#5FAEB6" }
                    : { borderColor: "none" },
                ]}
              >
                <Text style={{ fontFamily: font.Medium, color: "#fff" }}>
                  {"Men"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedInterestType: "2",
                  });
                }}
                style={[
                  styles.connectionTypeContainer,

                  selectedInterestType == "2"
                    ? { borderWidth: 3 }
                    : { borderWidth: 0 },
                  selectedInterestType == "2"
                    ? { borderColor: "#5FAEB6" }
                    : { borderColor: "none" },
                ]}
              >
                <Text style={{ fontFamily: font.Medium, color: "#fff" }}>
                  {"Women"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  selectedInterestType: "3",
                });
              }}
              style={[
                styles.connectionTypeContainer,

                selectedInterestType == "3"
                  ? { borderWidth: 3 }
                  : { borderWidth: 0 },
                selectedInterestType == "3"
                  ? { borderColor: "#5FAEB6" }
                  : { borderColor: "none" },
                {
                  marginTop: "5%",
                },
              ]}
            >
              <Text style={{ fontFamily: font.Medium, color: "#fff" }}>
                {"Both"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "85%", height: "15%" }}>
            <Button
              text="Save"
              backgroundColor="#5FAEB6"
              Pressed={() => this.SetConnections()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
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
    // height: 100,
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
  connectionTypeContainer: {
    width: width / 3.1,
    height: 140,
    backgroundColor: "#416181",
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

function mapStateToProps(state) {
  console.log(state);
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
export default connect(mapStateToProps, mapDispatchToProps)(ChooseInterest);
// export default ChooseInterest;
