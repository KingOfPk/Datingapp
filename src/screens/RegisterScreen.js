import React, { Component } from "react";
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
  SafeAreaView,
} from "react-native";
import LottieView from "lottie-react-native";
import Button from "../components/Button";
import color from "color";
import { font } from "../components/fonts";
// import { SafeAreaView } from "react-native-safe-area-context";
import { Picker, DateTimePicker, Colors } from "react-native-ui-lib";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ImagePicker from "react-native-image-crop-picker";
import RNFS from "react-native-fs";
import Toast from "react-native-simple-toast";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../Store/Action/User.action";
import { Loader } from "../components/Loader";
import moment from "moment";
class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGender: "male",
      selectedPreference: "male",
      imageUri: "",
      name: "",
      DOB: "",
      imageUri: "",
      isloading: false,
    };
    this.timeout = null;
  }

  componentDidMount = () => {};

  selectPhotoTapped = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 400,
      cropping: true,
      multiple: true,
    }).then((response) => {
      console.log(response);

      this.setState({
        ImageArray: response,
      });
      response.map((value) => {
        console.log(value);

        RNFS.readFile(value.path, "base64").then((res) => {
          console.log(res);
          this.setState({
            imageUri: "data:image/png;base64," + res,
          });
        });
      });
    });
  };

  Register = () => {
    if (this.state.name == "") {
      Toast.show("Enter your name", Toast.LONG);
    } else if (this.state.DOB == "") {
      Toast.show("Enter your Date of birth", Toast.LONG);
    } else {
      var data = JSON.stringify({
        user: {
          phone: this.props.route.params.mobile,
          name: this.state.name,
          dob: this.state.DOB,
          preference_of_interests: this.state.selectedPreference,
          gender: this.state.selectedGender,
          profile_pic: this.state.imageUri,
        },
      });

      this.setState({
        isloading: true,
      });

      var config = {
        method: "post",
        url: `${baseurl}/api/v1/sessions/signup`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(async (response) => {
          console.log(JSON.stringify(response.data));
          var res = response.data;

          if (res.status) {
            await AsyncStorage.setItem("userToken", res.data.token);
            await AsyncStorage.setItem("userID", res.data.id.toString());
            this.props.getUserDetail(res.data);
            this.props.navigation.navigate("OnBoarding");
          }
          this.setState({
            isloading: false,
          });
          // this.props.navigation.navigate("RegisterScreen");
        })
        .catch((error) => {
          console.log(error.response);

          this.setState({
            isloading: false,
          });
        });
    }
  };

  renderCustomInput = (props, toggle) => {
    const { value } = props;
    return (
      <TouchableOpacity
        flex
        row
        spread
        onPress={() => {
          toggle(true);
        }}
        style={{
          width: "100%",
          // backgroundColor: "#ff0",
          height: 35,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Text>Valid from</Text> */}
        <Text
          style={{ fontSize: 18, fontFamily: font.Bold }}
          absR
          color={Colors.primary}
          text80BO
        >
          {this.getCustomInputValue(value)}
        </Text>
      </TouchableOpacity>
    );
  };
  getCustomInputValue = (value) => {
    if (!value) {
      return "Select Date";
    }
    return value.includes(new Date().getFullYear() + 1) ? "Next Year" : value;
  };

  SelectedDate = (date) => {
    var time = moment(date).format("DD/MM/YYYY");
    this.setState({ DOB: time });
  };

  render() {
    const { selectedGender, selectedPreference } = this.state;
    return this.state.isloading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        <SafeAreaView style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              padding: 15,
              height: 60,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require("../../assets/icons/back.png")}
                style={{ height: 30, width: 30 }}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView extraScrollHeight={100}>
            {this.state.imageUri == "" ? (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 15,
                  marginTop: 15,
                }}
              >
                <TouchableOpacity onPress={this.selectPhotoTapped}>
                  <Image
                    source={require("../../assets/images/images.png")}
                    style={{ width: 150, height: 150 }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: "#ACABB4;",
                    fontFamily: font.Medium,
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Upload the picture from Gallery or take a pic from camera
                </Text>
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 15,
                  marginTop: 15,
                }}
              >
                <Image
                  source={{ uri: this.state.imageUri }}
                  style={{ width: "100%", height: 200 }}
                />
              </View>
            )}

            <View style={{ width: "100%", padding: 15 }}>
              <View style={styles.inputContainer}>
                <Text style={{ fontSize: 16, fontFamily: font.Light }}>
                  Name
                </Text>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    placeholder=""
                    placeholderTextColor="#000"
                    style={styles.inputTextStyle}
                    onChangeText={(text) =>
                      this.setState({
                        name: text,
                      })
                    }
                  />
                  {/* <Image
                source={require('../../assets/icons/Mobile2.png')}
                style={{width: 30, height: 30}}
              /> */}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={{ fontSize: 16, fontFamily: font.Light }}>
                  Date of Birth
                </Text>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <TextInput
                    placeholder=""
                    placeholderTextColor="#000"
                    style={styles.inputTextStyle}
                    onChangeText={(text) =>
                      this.setState({
                        DOB: text,
                      })
                    }
                  /> */}
                  <DateTimePicker
                    containerStyle={[styles.inputTextStyle, { height: 35 }]}
                    title={""}
                    maximumDate={new Date()}
                    placeholder={""}
                    renderInput={this.renderCustomInput}
                    dateFormat={"DD/MM/YYYY"}
                    onChange={(date) => this.SelectedDate(date)}
                    // value={new Date('2015-03-25T12:00:00-06:30')}
                  />
                  <Image
                    source={require("../../assets/icons/Mobile2.png")}
                    style={{ width: 30, height: 30 }}
                  />
                </View>
              </View>
              <View style={styles.inputContainer2}>
                <Text style={{ fontSize: 16, fontFamily: font.Light }}>
                  Gender
                </Text>
                <View style={styles.genderRowContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        selectedGender: "male",
                      });
                    }}
                    style={[
                      styles.genderContainer,
                      {
                        borderColor:
                          selectedGender == "male" ? "#5FAEB6" : "#ccc",
                        borderWidth: 2,
                      },
                    ]}
                  >
                    <Text style={styles.genderText}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        selectedGender: "female",
                      });
                    }}
                    style={[
                      styles.genderContainer,
                      {
                        borderColor:
                          selectedGender == "female" ? "#5FAEB6" : "#ccc",
                        borderWidth: 2,
                      },
                    ]}
                  >
                    <Text style={styles.genderText}>Female</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer2}>
                <Text style={{ fontSize: 16, fontFamily: font.Light }}>
                  Preference of Interest
                </Text>
                <View style={styles.genderRowContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        selectedPreference: "male",
                      });
                    }}
                    style={[
                      styles.genderContainer,
                      {
                        borderColor:
                          selectedPreference == "male" ? "#5FAEB6" : "#ccc",
                        borderWidth: 2,
                      },
                    ]}
                  >
                    <Text style={styles.genderText}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        selectedPreference: "female",
                      });
                    }}
                    style={[
                      styles.genderContainer,
                      {
                        borderColor:
                          selectedPreference == "female" ? "#5FAEB6" : "#ccc",
                        borderWidth: 2,
                      },
                    ]}
                  >
                    <Text style={styles.genderText}>Female</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                width: "100%",
                height: 60,
                marginTop: 50,
                //   backgroundColor: '#f00',
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <View style={{ width: "75%" }}>
                <Button
                  icon={""}
                  text="CONTINUE"
                  Pressed={() => this.Register()}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
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
  headerText: {
    fontSize: 120,
    width: "100%",
    textAlign: "center",
    color: "white",
  },
  headerdescription: {
    marginTop: 20,
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
  categoryIconStyle: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderColor: "#ACABB4",
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
  inputContainer2: {
    width: "100%",
    // height: 70,
    // borderWidth: 1,
    borderColor: "#ACABB4",
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
  inputTextStyle: {
    flex: 1,
    height: 40,
    fontSize: 18,

    fontFamily: font.Bold,
  },
  genderRowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  genderContainer: {
    width: 120,
    height: 40,
    borderColor: "#ccc",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  genderText: {
    fontFamily: font.Bold,
    color: "#406284",
  },
});

function mapStateToProps(state) {
  console.log(state);
  return {
    Address: state.Data.address,
    // user: state.user,
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

// export default RegisterScreen;
