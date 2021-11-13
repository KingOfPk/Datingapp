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

class ChooseLookingFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHobby: [],
      hobbyType: [
        {
          id: 0,
          name: "Meet up with new friends ",
        },
        {
          id: 1,
          name: "Romantic relationships ",
        },
        {
          id: 2,
          name: "Friends with similar interests",
        },
        {
          id: 3,
          name: "Online Connections",
        },
        {
          id: 4,
          name: "Long Term Relationship",
        },
        {
          id: 5,
          name: "Short term hook ups ",
        },
        {
          id: 6,
          name: "Going on Dates",
        },
        {
          id: 7,
          name: "Networking",
        },
      ],
    };
  }
  selectType = (selectedItemId) => {
    console.log(selectedItemId);
    const tempAray = this.state.selectedHobby;
    tempAray.push({ id: selectedItemId });
    this.setState({
      selectedHobby: tempAray,
    });
    console.log(this.state.selectedHobby);
  };

  render() {
    const { hobbyType, selectedHobby } = this.state;
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
            <Text style={styles.headingText}>Are you</Text>
            <Text
              style={[
                styles.headingText,
                { color: "#ACABB4", left: 5, fontStyle: "italic" },
              ]}
            >
              looking
            </Text>
            <Text style={[styles.headingText, { left: 10 }]}>for</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "70%",
            alignItems: "center",
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={hobbyType}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.selectType(item.id);
                  }}
                  style={[
                    styles.connectionTypeContainer,

                    selectedHobby.some((check) => check.id == item.id)
                      ? { borderWidth: 3 }
                      : { borderWidth: 0 },
                    selectedHobby.some((check) => check.id == item.id)
                      ? { borderColor: "#5FAEB6" }
                      : { borderColor: "none" },
                  ]}
                >
                  <Text style={{ fontFamily: font.SemiBold, color: "#fff" }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
          <View
            style={{ width: "85%", height: "15%", justifyContent: "center" }}
          >
            <Button
              text="Save"
              backgroundColor="#5FAEB6"
              Pressed={() => this.props.navigation.navigate("ChooseHobby")}
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
    width: width / 1.1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#416181",
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
    // alignItems: "center",
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
export default ChooseLookingFor;
