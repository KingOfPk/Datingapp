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
  Platform,
  Linking,
  Alert,
} from "react-native";
import LottieView from "lottie-react-native";
import Button from "../components/Button";
import color from "color";
import { font } from "../components/fonts";
import { SetAddress } from "../Store/Action/Data.action";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader } from "../components/Loader";
class AllowLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      isloading: true,
    };
    this.timeout = null;
  }

  componentDidMount = () => {
    this.CheckLocation();
  };

  CheckLocation = () => {
    if (Platform.OS == "ios") {
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log("UNAVAILABLE");
              this.setState({
                isloading: false,
              });
              break;
            case RESULTS.DENIED:
              console.log("DENIED");

              this.setState({
                isloading: false,
              });
              break;
            case RESULTS.GRANTED:
              console.log("GRANTED");
              this.SetLocation();
              break;
            case RESULTS.BLOCKED:
              console.log("BLOCKED");
              this.setState({
                isloading: false,
              });
              break;
          }
        })
        .catch((error) => {
          // …
        });
    } else {
      check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log("UNAVAILABLE");
              this.setState({
                isloading: false,
              });
              break;
            case RESULTS.DENIED:
              console.log("DENIED");
              this.setState({
                isloading: false,
              });
              break;
            case RESULTS.GRANTED:
              console.log("GRANTED");
              this.SetLocation();
              break;
            case RESULTS.BLOCKED:
              console.log("BLOCKED");
              this.setState({
                isloading: false,
              });
              break;
          }
        })
        .catch((error) => {
          // …
        });
    }
  };

  AllowLocation = async () => {
    if (Platform.OS == "ios") {
      // try {
      //   Geolocation.requestAuthorization();
      //   this.SetLocation();
      // } catch (error) {
      //   Linking.openURL("app-settings:");
      // }
      const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(
        (result) => {
          console.log(result);
          this.SetLocation();
        }
      );
      console.log(granted);
      if (granted === RESULTS.DENIED || granted === RESULTS.BLOCKED) {
        Linking.openURL("app-settings:");
      } else {
        this.SetLocation();
      }
    } else {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
        console.log(result);
        this.SetLocation();
      });
    }
  };

  SetLocation = () => {
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
        this.setState({
          isloading: false,
        });
        this.props.navigation.navigate("LoginScreen");
        var position = value.position;
        var blankArray = [];
      });
      // });
    });
  };

  render() {
    return this.state.isloading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: "#F9F9F9",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 0.5,
            borderColor: "#C4C4C4",
          }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#F2F2F2",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/icons/Marker.png")}
              style={{ width: 40, height: 40 }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 60,
            marginTop: 120,
            //   backgroundColor: '#f00',
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "75%" }}>
            <Button
              icon={""}
              text="ALLOW LOCATION"
              Pressed={() => this.AllowLocation()}
            />
          </View>
        </View>
        <View style={{ width: "75%", marginTop: 30, padding: 15 }}>
          <Text
            style={{
              color: "#ACABB4",
              fontFamily: font.Medium,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            You need to enable the location in order to use the app
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
      SetAddress,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(AllowLocation);
// export default AllowLocation;
