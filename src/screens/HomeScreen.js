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
  RefreshControl,
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
import { getUserDetail } from "../Store/Action/user.action.js";
import {
  SetUserListing,
  setUnreadLike,
  setBlockList,
} from "../Store/Action/Data.action";
import { Loader } from "../components/Loader";
import moment from "moment";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { getDistance, getPreciseDistance } from "geolib";
const { width, height } = Dimensions.get("window");
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Post: [],
      isloading: true,
      page: 1,
      totalCount: 0,
    };
    this.timeout = null;
  }

  componentDidMount = async () => {
    var token = await AsyncStorage.getItem("userToken");
    this.setState({
      isloading: true,
    });
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
        this.props.SetUserListing(res.data);
        this.setState({
          isloading: false,
          Post: res.data,
          totalCount: res.paginate.total_count,
          page: parseInt(this.state.page) + 1,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isloading: false,
          Post: [],
        });
      });

    this.UserDetail();
    this.checkMatch();
    this.checkItsMatch();
    this.getBlockList();
  };

  getBlockList = async () => {
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
          this.props.setBlockList(res.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  checkMatch = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/like_dislikes/like_unseen`,
      headers: {
        token: token,
      },
    };
    axios(config)
      .then((response) => {
        var res = response.data;
        console.log("UserMatchScreen", res);
        if (res.data.length > 0) {
          this.props.setUnreadLike(true);
          // this.props.navigation.navigate("UserMatchScreen", {
          //   data: res.data[0],
          // });
        }
      })
      .catch((error) => {});
  };

  checkItsMatch = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/matches`,
      headers: {
        token: token,
      },
    };
    axios(config)
      .then((response) => {
        var res = response.data;
        console.log("UserMatchScreen", res);
        if (res.data.length > 0) {
          // this.props.setUnreadLike(true);
          var filter = res.data.filter((value) => !value.match_updated);
          console.log(filter);
          if (filter.length > 0) {
            this.props.navigation.navigate("UserMatchScreen", {
              data: filter[0],
            });
          }
        }
      })
      .catch((error) => {});
  };

  loadMoreData = async () => {
    var token = await AsyncStorage.getItem("userToken");
    this.setState({
      isLaodMore: true,
    });
    var data = JSON.stringify({
      latitude: this.props.Address.position.lat,
      longitude: this.props.Address.position.lng,
      page: this.state.page,
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
    var BlankArray = this.state.Post;
    axios(config)
      .then((response) => {
        console.log(response);
        var res = response.data;
        // this.state.Post.push();
        if (res.data.length > 0) {
          res.data.map((value) => {
            BlankArray.push(value);
            this.props.SetUserListing(BlankArray);
            this.setState({
              Post: BlankArray,
            });
          });
          this.setState({
            isloading: false,
            page: parseInt(this.state.page) + 1,
            isLaodMore: false,
          });
        } else {
          this.setState({
            isloading: false,
            isLaodMore: false,
          });
        }
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isloading: false,
          isLaodMore: false,
        });
      });
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
    return diff;
  };

  distance = (item) => {
    // console.log(this.props.Address);
    const { position } = this.props.Address;
    var dis = getDistance(
      { latitude: position.lat, longitude: position.lng },
      {
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
      }
    );
    var distance = dis / 1000;
    // console.log(dis);
    return distance.toFixed(2);
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  refresh = () => {
    this.componentDidMount();
  };

  render() {
    console.log(this.props.user, "render page ");
    return (
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
                    this.props.user.profile_image?.images
                      ? { uri: this.props.user.profile_image?.images.url }
                      : require("../../assets/images/dummyUser.png")
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
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (this.isCloseToBottom(nativeEvent)) {
                this.loadMoreData();
              }
            }}
            refreshControl={
              <RefreshControl onRefresh={this.refresh} refreshing={false} />
            }
            showsVerticalScrollIndicator={false}
          >
            {this.state.isloading ? (
              <SkeletonPlaceholder>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={{ width: "100%" }}>
                    <View
                      style={{
                        width: "100%",
                        height: 240,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={{ width: "100%" }}>
                    <View
                      style={{
                        width: "100%",
                        height: 240,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View style={{ width: "100%" }}>
                    <View
                      style={{
                        width: "100%",
                        height: 240,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </View>
              </SkeletonPlaceholder>
            ) : (
              <>
                <View style={{ width: "100%" }}>
                  <Text style={{ fontSize: 16, fontFamily: font.Regular }}>
                    <Text style={{ fontFamily: font.Bold }}>
                      We found {this.state.totalCount}
                    </Text>{" "}
                    persons as per your preference!
                  </Text>
                </View>
                <FlatList
                  data={this.props.userListing}
                  style={{ flex: 1 }}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <ImageBackground
                      source={
                        item.profile_image?.images.url
                          ? { uri: item.profile_image?.images.url }
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
                          <View style={{ flex: 1 }}>
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
                              {item.preference_list
                                .slice(0, 2)
                                .map((value, index) => {
                                  return index == 1 ? value : value + ", ";
                                })}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 18,
                              fontFamily: font.Medium,
                              color: "#fff",
                            }}
                          >
                            {this.distance(item)} Miles
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </ImageBackground>
                  )}
                />
              </>
            )}
            {this.state.isLaodMore && (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#5FAEB6" />
              </View>
            )}
          </ScrollView>
        </View>
        <Footer
          selectedIcon="Home"
          homePress={() => this.props.navigation.navigate("HomeScreen")}
          likePress={() => {
            this.props.setUnreadLike(false);
            this.props.navigation.navigate("LikeScreen");
          }}
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
    userListing: state.Data.userListing,
    user: state.User.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserDetail,
      SetUserListing,
      setUnreadLike,
      setBlockList,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
// export default HomeScreen;
