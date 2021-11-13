import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Button from "../components/Button";
import { font } from "../components/fonts";
const { height, width } = Dimensions.get("window");

class ChooseInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInterestType: "",
    };
  }

  render() {
    const { selectedInterestType } = this.state;

    return (
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
            <Text style={styles.userNameText}>Steven,</Text>
            <Image
              source={require("../../assets/images/dummyUser.png")}
              style={styles.userImage}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.headingText}>Who you are</Text>
            <Text
              style={[
                styles.headingText,
                { color: "#ACABB4", left: 5, fontStyle: "italic" },
              ]}
            >
              interested
            </Text>
            <Text style={[styles.headingText, { left: 10 }]}>in</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "70%",
            // backgroundColor: "#ff0",
            alignItems: "center",
          }}
        >
          <View style={{ width: "100%", height: "85%", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedInterestType: "Men",
                  });
                }}
                style={[
                  styles.connectionTypeContainer,

                  selectedInterestType == "Men"
                    ? { borderWidth: 3 }
                    : { borderWidth: 0 },
                  selectedInterestType == "Men"
                    ? { borderColor: "#5FAEB6" }
                    : { borderColor: "none" },
                ]}
              >
                <Text style={{ fontFamily: font.SemiBold, color: "#fff" }}>
                  {"Men"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    selectedInterestType: "Women",
                  });
                }}
                style={[
                  styles.connectionTypeContainer,

                  selectedInterestType == "Women"
                    ? { borderWidth: 3 }
                    : { borderWidth: 0 },
                  selectedInterestType == "Women"
                    ? { borderColor: "#5FAEB6" }
                    : { borderColor: "none" },
                ]}
              >
                <Text style={{ fontFamily: font.SemiBold, color: "#fff" }}>
                  {"Women"}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  selectedInterestType: "Both",
                });
              }}
              style={[
                styles.connectionTypeContainer,

                selectedInterestType == "Both"
                  ? { borderWidth: 3 }
                  : { borderWidth: 0 },
                selectedInterestType == "Both"
                  ? { borderColor: "#5FAEB6" }
                  : { borderColor: "none" },
                {
                  marginTop: "5%",
                },
              ]}
            >
              <Text style={{ fontFamily: font.SemiBold, color: "#fff" }}>
                {"Both"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "85%", height: "15%" }}>
            <Button
              text="Save"
              backgroundColor="#5FAEB6"
              Pressed={() => this.props.navigation.navigate("ChooseLookingFor")}
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
    fontFamily: font.SemiBold,
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
  connectionTypeContainer: {
    width: width / 3.1,
    height: 140,
    backgroundColor: "#416181",
    borderRadius: 10,
    margin: 20,
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
export default ChooseInterest;
