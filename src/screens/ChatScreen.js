import React, { Component, useEffect, useRef, useState } from "react";
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
  Platform,
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
import { Picker } from "emoji-mart";
import {
  ChannelList,
  Chat,
  MemberList,
  MessageEnvelope,
  MessageInput,
  MessageList,
  Themes,
  TypingIndicator,
  usePresence,
} from "@pubnub/react-chat-components";
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
  let scrolling = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(route.params.data);
  const [typingSignal, setTypingSignal] = useState(false);

  const pubnub = usePubNub();

  useEffect(() => {
    console.log(route.params.data);
    console.log(pubnub);
    fatchMessage();
    // We need to make sure that PubNub is defined
    if (pubnub) {
      pubnub.setUUID(user.phone);

      const listener = {
        message: (envelope) => {
          console.log(envelope);
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
        presence: (presenceEvent) => {
          setTypingSignal(presenceEvent.signal);
        },
        signal: (msg) => {
          console.log(msg);
          setTypingSignal(msg);
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
    PresenceStatus();
  }, [messages]);

  const PresenceStatus = async () => {
    pubnub.getp;
  };

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

    const result = await pubnub.getMessageActions({
      channel: route.params.channnelName,
    });

    console.log(result);
    console.log(message.channels[route.params.channnelName]);
  };

  const handleSubmit = () => {
    console.log(scrolling);
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
              height: 80,
              backgroundColor: "#5FAEB6",
              // paddingHorizontal: 20,
              // paddingVertical: 10,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={[Styles.backButtonContainer]}
            >
              <Image
                source={require("../../assets/icons/Left.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  color: "#fff",
                  fontFamily: font.Medium,
                  fontSize: 20,
                  textAlign: "center",
                  width: "75%",
                }}
              >
                {userData.name} {userData.last_name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserProfile", { data: userData })
              }
              style={{
                borderColor: "#406284",
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 2,
                overflow: "hidden",
              }}
            >
              <Image
                source={
                  userData.profile_image?.images.url
                    ? { uri: userData.profile_image?.images.url }
                    : require("../../assets/images/Rectangle.png")
                }
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <FlatList
              onContentSizeChange={() =>
                scrolling.scrollToEnd({ animated: true })
              }
              style={{ flex: 1 }}
              data={messages}
              ref={(ref) => {
                scrolling = ref;
              }}
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
          <KeyboardAvoidingView
            keyboardVerticalOffset={45}
            behavior={Platform.OS == "android" ? "height" : "padding"}
          >
            <View style={{ width: "100%", padding: 10 }}>
              {typingSignal.message == "typing-on" &&
                typingSignal.publisher == userData.phone && (
                  <Text
                    style={{
                      fontFamily: font.Medium,
                      fontSize: 16,
                      color: "#416181",
                    }}
                  >
                    {userData.name} is typing..
                  </Text>
                )}
            </View>
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
              {/* <MessageInput typingIndicator fileUpload="all" /> */}
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  fontFamily: font.Regular,
                }}
                placeholder="Type the message"
                onChangeText={setInput}
                value={input}
                onFocus={() => {
                  console.log("typing...");
                  pubnub.signal(
                    {
                      message: "typing-on",
                      channel: route.params.channnelName,
                    },
                    (status, response) => {
                      // handle status, response
                      console.log(status, response);
                    }
                  );
                }}
                onBlur={() => {
                  pubnub.signal(
                    {
                      message: "typing-off",
                      channel: route.params.channnelName,
                    },
                    (status, response) => {
                      // handle status, response
                      console.log(status, response);
                    }
                  );
                }}
                onSubmitEditing={handleSubmit}
                placeholderTextColor={"#ACABB4"}
              />

              <TouchableOpacity
                onPress={handleSubmit}
                style={{ marginRight: 10 }}
              >
                <Image
                  source={require("../../assets/icons/Send.png")}
                  style={{ width: 35, height: 35, resizeMode: "contain" }}
                />
              </TouchableOpacity>

              {/* <TouchableOpacity>
                <Image
                  source={require("../../assets/icons/Microphone.png")}
                  style={{ width: 35, height: 35, resizeMode: "contain" }}
                />
              </TouchableOpacity> */}
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
