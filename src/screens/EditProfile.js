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

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateName: false,
      updatedName: "",
      updateBio: false,
      updatedBio: "",
      updateMobile: false,
      UpdatedMobile: "",
    };
  }
  render() {
    const {
      updateBio,
      updateMobile,
      updateName,
      updatedBio,
      updatedName,
      updatedMobile,
    } = this.state;
    return (
      <SafeAreaView>
        <View style={Styles.container}>
          <SettingHeader
            title="PROFILE"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <Image
                resizeMode="cover"
                source={require("../../assets/images/profile.png")}
                style={{ width: "100%", height: 300, marginTop: 1 }}
              />
              <View style={{ padding: 10, width: "100%" }}>
                {/* update name */}
                <View style={Styles.rowContainer}>
                  <View style={{ flex: 1 }}>
                    {updateName ? (
                      <TextInput
                        onChangeText={(text) => {
                          this.setState({ updatedName: text });
                        }}
                        style={styles.inputContainer}
                        placeholder="Update Name"
                      />
                    ) : (
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        width={"95%"}
                        style={[styles.headingText, { textAlign: "justify" }]}
                      >
                        Alica Silverstone Simith
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      if (!updateName) {
                        this.setState({
                          updateName: true,
                        });
                      } else {
                        this.setState({
                          updateName: false,
                        });
                      }
                    }}
                  >
                    <Text style={styles.updateText}>
                      {updateName ? "Save" : "Update"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* update bio */}
                <View style={Styles.rowContainer}>
                  <View style={{ flex: 1 }}>
                    {updateBio ? (
                      <TextInput
                        onChangeText={(text) => {
                          this.setState({ updatedBio: text });
                        }}
                        style={styles.inputContainer}
                        placeholder="Update Bio"
                      />
                    ) : (
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={5}
                        width={"95%"}
                        style={[styles.headingText, { textAlign: "justify" }]}
                      >
                        Bio
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      if (!updateBio) {
                        this.setState({
                          updateBio: true,
                        });
                      } else {
                        this.setState({
                          updateBio: false,
                        });
                      }
                    }}
                  >
                    <Text style={styles.updateText}>
                      {updateBio ? "Save" : "Update"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* update mobile */}
                <View style={Styles.rowContainer}>
                  <View style={{ flex: 1 }}>
                    {updateMobile ? (
                      <TextInput
                        keyboardType="number-pad"
                        maxLength={10}
                        onChangeText={(text) => {
                          this.setState({ updatedMobile: text });
                        }}
                        style={styles.inputContainer}
                        placeholder="Mobile"
                      />
                    ) : (
                      <Text
                        style={[styles.headingText, { textAlign: "justify" }]}
                      >
                        Mobile Number
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      if (!updateMobile) {
                        this.setState({
                          updateMobile: true,
                        });
                      } else {
                        this.setState({
                          updateMobile: false,
                        });
                      }
                    }}
                  >
                    <Text style={styles.updateText}>
                      {updateMobile ? "Save" : "Update"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.headingText, { textAlign: "justify" }]}>
                  Photos
                </Text>
                <View
                  style={[
                    Styles.rowContainer,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Image
                    source={require("../../assets/images/uploadedImage.png")}
                    style={styles.uploadedImages}
                  />
                  <Image
                    source={require("../../assets/images/uploadedImage.png")}
                    style={styles.uploadedImages}
                  />
                  <Image
                    source={require("../../assets/images/uploadedImage.png")}
                    style={styles.uploadedImages}
                  />
                </View>
                <View
                  style={[
                    Styles.rowContainer,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Image
                    source={require("../../assets/images/uploadedImage.png")}
                    style={styles.uploadedImages}
                  />
                  <Image
                    source={require("../../assets/images/uploadedImage.png")}
                    style={styles.uploadedImages}
                  />
                  <Image
                    source={require("../../assets/images/uploadedImage.png")}
                    style={styles.uploadedImages}
                  />
                </View>
                <View
                  style={{ width: "85%", alignSelf: "center", marginTop: 50 }}
                >
                  <Button
                    text="Save"
                    backgroundColor="#5FAEB6"
                    Pressed={() => this.props.navigation.navigate("Setting")}
                  />
                </View>
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
  headingText: {
    fontFamily: font.Medium,
    fontSize: 20,
    color: "#000",
  },
  updateText: {
    fontFamily: font.Regular,
    color: "#416181",
    fontSize: 16,
  },
  inputContainer: {
    width: "95%",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    backgroundColor: "#C4C4C445",
    paddingHorizontal: 10,
    fontFamily: font.Regular,
  },
  uploadedImages: {
    width: "30%",
    height: 120,
    borderRadius: 5,
    resizeMode: "contain",
  },
});
export default EditProfile;
