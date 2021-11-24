import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Styles from "../components/CommanStyle";
import { font } from "../components/fonts";
import Footer from "../components/Footer";

class ChatUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [
        {
          id: 0,
        },
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
        {
          id: 6,
        },
        {
          id: 7,
        },
        {
          id: 8,
        },
        {
          id: 9,
        },
      ],
    };
  }
  render() {
    const { userList } = this.state;
    return (
      <SafeAreaView>
        <View style={Styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
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
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("ChatScreen");
                    }}
                    style={styles.userContainer}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View style={styles.userActive} />
                      <Image
                        source={require("../../assets/images/dummyUser.png")}
                        style={styles.userImage}
                      />
                    </View>
                    <View style={{ paddingHorizontal: 10, flex: 1 }}>
                      <Text style={styles.userName}>Kelly O’leri</Text>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.lastMessage}
                      >
                        Le’s meet at 10:30 Morning
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <Footer
            // selectedIcon="Setting"
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
    resizeMode: "contain",
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

export default ChatUserList;
