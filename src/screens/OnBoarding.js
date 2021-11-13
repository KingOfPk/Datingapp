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
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";
import Button from "../components/Button";
import color from "color";
import { font } from "../components/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "react-native-ui-lib";
import { fonts } from "react-native-elements/dist/config";
const { width, height } = Dimensions.get("window");
class OnBoarding extends Component {
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
        <View
          style={{
            width: "100%",
            height: "30%",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.headingText}>Steven,</Text>
              <Text
                style={[
                  styles.headingText,
                  {
                    fontSize: 18,
                    fontWeight: "400",
                    fontFamily: font.SemiBold,
                  },
                ]}
              >
                Nice to meet you : )
              </Text>
            </View>

            <Image
              source={require("../../assets/images/dummyUser.png")}
              style={styles.userImage}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "70%",
            backgroundColor: "#5FAEB6",
            borderTopRightRadius: width * 0.6,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              width: "100%",
              height: "55%",
              // backgroundColor: "green",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                width: "80%",
                fontSize: 35,
                fontFamily: font.Bold,
                color: "#fff",
                // lineHeight: 40,
              }}
            >
              Please help us to build up a profile of what you are looking for.
            </Text>
          </View>
          <View
            style={{
              width: "70%",
              height: 10,
              backgroundColor: "#406284",
              marginTop: 20,
            }}
          ></View>
          <View
            style={{
              width: "85%",
              paddingTop: "20%",
            }}
          >
            <Button
              backgroundColor="#fff"
              textColor="#406284"
              text="CONTINUE"
              Pressed={() => this.props.navigation.navigate("RecordBio")}
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
  headingText: {
    fontFamily: font.Bold,
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
    resizeMode: "contain",
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
});

export default OnBoarding;
