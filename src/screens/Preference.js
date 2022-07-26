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
  AsyncStorage,
} from "react-native";
import { font } from "../components/fonts";
import Footer from "../components/Footer";
import RangeSliderRN from "rn-range-slider";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../Store/Action/user.action.js";
import { Loader } from "../components/Loader";
import moment from "moment";
const { height, width } = Dimensions.get("window");
import Toast from "react-native-simple-toast";
import Label from "./RangeSlider/Label";
import Notch from "./RangeSlider/Notch";
import Rail from "./RangeSlider/Rail";
import RailSelected from "./RangeSlider/RailSelected";
import Thumb from "./RangeSlider/Thumb";
import RangeSlider from "./RangeSlider";
import Button from "../components/Button";
import SettingHeader from "../components/SettingHeader";
import Styles from "../components/CommanStyle";
import Modal from "react-native-modal";
const renderThumb = () => <Thumb />;
const renderRail = () => <Rail />;
const renderRailSelected = () => <RailSelected />;
const renderLabel = (value) => <Label text={value} />;
const renderNotch = () => <Notch />;

class Preference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LowAge: this.props.user.user_age.min_age,
      heighAge: this.props.user.user_age.max_age,
      minDistance: this.props.user.user_distance.min_distance,
      maxDistance: this.props.user.user_distance.max_distance,
      connectionType: [],
      Interests: [],
      Lookins: [],
      selectedConnectionType: this.props.user.connections,
      selectedIntrestType: this.props.user.interests,
      selectedLookingType: this.props.user.lookings,
      connectionArray: [],
      interestArray: [],
      LookingArray: [],
      needDataSave: false,
      planModal: false,
    };
  }

  componentDidMount = async () => {
    this.Connections();
    this.Intrestedin();
    this.LookingFor();
    var blankLooking = [];
    var blankConnection = [];
    var blankinterest = [];
    this.props.user.connections.map((value) => {
      blankConnection.push(value.id);
      this.setState({
        connectionArray: blankConnection,
      });
    });
    this.props.user.interests.map((value) => {
      blankinterest.push(value.id);
      this.setState({
        interestArray: blankinterest,
      });
    });
    this.props.user.lookings.map((value) => {
      console.log("looking", value);
      blankLooking.push(value.id);
      this.setState({
        LookingArray: blankLooking,
      });
    });
  };

  Connections = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/preferences/connections`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };
    console.log(config);

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        var res = response.data;

        this.setState({
          isloading: false,
          connectionType: res.data,
        });
        // this.props.navigation.navigate("ChooseConnections");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  Intrestedin = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/preferences/lookings`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };
    console.log(config);

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        var res = response.data;

        this.setState({
          isloading: false,
          Lookins: res.data,
        });
        // this.props.navigation.navigate("ChooseConnections");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  LookingFor = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/preferences/interests`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };
    console.log(config);

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        var res = response.data;

        this.setState({
          isloading: false,
          Interests: res.data,
        });
        // this.props.navigation.navigate("ChooseConnections");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  selectConnectType = (item) => {
    this.setState({
      needDataSave: true,
    });
    if (
      this.state.selectedConnectionType.some((value) => value.id == item.id)
    ) {
      var connection = this.state.selectedConnectionType.filter(
        (value) => value.id !== item.id
      );
      var connection2 = this.state.connectionArray.filter(
        (value) => value !== item.id
      );
      this.setState({
        selectedConnectionType: connection,
        connectionArray: connection2,
      });
    } else {
      this.setState({
        selectedConnectionType: [...this.state.selectedConnectionType, item],
        connectionArray: [...this.state.connectionArray, item.id],
      });
    }
  };

  selectInterestType = (item) => {
    // if (this.state.selectedIntrestType.some((value) => value.id == item.id)) {
    //   var connection = this.state.selectedIntrestType.filter(
    //     (value) => value.id !== item.id
    //   );
    //   var connection2 = this.state.interestArray.filter(
    //     (value) => value !== item.id
    //   );
    //   this.setState({
    //     selectedIntrestType: connection,
    //     interestArray: connection2,
    //   });
    // } else {
    //   this.setState({
    //     selectedIntrestType: [...this.state.selectedIntrestType, item],
    //     interestArray: [...this.state.interestArray, item.id],
    //   });
    // }
    this.setState({
      interestArray: [item.id],
      needDataSave: true,
    });
  };

  selectLookingType = (item) => {
    this.setState({
      needDataSave: true,
    });
    if (this.state.selectedLookingType.some((value) => value.id == item.id)) {
      var connection = this.state.selectedLookingType.filter(
        (value) => value.id !== item.id
      );
      var connection2 = this.state.LookingArray.filter(
        (value) => value !== item.id
      );
      this.setState({
        selectedLookingType: connection,
        LookingArray: connection2,
      });
    } else {
      this.setState({
        selectedLookingType: [...this.state.selectedLookingType, item],
        LookingArray: [...this.state.LookingArray, item.id],
      });
    }
  };

  EditValue = () => {
    // console.log();
    // this.state.selectedConnectionType.map((value) => {
    //   console.log(value.id);
    //   this.setState({
    //     connectionArray: [...this.state.connectionArray, value.id],
    //   });
    // });
    // this.state.selectedLookingType.map((value) => {
    //   console.log(value.id);
    //   this.setState({
    //     LookingArray: [...this.state.LookingArray, value.id],
    //   });
    // });

    // this.state.selectInterestType.map((value) => {
    //   console.log(value.id);
    //   this.setState({
    //     interestArray: [...this.state.interestArray, value.id],
    //   });
    // });

    this.submitConnection();
  };

  submitConnection = async () => {
    var token = await AsyncStorage.getItem("userToken");
    this.setState({
      isloading: true,
    });
    var data = JSON.stringify({
      connection_ids: this.state.connectionArray.toString(),
      interest_ids: this.state.interestArray.toString(),
      looking_ids: this.state.LookingArray.toString(),
    });

    var config1 = {
      method: "put",
      url: `${baseurl}/api/v1/preferences/connection_update`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };
    console.log(config1);

    axios(config1)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        // ===============================================
        var config2 = {
          method: "put",
          url: `${baseurl}/api/v1/preferences/lookings_update`,
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          data: data,
        };
        console.log(config2);

        axios(config2)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            // ==============================================
            var config3 = {
              method: "put",
              url: `${baseurl}/api/v1/preferences/interest_update`,
              headers: {
                "Content-Type": "application/json",
                token: token,
              },
              data: data,
            };
            console.log(config3);

            axios(config3)
              .then((response) => {
                console.log(JSON.stringify(response.data));
                this.setProfile();
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setProfile = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/profile`,
      headers: {
        token: token,
      },
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        var res = response.data;
        this.setState({
          isloading: false,
          needDataSave: false,
        });
        if (res.status) {
          this.props.getUserDetail(res.data);
          // this.props.navigation.navigate("AllowLocation");
          this.setState({
            needDataSave: false,
            planModal: true,
          });

          setTimeout(() => {
            this.setState({
              planModal: false,
            });
          }, 2000);
        }
      })
      .catch((error) => {
        this.setState({
          needDataSave: true,
        });
      });
  };

  render() {
    const {
      LowAge,
      heighAge,
      minDistance,
      maxDistance,
      connectionType,
      Interests,
      Lookins,
      selectedConnectionType,
      selectedIntrestType,
      selectedLookingType,
    } = this.state;

    return this.state.isloading ? (
      <Loader />
    ) : (
      <SafeAreaView>
        <View style={[Styles.container, { backgroundColor: "#E5E5E5" }]}>
          <SettingHeader
            onPress={() => this.props.navigation.goBack()}
            title="PREFERENCES"
          />

          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              <Text style={Styles.settingHeadingText}>
                Intrested connections
              </Text>
              <View style={Styles.mainWhiteContainer}>
                {connectionType.map((item) => {
                  return (
                    <View style={Styles.rowContainer}>
                      <Text style={styles.normalText}>{item.title}</Text>
                      <TouchableOpacity
                        onPress={() => this.selectConnectType(item)}
                        style={
                          selectedConnectionType.some(
                            (value) => value.id == item.id
                          )
                            ? styles.rightSideCircleView
                            : styles.NotrightSideCircleView
                        }
                      />
                    </View>
                  );
                })}
              </View>
              <Text style={Styles.settingHeadingText}>Intrested in</Text>
              <View style={Styles.mainWhiteContainer}>
                {Interests.map((item) => {
                  return (
                    <View style={Styles.rowContainer}>
                      <Text style={styles.normalText}>{item.title}</Text>
                      <TouchableOpacity
                        onPress={() => this.selectInterestType(item)}
                        style={
                          this.state.interestArray.some(
                            (value) => value == item.id
                          )
                            ? styles.rightSideCircleView
                            : styles.NotrightSideCircleView
                        }
                      />
                    </View>
                  );
                })}
              </View>
              <Text style={Styles.settingHeadingText}>looking for</Text>
              <View style={Styles.mainWhiteContainer}>
                {Lookins.map((item) => {
                  return (
                    <View style={Styles.rowContainer}>
                      <Text style={styles.normalText}>{item.title}</Text>
                      <TouchableOpacity
                        onPress={() => this.selectLookingType(item)}
                        style={
                          selectedLookingType.some(
                            (value) => value.id == item.id
                          )
                            ? styles.rightSideCircleView
                            : styles.NotrightSideCircleView
                        }
                      />
                    </View>
                  );
                })}
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
                  initialLowValue={this.props.user.user_age.min_age}
                  initialHighValue={this.props.user.user_age.max_age}
                  step={5}
                  floatingLabel
                  selectionColor="#5FAEB6"
                  blankColor="#E5E5E5"
                  renderThumb={renderThumb()}
                  renderRail={renderRail}
                  renderRailSelected={renderRailSelected}
                  renderLabel={renderLabel}
                  renderNotch={renderNotch}
                  onTouchEnd={(low, high) => {
                    this.setState({
                      needDataSave: true,
                    });
                  }}
                  onValueChanged={(low, high, fromUser) => {
                    this.setState({
                      LowAge: low,
                      heighAge: high,
                    });
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
                  <Text style={[Styles.settingHeadingText, { marginLeft: 0 }]}>
                    {this.state.LowAge}
                  </Text>
                  <Text style={[Styles.settingHeadingText, { marginLeft: 0 }]}>
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
                  initialLowValue={this.state.minDistance}
                  initialHighValue={this.state.maxDistance}
                  step={5}
                  selectionColor="#5FAEB6"
                  blankColor="#E5E5E5"
                  onTouchEnd={(low, high) => {
                    this.setState({
                      needDataSave: true,
                    });
                  }}
                  onValueChanged={(low, high, fromUser) => {
                    this.setState({
                      minDistance: low,
                      maxDistance: high,
                    });
                    // if (
                    //   low !== this.props.user.user_distance.min_distance ||
                    //   high !== this.props.user.user_distance.max_distance
                    // ) {
                    //   this.setState({
                    //     needDataSave: true,
                    //   });
                    // }
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
                  <Text style={[Styles.settingHeadingText, { marginLeft: 0 }]}>
                    {this.state.minDistance}
                  </Text>
                  <Text style={[Styles.settingHeadingText, { marginRight: 0 }]}>
                    {this.state.maxDistance}
                  </Text>
                </View>
                <View
                  style={{ width: "70%", alignSelf: "center", marginTop: 50 }}
                >
                  <Button
                    disabled={!this.state.needDataSave ? true : false}
                    text="Save"
                    backgroundColor={
                      !this.state.needDataSave ? "#717171" : "#5FAEB6"
                    }
                    Pressed={() => this.EditValue()}
                  />
                </View>
              </View>
            </ScrollView>
            <Modal
              onBackdropPress={() => {
                this.setState({
                  planModal: false,
                });
              }}
              onBackButtonPress={() => {
                this.setState({ planModal: false });
              }}
              transparent={true}
              isVisible={this.state.planModal}
              style={{ margin: 0 }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={[
                    Styles.modalContainer,
                    { height: 300, backgroundColor: "#fff" },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        planModal: false,
                      })
                    }
                    style={{ alignSelf: "flex-end" }}
                  >
                    <Image
                      source={require("../../assets/icons/Cancel.png")}
                      style={styles.closeIcon}
                    />
                  </TouchableOpacity>
                  <Image
                    source={require("../../assets/icons/togatherMainLogo.png")}
                    style={styles.logo}
                  />
                  <View
                    style={{
                      flex: 1,
                      // backgroundColor: "#f00",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#000",
                        fontFamily: font.Medium,
                        textAlign: "center",
                        fontSize: 18,
                      }}
                    >
                      Update Succussfully
                    </Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          planModal: false,
                        });
                      }}
                      style={[
                        styles.buttonContainer,
                        {
                          backgroundColor: "#416181",
                          height: 50,
                          width: "45%",
                          // marginRight: 15,
                        },
                      ]}
                    >
                      <Text style={[styles.buttonText, { color: "#fff" }]}>
                        OK
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
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

  NotrightSideCircleView: {
    width: 25,
    height: 25,
    borderRadius: 10,
    backgroundColor: "#C4C4C4",
  },
  planContainer: {
    width: "28%",
    height: 100,
    backgroundColor: "#c4c4c4c4",
    borderRadius: 10,
    marginTop: "10%",
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 10,
    height: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: font.Bold,
    color: "#416181",
    fontSize: 20,
  },
  closeIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  logo: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
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
export default connect(mapStateToProps, mapDispatchToProps)(Preference);

// export default Preference;
