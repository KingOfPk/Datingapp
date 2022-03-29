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
  AsyncStorage,
} from "react-native";
import Styles from "../components/CommanStyle";
import { font } from "../components/fonts";
import Footer from "../components/Footer";
import SettingHeader from "../components/SettingHeader";
import { Loader } from "../components/Loader";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Toast from "react-native-simple-toast";
import { getUserDetail } from "../Store/Action/user.action.js";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Signout = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/sessions/signout`,
      headers: {
        token: token,
      },
    };

    axios(config)
      .then(async (response) => {
        console.log(JSON.stringify(response.data));
        await AsyncStorage.removeItem("userToken");
        // this.props.getUserDetail({});
        Toast.show("Sign out succussfully", Toast.LONG);
        this.props.navigation.navigate("SplashScreen");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                    source={
                      this.props.user.profile_image?.images.url
                        ? { uri: this.props.user.profile_image?.images.url }
                        : require("../../assets/images/profile.png")
                    }
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
                      {this.props.user.name} {this.props.user.last_name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: font.Regular,

                        color: "rgba(0, 0, 0, 0.81)",
                        left: 10,
                        paddingVertical: 5,
                      }}
                    >
                      {this.props.user.phone}
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
                <TouchableOpacity
                  onPress={this.Signout}
                  style={styles.settingLinksContainer}
                >
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
export default connect(mapStateToProps, mapDispatchToProps)(Setting);

// export default Setting;
