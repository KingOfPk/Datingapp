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
const ChatUserList = ({ user, navigation, route }) => {
  const pubnub = usePubNub();
  const [userList, setUserList] = useState([]);
  const [loading, setLaoding] = useState(true);

  const [allMessages, setAllMessages] = useState([]);

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
          setLaoding(false);
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let BlankArray = [];
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
      }
    });
  }, [loading]);

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
                  user.profile_pic.url
                    ? { uri: user.profile_pic.url }
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
            renderItem={({ item }) => {
              return item.chat_from_user.phone == user.phone ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ChatScreen", {
                      channnelName: item.channel_name,
                      data: item.chat_to_user,
                    });
                  }}
                  style={styles.userContainer}
                >
                  <View style={{ flexDirection: "row" }}>
                    {/* <View style={styles.userActive} /> */}
                    <Image
                      source={{ uri: item.chat_to_user.profile_pic.url }}
                      style={styles.userImage}
                    />
                  </View>
                  <View style={{ paddingHorizontal: 10, flex: 1 }}>
                    <Text style={styles.userName}>
                      {item.chat_to_user.name} {item.chat_to_user.last_name}
                    </Text>
                    {allMessages.map((value) => {
                      return (
                        value.channel == item.channel_name && (
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.lastMessage}
                          >
                            {value.message.content}
                          </Text>
                        )
                      );
                    })}
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ChatScreen", {
                      channnelName: item.channel_name,
                      data: item.chat_from_user,
                    });
                  }}
                  style={styles.userContainer}
                >
                  <View style={{ flexDirection: "row" }}>
                    {/* <View style={styles.userActive} /> */}
                    <Image
                      source={{ uri: item.chat_from_user.profile_pic.url }}
                      style={styles.userImage}
                    />
                  </View>
                  <View style={{ paddingHorizontal: 10, flex: 1 }}>
                    <Text style={styles.userName}>
                      {item.chat_from_user.name} {item.chat_from_user.last_name}
                    </Text>
                    {allMessages.map((value) => {
                      return (
                        value.channel == item.channel_name && (
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={styles.lastMessage}
                          >
                            {value.message.content}
                          </Text>
                        )
                      );
                    })}
                  </View>
                </TouchableOpacity>
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
    width: "95%",
    alignSelf: "center",
    padding: 5,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: "#416181",
    flexDirection: "row",
    marginTop: 20,
  },
  userActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#F81010",
  },
  userImage: {
    width: 70,
    height: 70,

    borderRadius: 35,
  },
  userName: {
    fontFamily: font.Bold,
    color: "#000",
    fontSize: 18,
    paddingVertical: 5,
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
  };
}

export default connect(mapStateToProps)(ChatUserList);

// export default ChatUserList;
