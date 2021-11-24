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
class SplashScreen extends Component {
  componentDidMount = () => {};

  render() {
    return (
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
                Pressed={() => this.props.navigation.navigate("AllowLocation")}
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

export default SplashScreen;
