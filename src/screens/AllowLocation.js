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
import color from "color";
import { font } from "../components/fonts";
class AllowLocation extends Component {
  componentDidMount = () => {};

  render() {
    return (
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
              Pressed={() => this.props.navigation.navigate("LoginScreen")}
            />
          </View>
        </View>
        <View style={{ width: "75%", marginTop: 30, padding: 15 }}>
          <Text
            style={{
              color: "#ACABB4",
              fontFamily: font.SemiBold,
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
});

export default AllowLocation;
