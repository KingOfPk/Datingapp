import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  AsyncStorage,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import LottieView from "lottie-react-native";
import Button from "../components/Button2";
import color from "color";
import { font } from "../components/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "react-native-ui-lib";
import Footer from "../components/Footer";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../Store/Action/User.action";
import { Loader } from "../components/Loader";
import moment from "moment";
const { width, height } = Dimensions.get("window");
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Post: [
        {
          id: 0,
          name: "Kelly O’liver",
          age: "27",
          meet: "Meetups",
          image: require("../../assets/images/Rectangle1.png"),
          date: "April 26,2020 | 11:30 AM",
          process: "In Process",
          price: "$ 129.1",
          uid: "#6257441",
          status: "Assign on April 26,2020 | 11:00 AM",
          orderid: "#6257441",
        },
        {
          id: 1,
          name: "Kelly O’liver",
          age: "27",
          meet: "Meetups",
          image: require("../../assets/images/Rectangle2.png"),
          date: "April 26,2020 | 11:30 AM",
          process: "In Process",
          price: "$ 129.1",
          uid: "#6257441",
          status: "Assign on April 26,2020 | 11:00 AM",
          orderid: "#6257441",
        },
        {
          id: 2,
          name: "Kelly O’liver",
          age: "27",
          meet: "Meetups",
          image: require("../../assets/images/Rectangle3.png"),
          date: "April 26,2020 | 11:30 AM",
          process: "In Process",
          price: "$ 129.1",
          uid: "#6257441",
          status: "Assign on April 26,2020 | 11:00 AM",
          orderid: "#6257441",
        },
        {
          id: 3,
          name: "Kelly O’liver",
          age: "27",
          meet: "Meetups",
          image: require("../../assets/images/Rectangle1.png"),
          date: "April 26,2020 | 11:30 AM",
          process: "In Process",
          price: "$ 129.1",
          uid: "#6257441",
          status: "Assign on April 26,2020 | 11:00 AM",
          orderid: "#6257441",
        },
      ],
      isloading: true,
    };
    this.timeout = null;
  }

  componentDidMount = async () => {
    var token = await AsyncStorage.getItem("userToken");

    var data = JSON.stringify({
      latitude: this.props.Address.position.lat,
      longitude: this.props.Address.position.lng,
      page: 1,
    });
    console.log(data);
    var config = {
      method: "post",
      url: `${baseurl}/api/v1/feeds/users`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };
    console.log(config);

    axios(config)
      .then((response) => {
        console.log(response);
        var res = response.data;
        this.setState({
          isloading: false,
          Post: res.data,
        });

        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isloading: false,
          Post: [],
        });
      });

    this.UserDetail();
  };

  UserDetail = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/profile`,
      headers: {
        token: token,
      },
    };
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        var res = response.data;
        if (res.status) {
          this.props.getUserDetail(res.data);
        }
      })
      .catch((error) => {});
  };

  age = (dob) => {
    var currentDate = moment();
    var date = moment(dob);
    var diff = currentDate.diff(date, "years");
    console.log(diff);
    return diff;
  };

  render() {
    return this.state.isloading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        <SafeAreaView style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              height: 80,
              // backgroundColor: '#5FAEB6',
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Setting")}
              >
                <Image
                  source={
                    this.props.user.profile_pic.url
                      ? { uri: baseurl + this.props.user.profile_pic.url }
                      : require("../../assets/images/Rectangle.png")
                  }
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: font.Bold,
                  fontSize: 24,
                  color: "#416181",
                }}
              >
                <Text style={{ color: "#5FAEB6" }}>Together</Text> Again
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ChatUserList");
                }}
              >
                <Image
                  source={require("../../assets/icons/Chat.png")}
                  style={{ width: 50, height: 50 }}
                />
              </TouchableOpacity>
              {/* <View style={{flex: 1}}>
                <Text style={{fontSize: 24, fontFamily: font.Bold}}>
                  Hi Steven
                </Text>
                <Text
                  style={{fontSize: 16, fontFamily: font.Bold, marginTop: 10}}>
                  Nice to meet you : )
                </Text>
              </View> */}
            </View>
          </View>
        </SafeAreaView>
        <View
          style={{
            flex: 1,
            width: "100%",
            // justifyContent: 'center',
            padding: 15,
            // backgroundColor: '#f00',
            // marginBottom: 10,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ width: "100%" }}>
              <Text style={{ fontSize: 16, fontFamily: font.Regular }}>
                <Text style={{ fontFamily: font.Bold }}>
                  We found {this.state.Post.length}
                </Text>{" "}
                persons as per your preference!
              </Text>
            </View>
            <FlatList
              data={this.state.Post}
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ImageBackground
                  source={
                    item.profile_pic.url
                      ? { uri: baseurl + item.profile_pic.url }
                      : require("../../assets/images/Rectangle1.png")
                  }
                  style={{
                    width: "100%",
                    height: 240,
                    // backgroundColor: "#f00",
                    marginTop: 10,
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("UserProfile", {
                        data: item,
                      })
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 20,
                      backgroundColor: "rgba(0,0,0,.5)",
                      //   alignItems: 'flex-end',
                      justifyContent: "flex-end",
                      padding: 15,
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 24,
                            fontFamily: font.Bold,
                            color: "#fff",
                          }}
                        >
                          {item.name}, {this.age(item.dob)}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: font.Regular,
                            color: "#fff",
                          }}
                        >
                          Meetsup, New Friend
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: font.Medium,
                          color: "#fff",
                        }}
                      >
                        10 Miles
                      </Text>
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
              )}
            />
          </ScrollView>
        </View>
        <Footer
          selectedIcon="Home"
          homePress={() => this.props.navigation.navigate("HomeScreen")}
          likePress={() => this.props.navigation.navigate("LikeScreen")}
          preferencePress={() => this.props.navigation.navigate("Preference")}
          settingPress={() => this.props.navigation.navigate("Setting")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 120,
    width: "100%",
    textAlign: "center",
    color: "white",
  },
  headerdescription: {
    marginTop: 20,
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
  categoryIconStyle: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderColor: "#ACABB4",
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
  inputContainer2: {
    width: "100%",
    // height: 70,
    // borderWidth: 1,
    borderColor: "#ACABB4",
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
// export default HomeScreen;
