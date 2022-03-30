import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
} from "react-native";
import Button from "../components/Button";
import { font } from "../components/fonts";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../Store/Action/user.action.js";
import { Loader } from "../components/Loader";
import Toast from "react-native-simple-toast";
import { SafeAreaView } from "react-native";
const { height, width } = Dimensions.get("window");

class ChooseLookingFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHobby: [],
      hobbyType: [
        {
          id: 0,
          name: "Meet up with new friends ",
        },
        {
          id: 1,
          name: "Romantic relationships ",
        },
        {
          id: 2,
          name: "Friends with similar interests",
        },
        {
          id: 3,
          name: "Online Connections",
        },
        {
          id: 4,
          name: "Long Term Relationship",
        },
        {
          id: 5,
          name: "Short term hook ups ",
        },
        {
          id: 6,
          name: "Going on Dates",
        },
        {
          id: 7,
          name: "Networking",
        },
      ],
      isloading: true,
    };
  }

  componentDidMount = async () => {
    var token = await AsyncStorage.getItem("userToken");
    this.setState({
      isloading: true,
    });
    var data = JSON.stringify({
      bio_description: this.state.bio_description,
      bio_audio: this.state.AudioUri,
    });

    var config = {
      method: "get",
      url: `${baseurl}/api/v1/preferences/lookings`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };
    console.log(config);

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        var res = response.data;

        this.setState({
          isloading: false,
          hobbyType: res.data,
        });
        // this.props.navigation.navigate("ChooseConnections");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  selectType = (selectedItemId) => {
    console.log(selectedItemId);
    const tempAray = this.state.selectedHobby;
    tempAray.push(selectedItemId);
    this.setState({
      selectedHobby: tempAray,
    });
    console.log(this.state.selectedHobby);
  };

  SetConnections = async () => {
    var token = await AsyncStorage.getItem("userToken");
    if (this.state.selectedHobby.length == 0) {
      Toast.show("Please choose your looking for", Toast.LONG);
    } else {
      this.setState({
        isloading: true,
      });
      var data = JSON.stringify({
        looking_ids: this.state.selectedHobby.toString(),
      });

      var config = {
        method: "put",
        url: `${baseurl}/api/v1/preferences/lookings_update`,
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        data: data,
      };
      console.log(config);

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          var res = response.data;
          this.setState({
            isloading: false,
          });
          // this.props.navigation.navigate("ChooseConnections");
          this.props.navigation.navigate("ChooseHobby");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    const { hobbyType, selectedHobby, isloading } = this.state;
    return isloading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        <SafeAreaView style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              height: 150,
              justifyContent: "center",
              padding: 10,
            }}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.userNameText}>{this.props.user.name},</Text>
              <Image
                source={
                  this.props.user.profile_image?.images.url
                    ? { uri: this.props.user.profile_image?.images.url }
                    : require("../../assets/images/DummyUser.png")
                }
                style={styles.userImage}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.headingText}>Are you</Text>
              <Text
                style={[
                  styles.headingText,
                  { color: "#5FAEB6", left: 5, fontStyle: "italic" },
                ]}
              >
                looking
              </Text>
              <Text style={[styles.headingText, { left: 10 }]}>for</Text>
            </View>
          </View>
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={hobbyType}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.selectType(item.id);
                  }}
                  style={[
                    styles.connectionTypeContainer,

                    selectedHobby.some((check) => check == item.id)
                      ? { borderWidth: 3 }
                      : { borderWidth: 0 },
                    selectedHobby.some((check) => check == item.id)
                      ? { borderColor: "#5FAEB6" }
                      : { borderColor: "none" },
                  ]}
                >
                  <Text style={{ fontFamily: font.Medium, color: "#fff" }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <SafeAreaView>
            <View style={{ width: "85%", justifyContent: "center" }}>
              <Button
                text="Save"
                backgroundColor="#5FAEB6"
                Pressed={() => this.SetConnections()}
              />
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  userNameText: {
    fontFamily: font.Bold,
    fontSize: 25,
    color: "#000",
  },
  headingText: {
    fontFamily: font.Medium,
    fontSize: 25,
    color: "#000",
  },

  rowContainer: {
    width: "100%",
    // height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userImage: {
    width: 80,
    height: 80,
    // resizeMode: "contain",
    borderRadius: 40,
  },
  connectionTypeContainer: {
    width: width / 1.1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#416181",
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
    // alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
export default connect(mapStateToProps, mapDispatchToProps)(ChooseLookingFor);
// export default ChooseLookingFor;
