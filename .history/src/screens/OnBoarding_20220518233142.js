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
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../Store/Action/user.action.js";
import { Loader } from "../components/Loader";
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
    console.log(this.props.user.profile_pic);
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
              <Text style={styles.headingText}>{this.props.user.name}</Text>
              <Text
                style={[
                  styles.headingText,
                  {
                    fontSize: 18,

                    fontFamily: font.Medium,
                  },
                ]}
              >
                Nice to meet you : )
              </Text>
            </View>

            <Image
              source={
                this.props.user.profile_image?.images.url
                  ? { uri: this.props.user.profile_image?.images.url }
                  : require("../../assets/images/dummyUser.png")
              }
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
              Pressed={() => {
                request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
                  console.log(result);
                });
                this.props.navigation.navigate("RecordBio", {
                  isGoback: false,
                });
              }}
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
    // resizeMode: "contain",
    borderRadius: 40,
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

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);

// export default OnBoarding;
