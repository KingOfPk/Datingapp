import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ImageBackground,
} from "react-native";
import { font } from "../components/fonts";
import Footer from "../components/Footer";
import SettingHeader from "../components/SettingHeader";
import Styles from "../components/CommanStyle";
import { TextInput } from "react-native-gesture-handler";
import Button from "../components/Button";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../Store/Action/user.action.js";
import { Loader } from "../components/Loader";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import RNFS from "react-native-fs";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-simple-toast";
import Modal from "react-native-modal";
import ThemedListItem from "react-native-elements/dist/list/ListItem";
import SoundPlayer from "react-native-sound-player";
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateName: false,
      updatedName: "",
      updateBio: false,
      updatedBio: "",
      updateMobile: false,
      UpdatedMobile: "",
      galleryImages: [{ image: "", profile_pic: false }],
      isloading: false,
      maxFiles: 6,
      planModal: false,
      message: "",
      errorModal: false,
      bio_description: "",
      AudioUri: "",
      desEditable: false,
      name: "",
      dob: "",
      lastName: "",
      updateDob: false,
      isSoundPlaying: false,
    };
  }

  componentDidMount = () => {
    this.loadGalleryImages();
    this.setState({
      bio_description: this.props.user.bio_description,
      name: this.props.user.name,
      dob: this.props.user.dob,
      lastName: this.props.user.last_name,
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
      console.log(this.props.user?.bio?.bio_audio?.url);
      SoundPlayer.playUrl(this.props.user?.bio?.bio_audio?.url);
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

  loadGalleryImages = () => {
    var blankArray = [{ image: "" }];
    // console.log(this.props.user.galleries);
    this.props.user.galleries.map((value) => {
      blankArray.push({
        image: value.images.url,
        id: value.id,
        profile_pic: value.profile_pic,
      });
      this.setState({
        galleryImages: blankArray,
        maxFiles:
          parseInt(this.state.maxFiles) - this.props.user.galleries.length,
      });
    });
  };
  uploadPic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 500,
      compressImageMaxHeight: 800,
      compressImageMaxWidth: 800,
      mediaType: "photo",
      multiple: true,
      cropping: true,
      maxFiles: this.state.maxFiles,
    }).then((response) => {
      // console.log(response);
      response.map((value) => {
        RNFS.readFile(value.path, "base64").then((res) => {
          // console.log(res);
          // this.state.galleryImages[key].image = ;
          // Toast.show("Image upload succussfully", Toast.LONG);
          this.setState({
            galleryImages: [
              ...this.state.galleryImages,
              {
                image: "data:image/png;base64," + res,
                profile_pic: false,
                newUpload: true,
              },
            ],
          });
        });
      });
      this.setState({
        maxFiles: parseInt(this.state.maxFiles) - response.length,
      });

      // response.map((value) => {
      //   console.log(value);

      // });
    });
  };

  submitEdit = async () => {
    var token = await AsyncStorage.getItem("userToken");
    this.setState({
      isloading: true,
    });
    var blankArray = [];
    this.state.galleryImages.slice(1).map((value) => {
      if (value.newUpload) {
        blankArray.push(value.image);
      }
    });
    console.log(blankArray);
    var data = JSON.stringify({
      images: blankArray,
    });
    // console.log(data);
    var config = {
      method: "post",
      url: `${baseurl}/api/v1/profile/update_gallery`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };
    console.log(config);

    axios(config)
      .then((response) => {
        // console.log(response, "image send successfully");
        var res = response.data;
        this.setState({
          isloading: false,
        });
        this.setProfile();
        Toast.show("Image upload succussfully", Toast.LONG);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        var err = error.response;
        if (err.status == 413) {
          this.setState({
            errorModal: true,
            message: "Data entity too large",
            galleryImages: [{ image: "" }],
          });
        }
        this.setState({
          isloading: false,
        });
      });
  };

  RemoveItem = async (id) => {
    // console.log(id, "remove local image");
    var token = await AsyncStorage.getItem("userToken");
    var filter = this.state.galleryImages.filter((value) => value.id !== id);
    this.setState({
      galleryImages: filter,
      isloading: true,
    });
    this.loadGalleryImages();
    var data = JSON.stringify({
      gallery_id: id,
    });
    // console.log(data);
    var config = {
      method: "delete",
      url: `${baseurl}/api/v1/profile/remove_gallery?gallery_id=${id}`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };
    console.log(config);

    axios(config)
      .then((response) => {
        // console.log(response);
        var res = response.data;
        this.setState({
          maxFiles: parseInt(this.state.maxFiles) + 1,
          isloading: false,
        });
        this.UserDetail();
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          isloading: false,
          Post: [],
        });
      });
  };

  setProfile = async () => {
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
        // console.log(resposne, "save user profile");
        // console.log(JSON.stringify(response.data));
        var res = response.data;
        console.log(res, "after save user profile ");
        this.setState({
          isloading: false,
        });
        if (res.status) {
          this.props.getUserDetail(res.data);
          // this.props.navigation.navigate("HomeScreen");
        }
      })
      .catch((error) => {});
  };

  UpdateBio = async () => {
    var token = await AsyncStorage.getItem("userToken");
    this.setState({
      isloading: true,
    });
    var data = JSON.stringify({
      bio_description: this.state.bio_description,
      bio_audio: this.state.AudioUri,
    });

    var config = {
      method: "post",
      url: `${baseurl}/api/v1/profile/bio_update`,
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
          desEditable: false,
        });
        this.UserDetail();
        // this.props.navigation.navigate("ChooseConnections");
        // if (this.props.route.params.isGoback) {
        //   this.props.navigation.navigate("HomeScreen");
        // } else {
        //   this.props.navigation.navigate("ChooseConnections");
        // }
        // this.props.navigation.navigate("ChooseConnections");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  UpdateName = async () => {
    var token = await AsyncStorage.getItem("userToken");
    this.setState({
      isloading: true,
    });
    console.log(
      {
        name: this.state.name,
        dob: this.state.dob,
        last_name: this.state.lastName,
      },
      "we are sending for upload"
    );
    var data = JSON.stringify({
      user: {
        name: this.state.name,
        dob: this.state.dob,
        last_name: this.state.lastName,
      },
    });

    var config = {
      method: "put",
      url: `${baseurl}/api/v1/profile/update_profile`,
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
          updateName: false,
        });
        this.UserDetail();
        // this.props.navigation.navigate("ChooseConnections");
        // if (this.props.route.params.isGoback) {
        //   this.props.navigation.navigate("HomeScreen");
        // } else {
        //   this.props.navigation.navigate("ChooseConnections");
        // }
        // this.props.navigation.navigate("ChooseConnections");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  SetProfilePic = async (id) => {
    console.log(id, "pressed here");
    var token = await AsyncStorage.getItem("userToken");
    this.setState({
      isloading: true,
    });
    var data = JSON.stringify({
      id: id,
    });

    var config = {
      method: "put",
      url: `${baseurl}/api/v1/profile/update_profile_pic_from_gallery`,
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      data: data,
    };
    console.log(config);

    axios(config)
      .then((response) => {
        console.log(response, "response ,set profile");
        console.log(JSON.stringify(response.data));
        var res = response.data;
        this.setState({
          isloading: false,
        });
        this.UserDetail();
        // this.props.navigation.navigate("ChooseConnections");
        // if (this.props.route.params.isGoback) {
        //   this.props.navigation.navigate("HomeScreen");
        // } else {
        //   this.props.navigation.navigate("ChooseConnections");
        // }
        // this.props.navigation.navigate("ChooseConnections");
      })
      .catch(function (error) {
        console.log(error);
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
        console.log(response, "user detail here");
        console.log(JSON.stringify(response.data));
        var res = response.data;
        if (res.status) {
          // this.setState({ galleryImages: res.data.galleries });
          this.props.getUserDetail(res.data);
          this.loadGalleryImages();
        }
      })
      .catch((error) => {});
  };

  render() {
    const {
      updateBio,
      updateMobile,
      updateName,
      updatedBio,
      updatedName,
      updatedMobile,
      galleryImages,
      isloading,
      maxFiles,
      message,
      desEditable,
      name,
      dob,
      updateDob,
      lastName,
    } = this.state;
    console.log(this.props.user, "render section");
    return isloading ? (
      <Loader />
    ) : (
      <SafeAreaView>
        <View style={Styles.container}>
          <SettingHeader
            title="PROFILE"
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {this.props.user.galleries.map((value) => {
                return value.profile_pic ? (
                  <Image
                    resizeMode="cover"
                    source={{ uri: value.images.url }}
                    style={{ width: "100%", height: 300, marginTop: 1 }}
                  />
                ) : null;
              })}
              <View style={{ padding: 10, width: "100%" }}>
                {/* update name */}
                <View
                  style={[
                    Styles.rowContainer,
                    { flexDirection: updateName ? "column" : "row" },
                  ]}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      // justifyContent: "space-between",
                    }}
                  >
                    {updateName ? (
                      <TextInput
                        onChangeText={(text) => {
                          this.setState({ name: text });
                        }}
                        style={[
                          styles.inputContainer,
                          { width: "50%", color: "#000" },
                        ]}
                        placeholder="Update name"
                        value={name}
                      />
                    ) : (
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        width={"95%"}
                        style={[styles.headingText, { textAlign: "justify" }]}
                      >
                        {this.props.user.name}
                      </Text>
                    )}
                    {updateName ? (
                      <TextInput
                        onChangeText={(text) => {
                          this.setState({ lastName: text });
                        }}
                        style={[
                          styles.inputContainer,
                          { width: "50%", left: 5, color: "#000" },
                        ]}
                        placeholder="Update last Name"
                        value={lastName}
                      />
                    ) : (
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        width={"95%"}
                        style={[
                          styles.headingText,
                          { textAlign: "justify", left: 5 },
                        ]}
                      >
                        {this.props.user.last_name}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={{ alignSelf: "flex-end", paddingVertical: 10 }}
                    onPress={() => {
                      if (!updateName) {
                        this.setState({
                          updateName: true,
                        });
                      } else {
                        this.UpdateName();
                      }
                    }}
                  >
                    <Text style={styles.updateText}>
                      {updateName ? "Save" : "Update"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* update bio */}
                <View style={Styles.rowContainer}>
                  <View style={{ flex: 1 }}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={5}
                      width={"95%"}
                      style={[styles.headingText, { textAlign: "justify" }]}
                    >
                      Bio
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      this.setState({
                        desEditable: true,
                      });
                    }}
                  >
                    <Text style={styles.updateText}>Update</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "100%" }}>
                  <View
                    style={{
                      width: "100%",
                      marginTop: 10,
                      flexDirection: "row",
                    }}
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
                        {this.props.user?.bio_description}
                      </Text>
                      {this.props.user.bio && (
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
                                this.state.soundPlayed
                                  ? this.Pause()
                                  : this.Play()
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
                </View>

                {/* update mobile */}
                <View style={Styles.rowContainer}>
                  <View style={{ flex: 1, marginTop: 10 }}>
                    {updateMobile ? (
                      <TextInput
                        keyboardType="number-pad"
                        maxLength={10}
                        editable={false}
                        onChangeText={(text) => {
                          this.setState({ updatedMobile: text });
                        }}
                        style={styles.inputContainer}
                        placeholder="Mobile"
                        value={this.props.user.phone.toString()}
                      />
                    ) : (
                      <Text
                        style={[styles.headingText, { textAlign: "justify" }]}
                      >
                        {this.props.user.phone}
                      </Text>
                    )}
                  </View>
                  {/* <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      if (!updateMobile) {
                        this.setState({
                          updateMobile: true,
                        });
                      } else {
                        this.setState({
                          updateMobile: false,
                        });
                      }
                    }}
                  >
                    <Text style={styles.updateText}>
                      {updateMobile ? "Save" : "Update"}
                    </Text>
                  </TouchableOpacity> */}
                </View>
                <Text style={[styles.headingText, { textAlign: "justify" }]}>
                  Photos
                </Text>
                <View
                  style={[
                    Styles.rowContainer,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <FlatList
                    data={this.state.galleryImages}
                    style={{ flex: 1 }}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      // console.log(item, "gallery images");
                      return (
                        <View
                          style={{
                            width: "33%",
                            padding: 5,
                            paddingVertical: 10,
                          }}
                        >
                          <View
                            style={{
                              width: "100%",
                              height: 140,

                              borderRadius: 10,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {item.image == "" ? (
                              <TouchableOpacity
                                disabled={maxFiles == 0}
                                onPress={() => this.uploadPic(index)}
                                style={{
                                  width: "100%",
                                  height: 120,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  backgroundColor: "#C4C4C4",
                                  borderRadius: 10,
                                }}
                              >
                                <Image
                                  source={require("../../assets/icons/Plus.png")}
                                  style={{ height: 50, width: 50 }}
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() =>
                                  this.setState({
                                    planModal: true,
                                    modalImage: item.image,
                                  })
                                }
                                style={{
                                  width: "100%",
                                  height: 120,
                                  backgroundColor: "#C4C4C4",
                                  borderRadius: 10,
                                }}
                              >
                                <Image
                                  source={{ uri: item.image }}
                                  style={{
                                    height: 120,
                                    width: "100%",
                                    borderRadius: 10,
                                  }}
                                />
                                {!item.newUpload ? (
                                  <Text
                                    onPress={() => this.SetProfilePic(item.id)}
                                    style={{
                                      color: "#416181",
                                      fontSize: 15,
                                      fontFamily: font.Regular,
                                      textAlign: "center",
                                    }}
                                  >
                                    {item.profile_pic
                                      ? "Profile Pic"
                                      : "Set Profile"}
                                  </Text>
                                ) : null}
                                <TouchableOpacity
                                  disabled={item.profile_pic ? true : false}
                                  onPress={() => this.RemoveItem(item.id)}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    position: "absolute",
                                    right: -10,
                                    top: -10,
                                    backgroundColor: "#fff",
                                    zIndex: 1000,
                                    borderRadius: 15,
                                  }}
                                >
                                  <Image
                                    source={require("../../assets/icons/Cancel2.png")}
                                    style={{ width: 30, height: 30 }}
                                  />
                                </TouchableOpacity>
                                {/* <View
                              style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "rgba(0,0,0,.5)",
                                borderRadius: 15,
                                position: "absolute",
                                alignItems: "flex-end",
                                padding: 10,
                              }}
                            >
                              <Icon
                              
                                name="times"
                                size={20}
                                color="#fff"
                              />
                              
                            </View> */}
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>

                <View
                  style={{ width: "85%", alignSelf: "center", marginTop: 50 }}
                >
                  <Button
                    text="Save"
                    backgroundColor="#5FAEB6"
                    Pressed={() => this.submitEdit()}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
          <Footer
            selectedIcon="Setting"
            homePress={() => this.props.navigation.navigate("HomeScreen")}
            likePress={() => this.props.navigation.navigate("LikeScreen")}
            preferencePress={() => this.props.navigation.navigate("Preference")}
            settingPress={() => this.props.navigation.navigate("Setting")}
          />
        </View>
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
                  width: "100%",
                  height: 50,

                  position: "absolute",
                  top: 30,
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
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                  />
                </TouchableOpacity>
              </View>

              <Image
                source={{ uri: this.state.modalImage }}
                style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              />
            </View>
          </View>
        </Modal>

        <Modal
          onBackdropPress={() => {
            this.setState({
              errorModal: false,
            });
          }}
          onBackButtonPress={() => {
            this.setState({ errorModal: false });
          }}
          transparent={true}
          isVisible={this.state.errorModal}
          style={{ margin: 0 }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={[
                Styles.modalContainer,
                { height: 300, backgroundColor: "#fff" },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    errorModal: false,
                  });
                }}
                style={{ alignSelf: "flex-end" }}
              >
                <Image
                  source={require("../../assets/icons/Cancel.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <Image
                source={require("../../assets/icons/togatherMainLogo.png")}
                style={styles.logo}
              />
              <View
                style={{
                  flex: 1,
                  // backgroundColor: "#f00",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontFamily: font.Medium,
                    textAlign: "center",
                    fontSize: 18,
                  }}
                >
                  {message}
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      errorModal: false,
                    });
                  }}
                  style={[
                    styles.buttonContainer,
                    {
                      backgroundColor: "#416181",
                      height: 50,
                      width: "45%",
                      // marginRight: 15,
                    },
                  ]}
                >
                  <Text style={[styles.buttonText, { color: "#fff" }]}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headingText: {
    fontFamily: font.Medium,
    fontSize: 20,
    color: "#000",
  },
  updateText: {
    fontFamily: font.Regular,
    color: "#416181",
    fontSize: 16,
  },
  inputContainer: {
    width: "95%",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 5,
    backgroundColor: "#C4C4C445",
    paddingHorizontal: 10,
    fontFamily: font.Regular,
    height: 40,
    color: "#000",
  },
  uploadedImages: {
    width: "30%",
    height: 120,
    borderRadius: 5,
    resizeMode: "contain",
  },
  modalContainer: {
    // height: height / 1.5,
    width: "100%",
    // backgroundColor: "#",
    borderRadius: 10,
    padding: 10,
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
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
// export default EditProfile;
