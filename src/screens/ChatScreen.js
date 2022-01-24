import React, { Component, useEffect, useState } from "react";
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
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Styles from "../components/CommanStyle";
import { font } from "../components/fonts";
import Footer from "../components/Footer";
const { height, width } = Dimensions.get("window");
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { usePubNub } from "pubnub-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const ChatScreen = ({ user, navigation, route }) => {
  const Messages = [
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
  ];

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const pubnub = usePubNub();

  useEffect(() => {
    console.log(route.params.channnelName);
    console.log(pubnub);
    fatchMessage();
    // We need to make sure that PubNub is defined
    if (pubnub) {
      pubnub.setUUID(user.phone);

      const listener = {
        message: (envelope) => {
          setMessages((msgs) => [
            ...msgs,
            {
              id: envelope.message.id,
              author: envelope.publisher,
              content: envelope.message.content,
              udid: envelope.message.udid,
              timetoken: envelope.timetoken,
            },
          ]);
        },
      };

      // Add the listener to pubnub instance and subscribe to `chat` channel.
      pubnub.addListener(listener);
      pubnub.subscribe({
        channels: [route.params.channnelName],
      });
      // We need to return a function that will handle unsubscription on unmount
      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [pubnub]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const fatchMessage = async () => {
    const message = await pubnub.fetchMessages({
      channels: [route.params.channnelName],
    });
    let BlankArray = [];
    if (message.channels[route.params.channnelName]) {
      message.channels[route.params.channnelName].map((value) => {
        BlankArray.push(value.message);
      });
      setMessages(BlankArray);
    }
    console.log(message.channels[route.params.channnelName]);
  };

  const handleSubmit = () => {
    if (input.length > 0) {
      // Clear the input field.
      setInput("");
      // Create the message with random `id`.
      const message = {
        content: input,
        id: Math.random().toString(16).substr(2),
        udid: user.phone,
      };
      console.log(message);
      // Publish our message to the channel `chat`
      pubnub.publish({
        channel: route.params.channnelName,
        message,
      });
    }
  };

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
                navigation.goBack();
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
                  fontFamily: font.Medium,
                  fontSize: 20,
                  marginLeft: 20,
                }}
              >
                {"Kelly O’leri"}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={messages}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      width: "95%",
                      alignSelf: "center",
                      paddingVertical: 10,
                      alignItems:
                        item.udid == user.phone ? "flex-end" : "flex-start",
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
                          item.udid == user.phone ? "#416181" : "#5FAEB6",
                      }}
                    >
                      <Text style={{ fontFamily: font.Regular, color: "#fff" }}>
                        {item.content}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          {/*  */}
          <KeyboardAvoidingView>
            <View
              style={{
                width: "100%",
                height: 60,
                backgroundColor: "#fff",
                paddingHorizontal: 10,

                borderBottomWidth: 0.5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                style={{ flex: 1, fontSize: 16, fontFamily: font.Regular }}
                placeholder="Type the message"
                onChangeText={setInput}
                value={input}
                onSubmitEditing={handleSubmit}
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
          </KeyboardAvoidingView>
        </ImageBackground>
        {/* <Footer
          selectedIcon="Preference"
          homePress={() => this.props.navigation.navigate("HomeScreen")}
          likePress={() => this.props.navigation.navigate("LikeScreen")}
          preferencePress={() => this.props.navigation.navigate("Preference")}
          settingPress={() => this.props.navigation.navigate("Setting")}
        /> */}
      </View>
    </SafeAreaView>
  );
};

function mapStateToProps(state) {
  console.log(state);
  return {
    Address: state.Data.address,
    user: state.User.user,
  };
}

export default connect(mapStateToProps)(ChatScreen);

// export default ChatScreen;
