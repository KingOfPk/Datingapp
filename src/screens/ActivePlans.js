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
import { font } from "../components/fonts";
import Footer from "../components/Footer";
import SettingHeader from "../components/SettingHeader";
import Styles from "../components/CommanStyle";
import { TextInput } from "react-native-gesture-handler";
import Button from "../components/Button";

class ActivePlans extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView>
        <View style={Styles.container}>
          <SettingHeader
            title="PURCHASE"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />

          <View style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.headingContainer}>
                <Text style={Styles.settingHeadingText}>Your Active Plan</Text>
              </View>

              <View
                style={[
                  Styles.rowContainer,
                  { alignSelf: "center", width: "90%", marginTop: 25 },
                ]}
              >
                <Image
                  source={require("../../assets/images/profile.png")}
                  borderRadius={45}
                  style={styles.profileImage}
                />
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 10,
                  }}
                >
                  <Text style={Styles.settingHeadingText}>
                    Alica Silverstone Simith
                  </Text>
                  <Text
                    style={{
                      fontFamily: font.Regular,

                      color: "rgba(0, 0, 0, 0.81)",
                      left: 10,
                      paddingVertical: 5,
                    }}
                  >
                    London, United Kingdom
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                  height: 120,
                  borderRadius: 10,
                  //   paddingHorizontal: 10,
                  backgroundColor: "#406284",
                  marginTop: 50,
                }}
              >
                <View style={[Styles.rowContainer, { width: "100%" }]}>
                  <Text
                    style={{
                      fontFamily: font.Medium,
                      color: "#fff",
                      fontSize: 18,
                      left: 10,
                    }}
                  >
                    Plan Name
                  </Text>
                  <Image
                    source={require("../../assets/icons/bookmark.png")}
                    style={{
                      width: 35,
                      height: 30,
                      resizeMode: "contain",
                      marginTop: -20,
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: font.Regular,
                    color: "#5FAEB6",
                    fontSize: 12,
                    left: 10,
                  }}
                >
                  Expire On: 22 May,2022
                </Text>
              </View>
            </ScrollView>
            <Footer
              // selectedIcon="Setting"
              homePress={() => this.props.navigation.navigate("HomeScreen")}
              likePress={() => this.props.navigation.navigate("LikeScreen")}
              preferencePress={() =>
                this.props.navigation.navigate("Preference")
              }
              settingPress={() => this.props.navigation.navigate("Setting")}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    width: "100%",
    // paddingVertical: 5,
    backgroundColor: "#E5E5E5",
  },
  profileImage: {
    width: 90,
    resizeMode: "cover",
    height: 90,
    borderWidth: 4,
    borderColor: "#406284",
  },
});

export default ActivePlans;
