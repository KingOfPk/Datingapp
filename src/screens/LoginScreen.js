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
    };
    this.timeout = null;
  }

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
        <ScrollView style={{ width: "100%", height: "100%" }}>
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
                <Picker
                  showSearch={true}
                  // placeholderTextColor={numberVarified ? "#666" : "#ddd"}

                  style={{
                    height: 40,
                    paddingLeft: 5,
                    color: "#000",
                    fontFamily: font.Bold,
                    fontSize: 18,
                    width: "90%",
                  }}
                  topBarProps={{ title: "Languages" }}
                  listProps={{ keyboardShouldPersistTaps: "always" }}
                  hideUnderline
                  placeholderTextColor="#000"
                  placeholder={"United Kingdom"}
                  // value={CatList}
                  onChange={(items) => this.SelectedCategory(items, index)}
                  // mode={Picker.modes.MULTI}
                  topBarProps={"COUNTRY"}
                  // rightIconSource={require('../../assets/icons/chevron-down.png')}
                >
                  {this.state.allCategory.map((item, index) => (
                    <Picker.Item
                      isSelected={true}
                      selectedIconColor="#000"
                      // disabled={CatList.some((itm) => itm == item.label)}
                      // key={index}
                      value={{
                        label: item.label,
                        value: item.value,
                      }}
                    />
                  ))}
                </Picker>
                <Image
                  source={require("../../assets/icons/chevron-down.png")}
                  style={{ width: 30, height: 30 }}
                />
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
                  placeholder="9999290377"
                  placeholderTextColor="#000"
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
                fontFamily: font.SemiBold,
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
                text="CONTINUE"
                Pressed={() => this.props.navigation.navigate("OtpScreen")}
              />
            </View>
          </View>
        </ScrollView>
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
  inputTextStyle: {
    flex: 1,
    height: 40,
    fontSize: 18,
    fontWeight: "600",
    fontFamily: font.Bold,
  },
});

export default LoginScreen;
