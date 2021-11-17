import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { font } from "../components/fonts";
import Footer from "../components/Footer";
import LinearGradient from "react-native-linear-gradient";
import Styles from "../components/CommanStyle";
import Button from "../components/Button";
import Modal from "react-native-modal";

class UserMatchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planModal: false,
      cardDetialModal: false,
    };
  }
  render() {
    const { planModal, cardDetialModal } = this.state;
    return (
      <SafeAreaView>
        <LinearGradient
          colors={["#5FADB5", "#4D7F96", "#446A87"]}
          style={[Styles.container, { alignItems: "center" }]}
        >
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
            <Text
              style={{
                fontSize: 60,
                color: "#fff",
                fontFamily: font.matchRegular,
                fontStyle: "italic",
              }}
            >
              It’s a Match!
            </Text>
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
              source={require("../../assets/images/profile.png")}
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
              source={require("../../assets/images/profile.png")}
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
              onPress={() => {
                this.setState({
                  planModal: true,
                });
              }}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>START CHAT</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

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
          isVisible={planModal}
          style={{ margin: 0 }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={Styles.modalContainer}>
              <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                <Image
                  source={require("../../assets/icons/Cancel.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={require("../../assets/icons/togatherMainLogo.png")}
                  style={styles.logo}
                />
                <Text
                  style={{
                    fontFamily: font.Regular,
                    fontSize: 20,
                    color: "#416181",
                  }}
                >
                  PREMIUM
                </Text>
                <Text
                  style={{
                    fontFamily: font.Regular,
                    fontSize: 14,
                    color: "#000",
                    paddingVertical: 10,
                  }}
                >
                  Risk free 30 days free trial
                </Text>
                <View style={[Styles.rowContainer, { width: "90%" }]}>
                  <View style={styles.planContainer}></View>
                  <View style={styles.planContainer}></View>
                  <View style={styles.planContainer}></View>
                </View>
                <View
                  style={{ width: "60%", position: "absolute", bottom: "10%" }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        planModal: false,
                        cardDetialModal: true,
                      });
                    }}
                    style={[
                      styles.buttonContainer,
                      { backgroundColor: "#416181", height: 60 },
                    ]}
                  >
                    <Text style={[styles.buttonText, { color: "#fff" }]}>
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          onBackdropPress={() => {
            this.setState({
              cardDetialModal: false,
            });
          }}
          onBackButtonPress={() => {
            this.setState({ cardDetialModal: false });
          }}
          transparent={true}
          isVisible={cardDetialModal}
          style={{ margin: 0 }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={Styles.modalContainer}>
              <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                <Image
                  source={require("../../assets/icons/Cancel.png")}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  source={require("../../assets/icons/togatherMainLogo.png")}
                  style={styles.logo}
                />
                <Text
                  style={{
                    fontFamily: font.Regular,
                    fontSize: 20,
                    color: "#416181",
                  }}
                >
                  PREMIUM
                </Text>
                <Text
                  style={{
                    fontFamily: font.Regular,
                    fontSize: 14,
                    color: "#000",
                    paddingVertical: 10,
                  }}
                >
                  Risk free 30 days free trial
                </Text>
                <View
                  style={{
                    width: "100%",
                    paddingVertical: 5,
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    placeholder="Name on card"
                    placeholderTextColor="#000"
                    style={styles.inputContainer}
                  />
                </View>
                <View
                  style={{
                    width: "100%",
                    paddingVertical: "5%",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="Card Number"
                    placeholderTextColor="#000"
                    style={styles.inputContainer}
                  />
                </View>
                <View
                  style={[
                    Styles.rowContainer,
                    {
                      paddingVertical: 5,
                      justifyContent: "space-between",
                      width: "95%",
                      alignSelf: "center",
                    },
                  ]}
                >
                  <TextInput
                    maxLength={3}
                    keyboardType="number-pad"
                    placeholder="CVV"
                    placeholderTextColor="#000"
                    style={[styles.inputContainer, { width: "45%" }]}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        cardDetialModal: false,
                      });
                      this.props.navigation.navigate("ChatScreen");
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
                    <Text style={[styles.buttonText, { color: "#fff" }]}>
                      PAY NOW
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
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
});
export default UserMatchScreen;
