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
} from "react-native";
import LottieView from "lottie-react-native";
import Button from "../components/Button";
import color from "color";
import { font } from "../components/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import OtpInputs from "react-native-otp-inputs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Loader } from "../components/Loader";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Toast from "react-native-simple-toast";
import Modal from "react-native-modal";
import Styles from "../components/CommanStyle";
import { getUserDetail } from "../Store/Action/user.action.js";
class OtpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      number: "",
      isloading: false,
      planModal: false,
      errorText: "e",
    };
    this.timeout = null;
  }

  componentDidMount = () => {};

  CheckOtp = () => {
    var data = JSON.stringify({
      otp: this.state.code,
      phone: this.props.route.params.data,
    });

    this.setState({
      isloading: true,
    });

    var config = {
      method: "post",
      url: `${baseurl}/api/v1/sessions/check_otp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(async (response) => {
        console.log(response.data);
        var res = response.data;
        if (res.user_type && res.user_type == "new_user") {
          this.props.navigation.navigate("RegisterScreen", {
            mobile: this.props.route.params.data,
          });
        } else {
          console.log(res.data);
          await AsyncStorage.setItem("userToken", res.data.token);
          await AsyncStorage.setItem("userID", res.data.id.toString());
          this.props.getUserDetail(res.data);
          console.log(res.data.bio_description == null);
          if (!res.data.is_bio) {
            console.log("Isbio");
            if (res.data.bio_description) {
              Toast.show("Login Succussfully", Toast.LONG);
              this.props.navigation.navigate("HomeScreen");
            } else {
              this.props.navigation.navigate("RecordBio", { isGoback: false });
            }
          } else if (!res.data.is_connection) {
            console.log("Isconnection");
            this.props.navigation.navigate("ChooseConnections");
          } else if (!res.data.is_interests) {
            console.log("Interes");
            this.props.navigation.navigate("ChooseInterest");
          } else if (!res.data.is_lookings) {
            console.log("Looking");
            this.props.navigation.navigate("ChooseLookingFor");
          } else if (!res.data.is_loves) {
            console.log("Love");
            this.props.navigation.navigate("ChooseHobby");
          } else if (!res.data.is_user_distance) {
            console.log("dsictance");
            this.props.navigation.navigate("ChooseAgeOrDistance");
          } else {
            Toast.show("Login Succussfully", Toast.LONG);
            this.props.navigation.navigate("HomeScreen");
          }
        }
        this.setState({
          isloading: false,
        });
        // this.props.navigation.navigate("RegisterScreen");
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isloading: false,
          planModal: true,
        });
        // Toast.show("Enter your correct otp", Toast.LONG);
        // alert("Enter your correct otp");
      });
    // this.props.navigation.navigate("RegisterScreen");
  };

  render() {
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
        <KeyboardAwareScrollView
          extraScrollHeight={220}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ width: "100%", padding: 15 }}>
            <View style={{ width: "100%", marginTop: 10 }}>
              <Text
                style={{
                  color: "rgba(0, 0, 0, 0.82);",
                  fontFamily: font.Medium,
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Please enter 4-Digit OTP Sent to {"\n"} +44{" "}
                {this.props.route.params.data}
              </Text>
            </View>
            <View style={{ width: "100%", marginTop: 30 }}>
              <Text
                style={{
                  color: "#406284",
                  fontFamily: font.Medium,
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Resend OTP
              </Text>
            </View>
            <View
              style={{
                width: "90%",
                height: 100,
                marginTop: 50,
                alignSelf: "center",
              }}
            >
              <OtpInputs
                inputStyles={[
                  {
                    width: "100%",
                    textAlign: "center",
                    color: "#FE3760",
                    fontSize: 20,
                    color: "#000",
                    fontFamily: font.Bold,
                  },
                ]}
                unfocusedBorderColor="transparent"
                inputContainerStyles={[
                  {
                    // backgroundColor: '#F0F1F2',
                    borderWidth: 0.8,
                    borderColor: "#ACABB4",
                    height: 60,
                    width: 60,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
                handleChange={(code) => this.setState({ code: code })}
                numberOfInputs={4}
              />
            </View>
          </View>

          <View
            style={{
              width: "100%",
              height: 120,
              marginTop: 50,
              //   backgroundColor: '#f00',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "75%" }}>
              <Button text="ACCEPT" Pressed={() => this.CheckOtp()} />
            </View>
          </View>
        </KeyboardAwareScrollView>
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
                  Enter your correct otp
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
export default connect(mapStateToProps, mapDispatchToProps)(OtpScreen);
// export default OtpScreen;
