import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  AsyncStorage,
  Keyboard,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../components/Button";
import { font } from "../components/fonts";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import AudioRecord from "react-native-audio-record";
import RNFS from "react-native-fs";
import LottieView from "lottie-react-native";
import SoundPlayer from "react-native-sound-player";
import { baseurl } from "../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../Store/Action/user.action.js";
import { Loader } from "../components/Loader";
import Icon from "react-native-vector-icons/FontAwesome";
const { height, width } = Dimensions.get("window");

const options = {
  sampleRate: 16000, // default 44100
  channels: 1, // 1 or 2, default 1
  bitsPerSample: 16, // 8 or 16, default 16
  audioSource: 6, // android only (see below)
  wavFile: "test.mp3", // default 'audio.wav'
};

AudioRecord.init(options);
class RecordBio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startAudio: false,
      timer: 30,
      bio_description: "",
      AudioUri: "",
      isloading: false,
      isEndRecord: false,
      isPlayedAudio: false,
      isKeyboardOpen: false,
    };
  }

  componentDidMount = async () => {
    if (Platform.OS == "ios") {
      request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
        console.log(result);
      });
    } else {
      request(PERMISSIONS.ANDROID.RECORD_AUDIO).then((result) => {
        console.log(result);
      });
    }

    AudioRecord.on("data", (data) => {
      // base64-encoded audio data chunks
      console.log(data);
    });
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
    this._onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      "FinishedPlaying",
      ({ success }) => {
        console.log("finished playing", success);
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
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  StartAudio = () => {
    AudioRecord?.start();

    this.interval = setInterval(
      () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
      1000
    );
    this.setState({
      startAudio: true,
    });
  };

  componentDidUpdate() {
    if (this.state.timer === 1) {
      clearInterval(this.interval);
      this.stopRecording();
    }
  }

  stopRecording = async () => {
    var audioFile = await AudioRecord.stop();

    console.log("audioFile", audioFile);
    RNFS.readFile(audioFile, "base64").then((res) => {
      console.log(res);
      this.setState({
        AudioUri: "data:audio/mp3;base64," + res,
      });
    });
    // SoundPlayer.loadUrl(audioFile);
    SoundPlayer.playUrl(audioFile);
    this.setState({
      startAudio: false,
      timer: 30,
      isEndRecord: true,
      audioFile,
      isPlayedAudio: true,
    });
    clearInterval(this.interval);
  };

  Play = () => {
    console.log("Play", this.state.audioFile);
    SoundPlayer.play();
    this.setState({
      isPlayedAudio: true,
    });
  };
  Pause = () => {
    SoundPlayer.pause();
    this.setState({
      isPlayedAudio: false,
    });
  };

  SendFile = async () => {
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
        });
        // this.props.navigation.navigate("ChooseConnections");
        if (this.props.route.params.isGoback) {
          this.props.navigation.navigate("HomeScreen");
        } else {
          this.props.navigation.navigate("ChooseConnections");
        }
        // this.props.navigation.navigate("ChooseConnections");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  _keyboardDidShow = () => {
    this.setState({
      isKeyboardOpen: true,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      isKeyboardOpen: false,
    });
  };

  render() {
    return this.state.isloading ? (
      <Loader />
    ) : (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          extraScrollHeight={100}
          contentContainerStyle={{ height: height, width: width }}
        >
          <View
            style={{
              width: "100%",
              height: "30%",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <View style={styles.rowContainer}>
              <Text style={styles.headingText}>{this.props.user.name}</Text>
              {/* <Image
                source={
                  this.props.user.profile_image?.images.url
                    ? { uri: this.props.user.profile_image?.images.url }
                    : require("../../assets/images/DummyUser.png")
                }
                style={styles.userImage}
              /> */}
              <Image
                source={
                  this.props.user.profile_image?.images.url
                    ? { uri: this.props.user.profile_image?.images.url }
                    : require("../../assets/images/DummyUser.png")
                }
                style={styles.userImage}
              />
            </View>
            <Text style={[styles.headingText, { fontFamily: font.Medium }]}>
              Write Bio
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: "70%",
              // backgroundColor: "#ff0",
              alignItems: "center",
            }}
          >
            {this.state.startAudio ? (
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={{ height: 100, width: 200 }}>
                  <LottieView
                    source={require("../../assets/lottie/Wave.json")}
                    autoPlay={true}
                    loop={true}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.stopRecording()}
                  style={{
                    backgroundColor: "#efefef",
                    height: 80,
                    width: 80,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 40,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 0.5,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: font.Bold,
                      color: "#000",
                      textAlign: "center",
                    }}
                  >
                    {this.state.timer}
                  </Text>
                  <Image source={require("../../assets/icons/Play.png")} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  this.state.startAudio
                    ? this.stopRecording()
                    : this.StartAudio()
                }
                style={{
                  backgroundColor: "#efefef",
                  height: 80,
                  width: 80,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 40,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 0.5,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                }}
              >
                <Image
                  source={require("../../assets/images/recordAudio.png")}
                  style={{ width: 35, height: 35, resizeMode: "contain" }}
                />
                {this.state.isEndRecord && (
                  <Image
                    source={require("../../assets/icons/Checked.png")}
                    style={{
                      width: 20,
                      height: 20,
                      resizeMode: "contain",
                      position: "absolute",
                      top: 0,
                      right: 5,
                    }}
                  />
                )}
              </TouchableOpacity>
            )}

            {this.state.isEndRecord && (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Icon
                  onPress={this.state.isPlayedAudio ? this.Pause : this.Play}
                  name={
                    this.state.isPlayedAudio ? "pause-circle" : "play-circle"
                  }
                  size={45}
                  color="#5FAEB6"
                />
              </View>
            )}

            <Text
              style={{
                paddingVertical: "5%",
                fontFamily: font.Medium,
                color: "#ACABB4",
              }}
            >
              Press and record your bio for 30 secs
            </Text>
            <Text
              style={[
                styles.headingText,
                { paddingVertical: 10, fontSize: 16 },
              ]}
            >
              OR
            </Text>
            <TextInput
              maxLength={100}
              multiline={true}
              placeholder="Write your Bio Here in 100 words"
              placeholderTextColor="#666"
              style={{
                width: "85%",
                backgroundColor: "#efefef",
                height: 130,
                borderRadius: 10,
                padding: 15,
                textAlignVertical: "top",
                color: "#000",
              }}
              onChangeText={(text) =>
                this.setState({
                  bio_description: text,
                  isEndRecord: true,
                })
              }
            />
            <View
              style={{
                width: "90%",
                paddingTop: 80,
              }}
            >
              <Button
                text="Save"
                disabled={!this.state.isEndRecord}
                backgroundColor={this.state.isEndRecord ? "#5FAEB6" : "#ccc"}
                Pressed={() => this.SendFile()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
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
  headingText: {
    fontFamily: font.Bold,
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
  micView: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#efefef;",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  inputContainer: {
    width: "85%",
    padding: 10,
    height: 130,
    backgroundColor: "#ACABB4;",
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "top",
    marginTop: 10,
    fontFamily: font.Regular,
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

function mapStateToProps(state) {
  console.log(state);
  return {
    Address: state.Data.address,
    user: state.User.user,
    // user: state.user,
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
export default connect(mapStateToProps, mapDispatchToProps)(RecordBio);

// export default RecordBio;
