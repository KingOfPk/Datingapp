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
const { height, width } = Dimensions.get("window");

class ChooseConnections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedConnectionType: [],
      connectionType: [
        {
          id: 0,
          name: "New Friends",
        },
        {
          id: 1,
          name: "Dating",
        },
        {
          id: 2,
          name: `Online Dating`,
        },
        {
          id: 3,
          name: "Meetups",
        },
      ],
      isloading: true,
    };
  }
  selectType = (selectedItemId) => {
    console.log(selectedItemId);
    const tempAray = this.state.selectedConnectionType;
    tempAray.push(selectedItemId);
    this.setState({
      selectedConnectionType: tempAray,
    });
    console.log(this.state.selectedConnectionType);
  };

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
      url: `${baseurl}/api/v1/preferences/connections`,
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
          connectionType: res.data,
        });
        // this.props.navigation.navigate("ChooseConnections");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  SetConnections = async () => {
    var token = await AsyncStorage.getItem("userToken");
    if (this.state.selectedConnectionType.length == 0) {
      Toast.show("Please choose your connection", Toast.LONG);
    } else {
      this.setState({
        isloading: true,
      });
      var data = JSON.stringify({
        connection_ids: this.state.selectedConnectionType.toString(),
      });

      var config = {
        method: "put",
        url: `${baseurl}/api/v1/preferences/connection_update`,
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
          this.props.navigation.navigate("ChooseInterest");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  render() {
    const { connectionType, selectedConnectionType, isloading } = this.state;
    return isloading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        <View
          style={{
            width: "100%",
            height: "30%",
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
                  : require("../../assets/images/dummyUser.png")
              }
              style={styles.userImage}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headingText}>What kind of</Text>
            <Text
              style={[
                styles.headingText,
                { color: "#5FAEB6", left: 5, fontStyle: "italic" },
              ]}
            >
              connections
            </Text>
          </View>
          <Text style={styles.headingText}>are you interested in</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "70%",
            // backgroundColor: "#ff0",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "80%",
              alignItems: "center",
              // backgroundColor: "red",
              justifyContent: "center",
            }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={connectionType}
              numColumns={2}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.selectType(item.id);
                    }}
                    style={[
                      styles.connectionTypeContainer,

                      selectedConnectionType.some((check) => check == item.id)
                        ? { borderWidth: 3 }
                        : { borderWidth: 0 },
                      selectedConnectionType.some((check) => check == item.id)
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
          </View>
          <View
            style={{
              width: "85%",
              justifyContent: "center",
              height: "20%",
              justifyContent: "center",
            }}
          >
            <Button
              text="Save"
              backgroundColor="#5FAEB6"
              Pressed={() => this.SetConnections()}
            />
          </View>
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
    width: width / 3.1,
    height: 140,
    backgroundColor: "#416181",
    borderRadius: 10,
    // margin: 20,
    marginVertical: 30,
    marginHorizontal: 20,
    alignSelf: "center",
    alignItems: "center",
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
  console.log(state.User.user.bio);
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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseConnections);
// export default ChooseConnections;
