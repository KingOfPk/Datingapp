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
import { getUserDetail } from "../Store/Action/user.action.js";
import { Loader } from "../components/Loader";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";
import Modal from "react-native-modal";
import Styles from "../components/CommanStyle";
class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGender: "male",
      selectedPreference: "male",
      imageUri: "",
      name: "",
      lastName: "",
      DOB: "",
      imageUri: "",
      isloading: false,
      planModal: false,
      message: "",
    };
    this.timeout = null;
  }

  componentDidMount = () => {
    console.log(this.props.Address);
  };

  selectPhotoTapped = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      compressImageMaxHeight: 1000,
      compressImageMaxWidth: 1000,
      cropping: true,
      mediaType: "photo",
      multiple: false,
    }).then((response) => {
      console.log(response);

      this.setState({
        ImageArray: response,
      });
      RNFS.readFile(response.path, "base64").then((res) => {
        console.log(res);
        this.setState({
          imageUri: "data:image/png;base64," + res,
        });
      });
      // response.map((value) => {
      //   console.log(value);

      // });
    });
  };

  Register = () => {
    if (this.state.name == "") {
      Toast.show("Enter your name", Toast.LONG);
    } else if (this.state.DOB == "") {
      Toast.show("Enter your Date of birth", Toast.LONG);
    } else if (this.state.lastName == "") {
      Toast.show("Enter your last name", Toast.LONG);
    } else if (this.state.imageUri == "") {
      Toast.show("Upload your picture ", Toast.LONG);
    } else {
      var data = JSON.stringify({
        user: {
          phone: this.props.route.params.mobile,
          name: this.state.name,
          last_name: this.state.lastName,
          dob: this.state.DOB,
          preference_of_interests: this.state.selectedPreference,
          gender: this.state.selectedGender,
          profile_pic: this.state.imageUri,
          latitude: this.props.Address.position.lat,
          longitude: this.props.Address.position.lng,
        },
      });

      this.setState({
        isloading: true,
      });

      console.log(data);

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
            await AsyncStorage.setItem("isComplete", "true");
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
          var err = error.response.data;

          this.setState({
            isloading: false,
            planModal: true,
            message: err.message,
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
          style={{ fontSize: 18, fontFamily: font.Bold, color: "#000" }}
          absR
          color="#000"
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
    var currentTime = moment().format("DD/MM/YYYY");
    var DTime = moment(time, "DD/MM/YYYY");
    var CTime = moment(currentTime, "DD/MM/YYYY");
    const dateIsAfter = moment(time).isAfter(currentTime);
    var duration = moment.duration(CTime.diff(DTime));

    var days = duration.get("Days");
    var months = duration.get("Months");
    var years = duration.get("Years");

    if (years < 18) {
      alert("You are not 18 or more");
      this.setState({ DOB: "" });
    } else if (years > 100) {
      alert("The age must be less than 90 years");
    } else {
      this.setState({ DOB: time });
    }
  };

  render() {
    const { selectedGender, selectedPreference, message } = this.state;
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
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            extraScrollHeight={100}
          >
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
                  style={{ width: "100%", height: 400 }}
                />
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      imageUri: "",
                    })
                  }
                  style={{
                    width: 30,
                    height: 30,
                    // backgroundColor: "#f00",
                    borderRadius: 15,
                    position: "absolute",
                    top: 0,
                    right: 10,
                    backgroundColor: "#fff",
                  }}
                >
                  <Image source={require("../../assets/icons/Cancel2.png")} />
                </TouchableOpacity>
              </View>
            )}

            <View style={{ width: "100%", padding: 15 }}>
              <View style={styles.inputContainer}>
                <Text style={{ fontSize: 16, fontFamily: font.Light }}>
                  First Name
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
                    autoCorrect={false}
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
                  Last Name
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
                    autoCorrect={false}
                    style={styles.inputTextStyle}
                    onChangeText={(text) =>
                      this.setState({
                        lastName: text,
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
                    placeholder={""}
                    hideUnderline={true}
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
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={[
                Styles.modalContainer,
                { height: 300, backgroundColor: "#fff" },
              ]}
            >
              <TouchableOpacity style={{ alignSelf: "flex-end" }}>
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
                  {message}
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
                  <Text style={[styles.buttonText, { color: "#fff" }]}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
