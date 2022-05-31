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
} from "react-native";
import LottieView from "lottie-react-native";
import Button from "../components/Button";
import color from "color";
import { font } from "../components/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "react-native-ui-lib";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { baseurl } from "../utils/index";
import axios from "axios";
import Toast from "react-native-simple-toast";
import { Loader } from "../components/Loader";
import SoundPlayer from "react-native-sound-player";
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategory: [
        { label: "Sunday", value: 1 },
        { label: "10", value: 10 },
        { label: "20", value: 20 },
        { label: "30", value: 30 },
        { label: "40", value: 40 },
        { label: "50", value: 50 },
        { label: "60", value: 60 },
        { label: "70", value: 70 },
        { label: "80", value: 80 },
        { label: "90", value: 90 },
        { label: "100", value: 100 },
      ],
      number: "",

      isloading: false,
      isDisable: false,
    };

    this.timeout = null;
  }

  componentDidMount = () => {
    console.log(baseurl);
  };

  Login = () => {
    if (this.state.number == "") {
      Toast.show("Enter your phone number", Toast.LONG);
    } else {
      this.setState({
        isDisable: true,
      });
      var data = JSON.stringify({
        phone: this.state.number,
      });
      console.log(data);
      var config = {
        method: "post",
        url: `${baseurl}/api/v1/sessions/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log(config);
      axios(config)
        .then((response) => {
          console.log(response);
          this.props.navigation.navigate("OtpScreen", {
            data: this.state.number,
          });
        })
        .catch((error) => {
          console.log(error.response);
          this.setState({
            isDisable: false,
          });
          alert(error);
        });

      // this.props.navigation.navigate("OtpScreen");
    }
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
          extraScrollHeight={100}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ width: "100%", padding: 15 }}>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 16, fontFamily: font.Light }}>
                Country
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={[styles.inputTextStyle, { justifyContent: "center" }]}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: font.Bold,
                      color: "#000",
                    }}
                  >
                    {this.props.Address.country}
                  </Text>
                </View>
                {/* <Image
                  source={require("../../assets/icons/chevron-down.png")}
                  style={{ width: 30, height: 30 }}
                /> */}
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 16, fontFamily: font.Light }}>
                Mobile Number
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  keyboardType="number-pad"
                  placeholder=""
                  placeholderTextColor="#000"
                  maxLength={11}
                  onChangeText={(text) =>
                    this.setState({
                      number: text,
                    })
                  }
                  style={styles.inputTextStyle}
                />
                <Image
                  source={require("../../assets/icons/Mobile2.png")}
                  style={{ width: 30, height: 30 }}
                />
              </View>
            </View>
          </View>
          <View style={{ width: "100%", marginTop: 30, padding: 15 }}>
            <Text
              style={{
                color: "#ACABB4",
                fontFamily: font.Medium,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              We need your mobile number to get you register or signin
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 60,
              marginTop: 50,
              //   backgroundColor: '#f00',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "75%", height: 120 }}>
              <Button
                disabled={this.state.isDisable}
                text="CONTINUE"
                Pressed={() => this.Login()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
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
  inputTextStyle: {
    flex: 1,
    height: 40,
    fontSize: 18,
    color: "#000",
    fontFamily: font.Bold,
  },
});

function mapStateToProps(state) {
  console.log(state);
  return {
    Address: state.Data.address,
    // user: state.user,
  };
}

export default connect(mapStateToProps)(LoginScreen);

// export default LoginScreen;
