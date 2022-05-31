import React, { Component, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import Styles from "../components/CommanStyle";
import { font } from "../components/fonts";
import Footer from "../components/Footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { baseurl } from "../utils/index";
import axios from "axios";
import { usePubNub } from "pubnub-react";
import { SetUserListing, setUnreadMessage } from "../Store/Action/Data.action";
const ChatUserList = ({
  user,
  navigation,
  route,
  unreadMessage,
  setUnreadMessage,
}) => {
  const pubnub = usePubNub();
  const [userList, setUserList] = useState([]);
  const [loading, setLaoding] = useState(true);

  const [allMessages, setAllMessages] = useState([]);
  // const [unreadMessaged, setUnreadMessage] = useState([]);
  // const [allMessages, setAllMessages] = useState([]);
  const [isupDate, setUpdate] = useState(false);

  useEffect(() => {
    gteUserList();
  }, []);

  const gteUserList = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/channels`,
      headers: {
        token: token,
      },
    };
    console.log(config);
    axios(config)
      .then((response) => {
        var res = response.data;
        if (res.status) {
          setUserList(res.data);
          var blankArray = unreadMessage;
          res.data.map(async (value) => {
            try {
              const result = await pubnub.getMessageActions({
                channel: value.channel_name,
              });
              console.log("result", result);
              blankArray.push(...result.data);
              // setUnreadMessage(blankArray);
              setUnreadMessage(blankArray);
            } catch (status) {
              console.log(status);
            }
          });

          setLaoding(false);
          // res.data.map(async (value) => {
          //   console.log(value.channel_name);

          // });
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let BlankArray = [];
    console.log(pubnub);
    userList.map(async (value) => {
      const message = await pubnub.fetchMessages({
        channels: [value.channel_name],
      });
      if (message.channels[value.channel_name]) {
        BlankArray.push(
          message.channels[value.channel_name][
            message.channels[value.channel_name].length - 1
          ]
        );
        setAllMessages(BlankArray);
        setUpdate(!isupDate);
      }
    });
  }, [loading]);

  const unreadCount = (channel) => {
    console.log(unreadMessage, channel);
    var isUnread = unreadMessage.some(
      (value) => value.uuid === channel.toString()
    );
    console.log(isUnread);
    return isUnread;
  };

  return (
    <SafeAreaView>
      <View style={Styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={Styles.backButtonContainer}
          >
            <Image
              source={require("../../assets/icons/Left.png")}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View style={Styles.userProfileContainer}>
              <Image
                source={
                  user.profile_image?.images.url
                    ? { uri: user.profile_image?.images.url }
                    : require("../../assets/images/Rectangle.png")
                }
                style={{
                  width: 50,
                  height: 50,

                  borderRadius: 28,
                }}
              />
            </View>
            <Text
              style={{
                fontFamily: font.Medium,
                fontSize: 18,
                color: "#fff",
                marginLeft: 10,
              }}
            >
              Your Messages
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, padding: 5 }}>
          <FlatList
            data={userList}
            numColumns={1}
            renderItem={({ item }) => {
              return item.chat_from_user.phone == user.phone ? (
                <View
                  style={{
                    width: "100%",
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ChatScreen", {
                        channnelName: item.channel_name,
                        data: item.chat_to_user,
                        from: item.chat_from_user,
                      });
                    }}
                    style={styles.userContainer}
                  >
                    {unreadCount(item.chat_to_user.phone) && (
                      <View style={styles.userActive} />
                    )}
                    <Image
                      source={{
                        uri: item.chat_to_user.profile_image?.images.url,
                      }}
                      style={styles.userImage}
                    />
                    <Text style={styles.userName}>
                      {item.chat_to_user.name} {item.chat_to_user.last_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    width: "100%",
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ChatScreen", {
                        channnelName: item.channel_name,
                        data: item.chat_from_user,
                        from: item.chat_to_user,
                      });
                    }}
                    style={styles.userContainer}
                  >
                    {unreadCount(item.chat_from_user.phone) && (
                      <View style={styles.userActive} />
                    )}
                    <Image
                      source={{
                        uri: item.chat_from_user.profile_image?.images.url,
                      }}
                      style={styles.userImage}
                    />
                    <Text style={styles.userName}>
                      {item.chat_from_user.name} {item.chat_from_user.last_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <Footer
          // selectedIcon="Setting"
          homePress={() => navigation.navigate("HomeScreen")}
          likePress={() => navigation.navigate("LikeScreen")}
          preferencePress={() => navigation.navigate("Preference")}
          settingPress={() => navigation.navigate("Setting")}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  headerContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#5FAEB6",
    borderBottomLeftRadius: 65,
    padding: 20,
  },
  backButtonContainer: {
    height: 30,
    width: 30,
    backgroundColor: "#C4C4C48F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  userContainer: {
    width: "90%",
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#416181",
    flexDirection: "row",
    marginTop: 10,
    height: 70,
    alignItems: "center",
  },
  userActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F81010",
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1000,
  },
  userImage: {
    width: 60,
    height: 60,

    borderRadius: 35,
  },
  userName: {
    fontFamily: font.Bold,
    color: "#000",
    fontSize: 18,
    textAlign: "center",
    // marginTop: 15,
    marginLeft: 10,
  },
  lastMessage: {
    fontFamily: font.Medium,
    color: "#000",
    fontSize: 16,
  },
});

function mapStateToProps(state) {
  console.log(state);
  return {
    Address: state.Data.address,
    user: state.User.user,
    unreadMessage: state.Data.unreadMessage,
    isUpdate: state.Data.isUpdate,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setUnreadMessage,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatUserList);

// export default ChatUserList;
