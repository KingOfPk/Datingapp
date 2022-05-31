import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  AsyncStorage,
} from "react-native";
import { font } from "../components/fonts";
import Footer from "../components/Footer";
import LinearGradient from "react-native-linear-gradient";
import Styles from "../components/CommanStyle";
import Button from "../components/Button";
import Modal from "react-native-modal";
import { connect } from "react-redux";
import { baseurl } from "../utils/index";
import axios from "axios";

class UserMatchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planModal: false,
      cardDetialModal: false,
      userData: this.props.route.params.data,
    };
  }

  componentDidMount = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/like_dislikes/update_seen_like`,
      headers: {
        token: token,
      },
    };
    axios(config)
      .then((response) => {
        var res = response.data;
        console.log("UserMatchScreen", res);
      })
      .catch((error) => {});
  };

  createChat = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var data = JSON.stringify({
      chat_to: this.state.userData.like_from.id,
    });
    console.log(data);
    var config = {
      method: "post",
      url: `${baseurl}/api/v1/channels?chat_to=${this.state.userData.like_from.id}`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };
    console.log(config);

    axios(config)
      .then((response) => {
        var res = response.data;
        console.log(res);
        if (res.status) {
          this.props.navigation.navigate("ChatScreen", {
            channnelName: res.data.channel_name,
            data: res.data.chat_to_user,
            from: res.data.chat_from_user,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isloading: false,
          Post: [],
        });
      });
  };

  render() {
    const { planModal, cardDetialModal, userData } = this.state;
    console.log(userData);
    return (
      <SafeAreaView>
        <LinearGradient
          colors={["#5FADB5", "#4D7F96", "#446A87"]}
          style={[Styles.container, { alignItems: "center" }]}
        >
          <View style={{ width: "100%", height: 40, padding: 10 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={styles.backButtonContainer}
            >
              <Image
                source={require("../../assets/icons/Left.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              height: "40%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/icons/star.png")}
              style={{ width: 50, height: 50, resizeMode: "contain" }}
            />
            {/* <Text
              style={{
                fontSize: 60,
                color: "#fff",
                fontFamily: "DancingScript-SemiBold",
                fontStyle: "italic",
              }}
            >
              It’s a Match!
            </Text> */}
            <Image
              style={{ width: "90%", height: 75, resizeMode: "contain" }}
              source={require("../../assets/images/itsMatch.png")}
            />
          </View>
          <View
            style={{
              height: "35%",
              //   width: "90%",
              alignItems: "center",
              alignSelf: "center",
              flexDirection: "row",
              //   backgroundColor: "red",
              //   justifyContent: "space-around",
            }}
          >
            <Image
              source={{ uri: this.props.user.profile_image.images.url }}
              style={{
                width: 150,
                height: 150,
                resizeMode: "cover",
                left: 10,
              }}
              borderRadius={75}
              borderWidth={4}
              borderColor="#406284"
            />
            <Image
              source={{ uri: userData.like_from.profile_image.images.url }}
              style={{
                width: 150,
                height: 150,
                resizeMode: "cover",
                // marginRight: 20,
                right: 20,
                zIndex: 2,
              }}
              borderRadius={75}
              borderWidth={4}
              borderColor="#406284"
            />
          </View>
          <View
            style={{ width: "50%", justifyContent: "center", marginTop: 25 }}
          >
            <TouchableOpacity
              onPress={() => this.createChat()}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>START CHAT</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  planContainer: {
    width: "28%",
    height: 100,
    backgroundColor: "#c4c4c4c4",
    borderRadius: 10,
    marginTop: "10%",
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 10,
    height: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: font.Bold,
    color: "#416181",
    fontSize: 20,
  },
  closeIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  logo: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  inputContainer: {
    width: "95%",
    height: 50,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#CECECE",
    paddingHorizontal: 10,
    fontFamily: font.Regular,
    color: "#000",
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
});

function mapStateToProps(state) {
  console.log(state);
  return {
    Address: state.Data.address,
    userListing: state.Data.userListing,
    user: state.User.user,
  };
}

export default connect(mapStateToProps)(UserMatchScreen);
// export default UserMatchScreen;
