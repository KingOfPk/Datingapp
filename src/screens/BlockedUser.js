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
import Icon from "react-native-vector-icons/FontAwesome";
import { usePubNub } from "pubnub-react";
import {
  SetUserListing,
  setUnreadMessage,
  setBlockList,
} from "../Store/Action/Data.action";
import { getUserDetail } from "../Store/Action/user.action";
const BlockedUser = ({
  user,
  navigation,
  route,
  unreadMessage,
  setUnreadMessage,
  blockList,
  setBlockList,
}) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    console.log("blockList", blockList);
  }, [blockList]);

  useEffect(() => {
    gteUserList();
  }, []);

  const gteUserList = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/blocks`,
      headers: {
        token: token,
      },
    };
    console.log(config);
    axios(config)
      .then((response) => {
        var res = response.data;
        if (res.status) {
          setBlockList(res.data);

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

  const unblockUser = async (id) => {
    setLaoding(true);
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/blocks/unblock_user?id=${id}`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };
    console.log(config);

    axios(config)
      .then((response) => {
        var res = response.data;
        gteUserList();
        navigation.navigate("HomeScreen");
        console.log(JSON.stringify(response.data));
        setLaoding(false);
      })
      .catch((error) => {
        setLaoding(false);
        console.log(error);
      });
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
              Blocked Users
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, padding: 5 }}>
          <FlatList
            data={blockList}
            numColumns={1}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    width: "100%",
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.userContainer}
                  >
                    <Image
                      source={{
                        uri: item.block_to.profile_image?.images.url,
                      }}
                      style={styles.userImage}
                    />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.userName}>
                        {item.block_to.name} {item.block_to.last_name}
                      </Text>
                      <Icon
                        onPress={() => {
                          unblockUser(item.block_to.id);
                        }}
                        name={"trash"}
                        size={25}
                        color="#000"
                      />
                    </View>
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
    blockList: state.Data.blockList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setUnreadMessage,
      setBlockList,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockedUser);

// export default ChatUserList;
