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
import OtpInputs from "react-native-otp-inputs";
class OtpScreen extends Component {
  componentDidMount = () => {};

  render() {
    return (
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
        <View style={{ width: "100%", padding: 15 }}>
          <View style={{ width: "100%", marginTop: 10 }}>
            <Text
              style={{
                color: "#ACABB4",
                fontFamily: font.SemiBold,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Please enter 4-Digit OTP Sent to +44 9999290377
            </Text>
          </View>
          <View style={{ width: "100%", marginTop: 30 }}>
            <Text
              style={{
                color: "#ACABB4",
                fontFamily: font.SemiBold,
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
            height: 60,
            marginTop: 50,
            //   backgroundColor: '#f00',
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "75%" }}>
            <Button
              icon={""}
              text="ACCEPT"
              Pressed={() => this.props.navigation.navigate("RegisterScreen")}
            />
          </View>
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
    fontWeight: "bold",
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
});

export default OtpScreen;
