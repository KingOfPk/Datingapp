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
  SafeAreaView,
} from "react-native";
import LottieView from "lottie-react-native";
import Button from "../components/Button2";
import color from "color";
import { font } from "../components/fonts";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../Store/Action/user.action.js";
import { DeleteUser } from "../Store/Action/Data.action";
import { Loader } from "../components/Loader";
import { Picker } from "react-native-ui-lib";
import Footer from "../components/Footer";
import moment from "moment";
import SoundPlayer from "react-native-sound-player";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Modal from "react-native-modal";
import Styles from "../components/CommanStyle";
import Icon from "react-native-vector-icons/FontAwesome";
import { getDistance, getPreciseDistance } from "geolib";
import Toast from "react-native-simple-toast";
import PushNotification from "../components/PushNotiification";

const { width, height } = Dimensions.get("window");

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategory: [],
      userData: {},
      youBothLike: [],
      matchScore: 0,
      isloading: true,
      isSoundPlaying: false,
      activeSlide: 0,
      GalleryImage: [],
      liked: false,
      dislike: false,
      planModal: false,
      modalImage: "",
      reportModal: false,
      reportUserType: "block",
      isLiked: false,
      disLiked: false,
    };
    this.timeout = null;
  }

  componentDidMount = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var galleryImages = [];
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/profile/${this.props.route.params.data.id}/get_user_profile`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };
    console.log(config);

    axios(config)
      .then((response) => {
        var res = response.data;
        console.log(response.data, res.data.galleries);

        this.setState({
          isloading: false,
          userData: res.data,
          liked: res.is_like,
          matchScore: res.match_score,
          youBothLike: res.you_both_like,
          GalleryImage: res.data.galleries,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isloading: false,
          Post: [],
        });
      });

    this._onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      "FinishedPlaying",
      ({ success }) => {
        console.log("finished playing", success);
        this.setState({
          isSoundPlaying: false,
          soundPlayed: false,
        });
      }
    );
    this._onFinishedLoadingSubscription = SoundPlayer.addEventListener(
      "FinishedLoading",
      ({ success }) => {
        console.log("finished loading", success);
      }
    );
    this._onFinishedLoadingFileSubscription = SoundPlayer.addEventListener(
      "FinishedLoadingFile",
      ({ success, name, type }) => {
        console.log("finished loading file", success, name, type);
      }
    );
    this._onFinishedLoadingURLSubscription = SoundPlayer.addEventListener(
      "FinishedLoadingURL",
      ({ success, url }) => {
        console.log("finished loading url", success, url);
      }
    );
  };

  componentWillUnmount() {
    this._onFinishedPlayingSubscription.remove();
    this._onFinishedLoadingSubscription.remove();
    this._onFinishedLoadingURLSubscription.remove();
    this._onFinishedLoadingFileSubscription.remove();
  }

  PlaySound = () => {
    try {
      console.log(this.state.userData?.bio?.bio_audio?.url);
      SoundPlayer.playUrl(this.state.userData?.bio?.bio_audio?.url);
      this.setState({
        isSoundPlaying: true,
        soundPlayed: true,
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  Play = () => {
    SoundPlayer.play();
    this.setState({
      // isSoundPlaying: true,
      soundPlayed: true,
    });
  };
  Pause = () => {
    SoundPlayer.pause();
    this.setState({
      soundPlayed: false,
    });
  };

  age = (dob) => {
    var currentDate = moment();
    var date = moment(dob);
    var diff = currentDate.diff(date, "years");
    console.log(diff);
    return diff;
  };

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({
            planModal: true,
            modalImage: index,
          })
        }
        style={{ width: "100%", height: 450 }}
      >
        <ImageBackground
          resizeMode="cover"
          source={{
            uri: item.images.url,
          }}
          style={{ width: "100%", height: 450 }}
        ></ImageBackground>
      </TouchableOpacity>
    );
  };

  _renderItem2 = ({ item, index }) => {
    return (
      <View style={{ width: "100%", height: "100%" }}>
        <Image
          source={{ uri: item.images.url }}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
        {/* <ImageBackground
          resizeMode="cover"
          source={{
            uri: item.url,
          }}
          style={{ width: "100%", height: 450 }}
        ></ImageBackground> */}
      </View>
    );
  };

  distance = (item) => {
    console.log(this.props.Address);
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

  get pagination() {
    const { userData, activeSlide, GalleryImage } = this.state;
    return (
      <Pagination
        dotsLength={GalleryImage.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          position: "absolute",
          bottom: -10,
          width: "100%",
        }}
        dotStyle={{
          width: 20,
          height: 6,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotStyle={{
          width: 20,
          height: 6,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: "rgba(0, 0, 0, 0.92)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  likeUser = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var data = JSON.stringify({
      like_to: this.props.route.params.data.id,
    });
    console.log(data);
    var config = {
      method: "post",
      url: `${baseurl}/api/v1/like_dislikes/like`,
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
        if (res.status) {
          this.setState({
            liked: true,
            isLiked: true,
          });
        }
        Toast.show("you liked", Toast.LONG);
        setTimeout(() => {
          this.setState({
            isLiked: false,
          });
          PushNotification(
            this.state.userData.devise_token,
            `${this.props.user.name} like your profile`,
            "New Like"
          );
          this.props.navigation.navigate("HomeScreen");
        }, 1500);

        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response?.status == 422) {
          alert("already like");
        }
        this.setState({
          isloading: false,
          Post: [],
        });
      });
  };

  disLikeUser = async () => {
    var token = await AsyncStorage.getItem("userToken");

    var data = JSON.stringify({
      dislike_to: this.props.route.params.data.id,
    });
    console.log(data);
    var config = {
      method: "post",
      url: `${baseurl}/api/v1/like_dislikes/dislike`,
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
        if (res.status) {
          this.setState({
            dislike: true,
            disLiked: true,
          });
        }
        this.props.DeleteUser(this.props.route.params.data.id);
        Toast.show("you disliked", Toast.LONG);
        setTimeout(() => {
          this.setState({
            disLiked: false,
          });
          this.props.navigation.navigate("HomeScreen");
        }, 1500);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isloading: false,
          Post: [],
        });
      });
  };

  createChat = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var data = JSON.stringify({
      chat_to: this.props.route.params.data.id,
    });
    console.log(data);
    var config = {
      method: "post",
      url: `${baseurl}/api/v1/channels?chat_to=${this.props.route.params.data.id}`,
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
    const {
      userData,
      youBothLike,
      isloading,
      matchScore,
      GalleryImage,
      isLiked,
      disLiked,
    } = this.state;
    return isloading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        {isLiked && (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",

              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <LottieView
                source={require("../../assets/lottie/hearts.json")}
                autoPlay={true}
                loop={false}
              />
            </View>
          </View>
        )}
        {disLiked && (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",

              justifyContent: "center",
              alignItems: "center",
              zIndex: 100,
            }}
          >
            <View
              style={{
                height: "80%",
                width: "80%",
              }}
            >
              <LottieView
                source={require("../../assets/lottie/broken-heart.json")}
                autoPlay={true}
                loop={false}
              />
            </View>
          </View>
        )}
        <View
          style={{
            flex: 1,
            width: "100%",
            // justifyContent: 'center',
            // backgroundColor: '#f00',
            // marginBottom: 10,
          }}
        >
          <ScrollView>
            <SafeAreaView style={{ width: "100%" }}>
              <View
                style={{
                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "rgba(0,0,0,.1)",
                    position: "absolute",
                    zIndex: 1000,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      padding: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      // backgroundColor: "red",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.props.navigation.goBack()}
                      style={{
                        height: 30,
                        width: 30,
                        backgroundColor: "#666",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Image
                        source={require("../../assets/icons/Left.png")}
                        style={{ width: 20, height: 20 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({
                          reportModal: true,
                        })
                      }
                      style={{
                        height: 30,
                        width: 30,
                        // backgroundColor: "#666",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Image
                        source={require("../../assets/icons/info.png")}
                        style={{ width: 10, height: 25, resizeMode: "contain" }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ width: "100%" }}>
                  <Carousel
                    ref={(c) => {
                      this._carousel = c;
                    }}
                    data={GalleryImage}
                    renderItem={this._renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                    onSnapToItem={(index) =>
                      this.setState({ activeSlide: index })
                    }
                  />
                  {this.pagination}
                </View>
              </View>
            </SafeAreaView>
            <View style={{ width: "100%", padding: 20 }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#000",
                        fontFamily: font.Bold,
                      }}
                    >
                      {userData.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#ACABB4",
                        fontFamily: font.Bold,
                        paddingHorizontal: 3,
                      }}
                    >
                      {userData.last_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#000",

                        fontFamily: font.Medium,
                      }}
                    >
                      {this.age(userData.dob)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#000",
                      fontFamily: font.Medium,
                      marginTop: 5,
                    }}
                  >
                    {this.distance(userData)} Miles Away
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#000",
                      fontFamily: font.Bold,
                      marginTop: 10,
                    }}
                  >
                    Meetups, New Friends
                  </Text>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#000",

                      fontFamily: font.Medium,
                    }}
                  >
                    Match Scrore
                  </Text>
                  <View
                    style={{
                      height: 75,
                      width: 75,
                      borderRadius: 75 / 2,
                      alignItems: "center",
                      justifyContent: "center",
                      // backgroundColor: "red",
                      backgroundColor: "rgba(196, 196, 196, 0.23)",
                      borderWidth: 5,
                      borderColor: "#406284",
                      shadowColor: "rgba(0, 0, 0, 0.25)",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,

                      elevation: 3,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 26,
                        fontFamily: font.Bold,
                        color: "#000",
                      }}
                    >
                      {matchScore}
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: font.Bold,
                          color: "#000",
                        }}
                      >
                        %
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{ width: "100%", marginTop: 10, flexDirection: "row" }}
              >
                <View
                  style={{
                    width: "90%",
                    backgroundColor: "#C4C4C445",
                    height: 120,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: font.Regular,
                      color: "#000",
                    }}
                  >
                    {userData.bio_description ? userData.bio_description : ""}
                  </Text>
                  {this.state.userData.bio && (
                    <ImageBackground
                      source={require("../../assets/icons/Ellipse.png")}
                      style={{
                        width: 60,
                        height: 60,
                        position: "absolute",
                        right: -30,
                        top: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {this.state.isSoundPlaying ? (
                        <Icon
                          onPress={() =>
                            this.state.soundPlayed ? this.Pause() : this.Play()
                          }
                          name={
                            this.state.soundPlayed
                              ? "pause-circle"
                              : "play-circle"
                          }
                          color="#5FAEB6"
                          size={40}
                          style={{ marginBottom: 8 }}
                        />
                      ) : (
                        <Icon
                          onPress={() => this.PlaySound()}
                          name="play-circle"
                          color="#5FAEB6"
                          size={40}
                          style={{ marginBottom: 8 }}
                        />
                      )}
                    </ImageBackground>
                  )}
                </View>
              </View>
              <View style={{ width: "100%", marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: font.Medium,
                    color: "#000",
                  }}
                >
                  You both like
                </Text>

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <FlatList
                    data={youBothLike}
                    style={{ flex: 1 }}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                      <View style={{ width: "50%", padding: 5 }}>
                        <View style={styles.sportButton}>
                          <Text style={styles.sportButtonText}>
                            {item.title}
                          </Text>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            height: 70,
            width: "100%",
            // backgroundColor: '#f00',
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={this.disLikeUser}
            style={{
              width: "33%",
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/icons/Unlike.png")}
              style={{ width: 50, height: 50 }}
            />
          </TouchableOpacity>
          <View
            style={{
              width: "33%",
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={this.likeUser}
              disabled={this.state.liked}
              style={[
                styles.shodow,
                {
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  backgroundColor: this.state.liked ? "#416181" : "#E5E5E5",
                  margin: 5,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Image
                source={require("../../assets/icons/Heart.png")}
                style={{ width: 50, height: 50 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "33%",
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={this.createChat}
              style={[
                styles.shodow,
                {
                  height: 50,
                  width: 50,
                  borderRadius: 35,
                  backgroundColor: "#E5E5E5",
                  margin: 5,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Image
                source={require("../../assets/icons/Chat.png")}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView></SafeAreaView>
        <Modal
          onBackdropPress={() => {
            this.setState({
              planModal: false,
            });
          }}
          onBackButtonPress={() => {
            this.setState({ planModal: false });
          }}
          transparent={true}
          isVisible={this.state.planModal}
          style={{ margin: 0 }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,.8)",
            }}
          >
            <View style={[styles.modalContainer]}>
              <View
                style={{
                  width: width,
                  height: 50,
                  top: 30,
                  position: "absolute",

                  zIndex: 1000,
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  padding: 10,
                  backgroundColor: "rgba(0,0,0,.6)",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      planModal: false,
                    })
                  }
                >
                  <Image
                    source={require("../../assets/icons/FilterClose.png")}
                    style={{ width: 25, height: 25, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: "100%", height: "100%" }}>
                <Carousel
                  ref={(c) => {
                    this._carousel = c;
                  }}
                  firstItem={this.state.modalImage}
                  data={GalleryImage}
                  renderItem={this._renderItem2}
                  sliderWidth={width}
                  itemWidth={width}
                  onSnapToItem={(index) =>
                    this.setState({ activeSlide: index })
                  }
                />
              </View>
              {/* <Image
                source={{ uri: this.state.modalImage }}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              /> */}
            </View>
          </View>
        </Modal>

        <Modal
          testID={"modal"}
          isVisible={this.state.reportModal}
          onBackdropPress={() =>
            this.setState({
              reportModal: false,
            })
          }
          onSwipeComplete={() =>
            this.setState({
              reportModal: false,
            })
          }
          swipeDirection={["up", "left", "right", "down"]}
          style={styles.view}
        >
          <View style={styles.content}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 18, fontFamily: font.Bold, color: "#fff" }}
              >
                Report profile
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    reportUserType: "report",
                  })
                }
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 13,
                  backgroundColor: "#406284",
                  padding: 5,
                }}
              >
                {this.state.reportUserType == "report" && (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#fff",
                      borderRadius: 13,
                    }}
                  ></View>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text
                style={{ fontSize: 18, fontFamily: font.Bold, color: "#fff" }}
              >
                Block
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    reportUserType: "block",
                  })
                }
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 13,
                  backgroundColor: "#406284",
                  padding: 5,
                }}
              >
                {this.state.reportUserType == "block" && (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#fff",
                      borderRadius: 13,
                    }}
                  ></View>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                marginTop: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: "#416181",
                  borderRadius: 20,
                  width: 90,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    fontFamily: font.Medium,
                  }}
                >
                  SUBMIT
                </Text>
              </View>
            </View>
          </View>
        </Modal>
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
  shodow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sportButton: {
    width: "100%",
    // height: 50,
    backgroundColor: "#416181",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  sportButtonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: font.Medium,
    textAlign: "center",
  },
  closeIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  modalContainer: {
    // height: height / 1.5,
    width: "100%",
    // backgroundColor: "#",
    borderRadius: 10,
    padding: 10,
  },
  content: {
    backgroundColor: "#5FAEB6",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  view: {
    justifyContent: "flex-end",
    margin: 0,
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
      DeleteUser,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

// export default UserProfile;
