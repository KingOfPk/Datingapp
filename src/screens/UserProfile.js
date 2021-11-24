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
const { width, height } = Dimensions.get("window");
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategory: [],
    };
    this.timeout = null;
  }

  componentDidMount = () => {};

  render() {
    return (
      <View style={styles.container}>
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
                <ImageBackground
                  resizeMode="cover"
                  source={require("../../assets/images/profile.png")}
                  style={{ width: "100%", height: 300 }}
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
                      // onPress={() => this.props.navigation.goBack()}
                      style={{
                        height: 40,
                        width: 30,
                        // backgroundColor: "#666",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                      }}
                    >
                      <Image
                        source={require("../../assets/icons/info.png")}
                        style={{ width: 10, height: 30, resizeMode: "contain" }}
                      />
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
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
                      Jessica
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#ACABB4",
                        fontFamily: font.Bold,
                        paddingHorizontal: 3,
                      }}
                    >
                      O’liver,
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#000",

                        fontFamily: font.Medium,
                      }}
                    >
                      30
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
                    10 Miles Away
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
                        fontSize: 28,
                        fontFamily: font.Bold,
                        color: "#000",
                      }}
                    >
                      89
                      <Text
                        style={{
                          fontSize: 20,
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
                    I love go on date with you!!!
                  </Text>
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
                    <Image
                      source={require("../../assets/icons/Play.png")}
                      style={{ width: 40, height: 40, marginBottom: 8 }}
                    />
                  </ImageBackground>
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
                  <View style={{ width: "50%", padding: 5 }}>
                    <View style={styles.sportButton}>
                      <Text style={styles.sportButtonText}>Sports</Text>
                    </View>
                  </View>
                  <View style={{ width: "50%", padding: 5 }}>
                    <View style={styles.sportButton}>
                      <Text style={styles.sportButtonText}>Eating out</Text>
                    </View>
                  </View>
                </View>
                <View style={{ width: "50%", padding: 5 }}>
                  <View style={styles.sportButton}>
                    <Text style={styles.sportButtonText}>Vaccation</Text>
                  </View>
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
          <View
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
          </View>
          <View
            style={{
              width: "33%",
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={[
                styles.shodow,
                {
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  backgroundColor: "#E5E5E5",
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
            </View>
          </View>
          <View
            style={{
              width: "33%",
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
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
            </View>
          </View>
        </View>
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
    height: 50,
    backgroundColor: "#416181",
    borderRadius: 10,
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
  },
});

export default UserProfile;
