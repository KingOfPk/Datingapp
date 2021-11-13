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
import { Picker } from "react-native-ui-lib";
class RegisterScreen extends Component {
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
      selectedGender: "",
      selectedPreference: "",
    };
    this.timeout = null;
  }

  componentDidMount = () => {};

  render() {
    const { selectedGender, selectedPreference } = this.state;
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
        <View style={{ flex: 1 }}>
          <ScrollView>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
                marginTop: 15,
              }}
            >
              <TouchableOpacity>
                <Image
                  source={require("../../assets/images/images.png")}
                  style={{ width: 150, height: 150 }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: "#ACABB4",
                  fontFamily: font.SemiBold,
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Upload the picture from Gallery or take a pic from camera
              </Text>
            </View>
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
                    placeholder="Steven Turnbull"
                    placeholderTextColor="#000"
                    style={styles.inputTextStyle}
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
                  <TextInput
                    placeholder="09/Sep/1995"
                    placeholderTextColor="#000"
                    style={styles.inputTextStyle}
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
                        selectedGender: "Male",
                      });
                    }}
                    style={[
                      styles.genderContainer,
                      {
                        borderColor:
                          selectedGender == "Male" ? "#406284" : "#ccc",
                      },
                    ]}
                  >
                    <Text style={styles.genderText}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        selectedGender: "Female",
                      });
                    }}
                    style={[
                      styles.genderContainer,
                      {
                        borderColor:
                          selectedGender == "Female" ? "#406284" : "#ccc",
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
                        selectedPreference: "Male",
                      });
                    }}
                    style={[
                      styles.genderContainer,
                      {
                        borderColor:
                          selectedPreference == "Male" ? "#406284" : "#ccc",
                      },
                    ]}
                  >
                    <Text style={styles.genderText}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        selectedPreference: "Female",
                      });
                    }}
                    style={[
                      styles.genderContainer,
                      {
                        borderColor:
                          selectedPreference == "Female" ? "#406284" : "#ccc",
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
                  Pressed={() => this.props.navigation.navigate("OnBoarding")}
                />
              </View>
            </View>
          </ScrollView>
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
    fontWeight: "600",
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

export default RegisterScreen;
