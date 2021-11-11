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
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "../components/Button";
import { font } from "../components/fonts";
const { height, width } = Dimensions.get("window");

class RecordBio extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
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
              <Text style={styles.headingText}>Steven,</Text>
              <Image
                source={require("../../assets/images/dummyUser.png")}
                style={styles.userImage}
              />
            </View>
            <Text style={[styles.headingText, { fontFamily: font.SemiBold }]}>
              Record or Write Bio
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
            <TouchableOpacity style={styles.micView}>
              <Image
                source={require("../../assets/images/recordAudio.png")}
                style={{ width: 35, height: 35, resizeMode: "contain" }}
              />
            </TouchableOpacity>
            <Text
              style={{
                paddingVertical: "5%",
                fontFamily: font.Regular,
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
              style={styles.inputContainer}
            />
            <View style={{ width: "90%", paddingTop: "15%" }}>
              <Button
                text="Save"
                backgroundColor="#5FAEB6"
                Pressed={() =>
                  this.props.navigation.navigate("ChooseConnections")
                }
              />
            </View>
          </View>
        </ScrollView>
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
    resizeMode: "contain",
  },
  micView: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "85%",
    padding: 10,
    height: 130,
    backgroundColor: "#C4C4C4",
    borderRadius: 10,
    textAlign: "center",
    textAlignVertical: "top",
    marginTop: 10,
    fontFamily: font.Regular,
  },
});

export default RecordBio;
