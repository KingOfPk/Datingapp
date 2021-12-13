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
import { getUserDetail } from "../Store/Action/User.action";
import { Loader } from "../components/Loader";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import RNFS from "react-native-fs";
import Icon from "react-native-vector-icons/FontAwesome";
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
      galleryImages: [{ image: "" }],
      isloading: false,
      maxFiles: 6,
    };
  }

  componentDidMount = () => {
    var blankArray = [{ image: "" }];
    this.props.user.galleries.map((value) => {
      blankArray.push({ image: baseurl + value.images.url, id: value });
      this.setState({
        galleryImages: blankArray,
        maxFiles:
          parseInt(this.state.maxFiles) - this.props.user.galleries.length,
      });
    });
  };

  uploadPic = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 400,
      cropping: true,
      mediaType: "photo",
      multiple: true,
      maxFiles: this.state.maxFiles,
    }).then((response) => {
      console.log(response);
      response.map((value) => {
        RNFS.readFile(value.path, "base64").then((res) => {
          console.log(res);
          // this.state.galleryImages[key].image = ;
          this.setState({
            galleryImages: [
              ...this.state.galleryImages,
              { image: "data:image/png;base64," + res },
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
    console.log();
    var data = JSON.stringify({
      images: this.state.galleryImages.slice(1),
    });
    console.log(data);
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
        console.log(response);
        var res = response.data;
        this.setState({
          isloading: false,
        });
        this.setProfile();
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

  RemoveItem = async (id) => {
    var token = await AsyncStorage.getItem("userToken");
    var filter = this.state.galleryImages.filter((value) => value.id !== id);
    this.setState({
      galleryImages: filter,
      isloading: true,
    });
    var data = JSON.stringify({
      gallery_id: id,
    });
    console.log(data);
    var config = {
      method: "post",
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
        console.log(response);
        var res = response.data;
        this.setState({
          isloading: false,
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
        console.log(JSON.stringify(response.data));
        var res = response.data;
        this.setState({
          isloading: false,
        });
        if (res.status) {
          this.props.getUserDetail(res.data);
          this.props.navigation.navigate("HomeScreen");
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
    } = this.state;
    console.log(maxFiles);
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
              <Image
                resizeMode="cover"
                source={{ uri: baseurl + this.props.user.profile_pic.url }}
                style={{ width: "100%", height: 300, marginTop: 1 }}
              />
              <View style={{ padding: 10, width: "100%" }}>
                {/* update name */}
                <View style={Styles.rowContainer}>
                  <View style={{ flex: 1 }}>
                    {updateName ? (
                      <TextInput
                        onChangeText={(text) => {
                          this.setState({ updatedName: text });
                        }}
                        style={styles.inputContainer}
                        placeholder="Update Name"
                        value={this.props.user.name}
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
                  </View>
                  <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      if (!updateName) {
                        this.setState({
                          updateName: true,
                        });
                      } else {
                        this.setState({
                          updateName: false,
                        });
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
                    {updateBio ? (
                      <TextInput
                        onChangeText={(text) => {
                          this.setState({ updatedBio: text });
                        }}
                        style={styles.inputContainer}
                        placeholder="Update Bio"
                      />
                    ) : (
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={5}
                        width={"95%"}
                        style={[styles.headingText, { textAlign: "justify" }]}
                      >
                        Bio
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={{ justifyContent: "center" }}
                    onPress={() => {
                      this.props.navigation.navigate("RecordBio", {
                        isGoback: true,
                      });
                    }}
                  >
                    <Text style={styles.updateText}>Update</Text>
                  </TouchableOpacity>
                </View>
                {/* update mobile */}
                <View style={Styles.rowContainer}>
                  <View style={{ flex: 1 }}>
                    {updateMobile ? (
                      <TextInput
                        keyboardType="number-pad"
                        maxLength={10}
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
                  <TouchableOpacity
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
                  </TouchableOpacity>
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
                    renderItem={({ item, index }) => (
                      <View style={{ width: "33%", padding: 5 }}>
                        <TouchableOpacity
                          disabled={maxFiles == 0}
                          onPress={() => this.uploadPic(index)}
                          style={{
                            width: "100%",
                            height: 120,
                            backgroundColor: "#C4C4C4",
                            borderRadius: 10,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {item.image == "" ? (
                            <Image
                              source={require("../../assets/icons/Plus.png")}
                              style={{ height: 50, width: 50 }}
                            />
                          ) : (
                            <View style={{ width: "100%", height: "100%" }}>
                              <Image
                                source={{ uri: item.image }}
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  borderRadius: 10,
                                }}
                              />
                              <View
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
                                  onPress={() => this.RemoveItem(item.id)}
                                  name="times"
                                  size={20}
                                  color="#fff"
                                />
                              </View>
                            </View>
                          )}
                        </TouchableOpacity>
                      </View>
                    )}
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
  },
  uploadedImages: {
    width: "30%",
    height: 120,
    borderRadius: 5,
    resizeMode: "contain",
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
