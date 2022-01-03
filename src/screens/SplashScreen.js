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
} from "react-native";
import LottieView from "lottie-react-native";
import Button from "../components/Button";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader } from "../components/Loader";
import Toast from "react-native-simple-toast";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoder";
import { getUserDetail } from "../Store/Action/user.action.js";
import { SetAddress } from "../Store/Action/Data.action";
class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      number: "",
      isloading: false,
    };
    this.timeout = null;
  }
  componentDidMount = () => {};

  MoveToLogin = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var isComplete = await AsyncStorage.getItem("isComplete");
    console.log(token && !isComplete, token, !isComplete);
    if (token && !isComplete) {
      console.log(token);
      this.setState({
        isloading: true,
      });
      var config = {
        method: "get",
        url: `${baseurl}/api/v1/profile`,
        headers: {
          token: token,
        },
      };
      axios(config)
        .then((response) => {
          console.log(response);
          var res = response.data;
          if (res.status) {
            this.setState({
              isloading: false,
            });
            this.props.getUserDetail(res.data);
            this.setLoction();
            // this.props.navigation.navigate("HomeScreen");
          }
        })
        .catch((error) => {
          this.setState({
            isloading: false,
          });
          this.props.navigation.navigate("AllowLocation");
        });
    } else {
      this.props.navigation.navigate("AllowLocation");
    }
  };

  setLoction = () => {
    // this.props.navigation.navigate("HomeScreen");
    try {
      Geolocation.getCurrentPosition((info) => {
        var cords = info.coords;
        var NY = {
          lat: cords.latitude,
          lng: cords.longitude,
        };

        console.log(NY);

        Geocoder.geocodePosition(NY).then((res) => {
          // res is an Array of geocoding object (see below)
          var value = res[0];
          console.log(value);
          this.props.SetAddress(value);
          this.props.navigation.navigate("HomeScreen");
          var position = value.position;
          var blankArray = [];
        });
        // });
      });
    } catch {
      (e) => {
        console.log(e);
      };
    }
  };

  render() {
    return this.state.isloading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/Splash.png")}
          style={{
            width: "100%",
            height: "100%",

            alignItems: "center",
            justifyContent: "flex-end",
            // padding: 20,
          }}
        >
          {/* <Image
            source={require('../../assets/LogoRound.png')}
            style={{width: 200, height: 200}}
          /> */}
          <View
            style={{
              width: "100%",
              height: 60,
              marginBottom: 30,
              //   backgroundColor: '#f00',
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "75%" }}>
              <Button
                icon={require("../../assets/icons/Mobile.png")}
                text="CONTINUE"
                Pressed={() => this.MoveToLogin()}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "##fff",
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
      SetAddress,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

// export default SplashScreen;
