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

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView>
        <View style={Styles.container}>
          <SettingHeader
            title="SETTINGS"
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
                <Text style={Styles.settingHeadingText}>Your Profile</Text>
              </View>

              <View style={Styles.mainWhiteContainer}>
                <View style={Styles.rowContainer}>
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
                        fontWeight: "400",
                        color: "rgba(0, 0, 0, 0.81)",
                        left: 10,
                        paddingVertical: 5,
                      }}
                    >
                      London, United Kingdom
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("EditProfile");
                      }}
                      style={styles.editProfileButton}
                    >
                      <Text
                        style={{
                          fontFamily: font.Bold,
                          color: "#fff",
                          fontSize: 15,
                        }}
                      >
                        EDIT PROFILE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.headingContainer}>
                <Text style={Styles.settingHeadingText}>Your Choices</Text>
              </View>

              <View style={Styles.mainWhiteContainer}>
                <View style={Styles.rowContainer}>
                  <Text style={styles.normalText}>Preferences </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("Preference");
                    }}
                    style={[
                      styles.editProfileButton,
                      { width: "30%", marginTop: 0 },
                    ]}
                  >
                    <Text
                      style={{
                        fontFamily: font.Bold,
                        color: "#fff",
                        fontSize: 15,
                      }}
                    >
                      CHANGE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.headingContainer}>
                <Text style={Styles.settingHeadingText}>Settings</Text>
              </View>

              <View>
                <TouchableOpacity style={styles.settingLinksContainer}>
                  <Text style={[styles.normalText]}>Privacy </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingLinksContainer}>
                  <Text style={[styles.normalText]}>Disable Account </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("ActivePlans")}
                  style={styles.settingLinksContainer}
                >
                  <Text style={[styles.normalText]}>Purchases </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.settingLinksContainer}>
                  <Text style={[styles.normalText]}>Sign out </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <Footer
            selectedIcon="Setting"
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

const styles = StyleSheet.create({
  headingContainer: {
    width: "100%",
    // paddingVertical: 5,
    backgroundColor: "#E5E5E5",
  },
  normalText: {
    fontFamily: font.Regular,
    color: "#000000",
    fontSize: 18,
  },
  profileImage: {
    width: 90,
    resizeMode: "cover",
    height: 90,
    borderWidth: 4,
    borderColor: "#406284",
  },
  editProfileButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#416181",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  settingLinksContainer: {
    width: "100%",
    height: 45,
    justifyContent: "center",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#C4C4C4",
  },
});

export default Setting;
