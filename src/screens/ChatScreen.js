import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Styles from "../components/CommanStyle";
import { font } from "../components/fonts";
import Footer from "../components/Footer";
const { height, width } = Dimensions.get("window");
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Messages: [
        {
          id: 0,
          message: "This is chat with Kelly",
          type: "recieve",
        },
        {
          id: 0,
          message: "This is chat with Kelly",
          type: "send",
        },
        {
          id: 0,
          message: "This is chat with Kelly",
          type: "recieve",
        },
        {
          id: 0,
          message: "This is chat with Kelly",
          type: "send",
        },
      ],
    };
  }
  render() {
    const { message } = this.state;
    return (
      <SafeAreaView>
        <View style={Styles.container}>
          <ImageBackground
            source={require("../../assets/images/chatBackgroungImage.png")}
            style={{ flex: 1 }}
          >
            {/* <SettingHeader title="Kelly O’leri" /> */}

            <View
              style={{
                width: "100%",
                height: 100,
                backgroundColor: "#5FAEB6",
                // paddingHorizontal: 20,
                // paddingVertical: 10,
                padding: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={Styles.backButtonContainer}
              >
                <Image
                  source={require("../../assets/icons/Left.png")}
                  style={{ width: 20, height: 20 }}
                />
              </TouchableOpacity>

              <View
                style={{
                  width: "100%",
                  //   alignItems: "center",
                  marginTop: "5%",
                  flexDirection: "row",
                }}
              >
                <View style={Styles.userProfileContainer}>
                  <Image
                    source={require("../../assets/images/dummyUser.png")}
                    style={{
                      width: 55,
                      height: 55,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: "#fff",
                    fontFamily: font.SemiBold,
                    fontSize: 20,
                    marginLeft: 20,
                  }}
                >
                  {"Kelly O’leri"}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1, paddingTop: 20 }}
              >
                <FlatList
                  data={this.state.Messages}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          width: "95%",
                          alignSelf: "center",
                          paddingVertical: 10,
                          alignItems:
                            item.type == "recieve" ? "flex-start" : "flex-end",
                        }}
                      >
                        <View
                          style={{
                            width: "auto",
                            maxWidth: "80%",
                            height: "auto",
                            backgroundColor: "red",
                            borderRadius: 10,
                            padding: 20,
                            backgroundColor:
                              item.type == "recieve" ? "#5FAEB6" : "#416181",
                          }}
                        >
                          <Text
                            style={{ fontFamily: font.Regular, color: "#fff" }}
                          >
                            {item.message}
                          </Text>
                        </View>
                      </View>
                    );
                  }}
                />
                <View
                  style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "#fff",
                    paddingHorizontal: 10,
                    position: "absolute",
                    bottom: 0,
                    borderBottomWidth: 0.5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={{ flex: 1, fontSize: 16, fontFamily: font.Regular }}
                    placeholder="Type the message"
                    placeholderTextColor={"#ACABB4"}
                  />

                  <TouchableOpacity style={{ marginRight: 10 }}>
                    <Image
                      source={require("../../assets/icons/Keyboard.png")}
                      style={{ width: 35, height: 35, resizeMode: "contain" }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require("../../assets/icons/Microphone.png")}
                      style={{ width: 35, height: 35, resizeMode: "contain" }}
                    />
                  </TouchableOpacity>
                </View>
              </KeyboardAwareScrollView>
            </View>
          </ImageBackground>
          <Footer
            selectedIcon="Preference"
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

export default ChatScreen;
