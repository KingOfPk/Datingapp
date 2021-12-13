import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Styles from "../components/CommanStyle";
import { font } from "../components/fonts";
import Footer from "../components/Footer";
import SettingHeader from "../components/SettingHeader";
import LikeTabs from "./TabPages/LikeTab";

class LikeScreen extends Component {
  state = {};
  render() {
    return (
      <SafeAreaView>
        <View style={Styles.container}>
          <View
            style={{
              width: "100%",
              height: 80,
              paddingHorizontal: 10,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // height: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Setting")}
              >
                <Image
                  source={require("../../assets/images/Rectangle.png")}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: font.Bold,
                  fontSize: 24,
                  color: "#416181",
                }}
              >
                <Text style={{ color: "#5FAEB6" }}>Together</Text> Again
              </Text>
              {/* <View>
                <Text
                  style={{
                    fontFamily: font.Bold,
                    fontSize: 24,
                    color: "#416181",
                  }}
                >
                  <Text style={{ color: "#5FAEB6" }}>Together</Text> Again
                </Text>
                <Text
                  style={{
                    color: "#A2A2AC",
                    fontFamily: font.Regular,
                    textAlign: "center",
                    fontSize: 10,
                  }}
                >
                  Reconnecting Loved Ones
                </Text>
              </View> */}
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ChatUserList");
                }}
              >
                <Image
                  source={require("../../assets/icons/Chat.png")}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, backgroundColor: "red" }}>
            <LikeTabs />
          </View>
          <Footer
            selectedIcon="Like"
            homePress={() => this.props.navigation.navigate("HomeScreen")}
            likePress={() => this.props.navigation.navigate("LikeScreen")}
            preferencePress={() => this.props.navigation.navigate("Preference")}
            settingPress={() => this.props.navigation.navigate("Setting")}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default LikeScreen;
