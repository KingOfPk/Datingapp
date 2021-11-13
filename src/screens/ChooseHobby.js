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

class ChooseHobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedHobby: [],
      hobbyType: [
        {
          id: 0,
          name: "Sports",
        },
        {
          id: 1,
          name: "Socializing ",
        },
        {
          id: 2,
          name: "Just Walk",
        },
        {
          id: 3,
          name: "Eating out ",
        },
        {
          id: 4,
          name: "Time with pet ",
        },
        {
          id: 5,
          name: "Vacations",
        },
        {
          id: 6,
          name: "Sewing ",
        },
        {
          id: 7,
          name: "Time with Family",
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
            <Text style={styles.headingText}>What you</Text>
            <Text
              style={[
                styles.headingText,
                { color: "#ACABB4", left: 5, fontStyle: "italic" },
              ]}
            >
              love
            </Text>
            <Text style={[styles.headingText, { left: 10 }]}>to do</Text>
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
            numColumns={2}
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
              Pressed={() =>
                this.props.navigation.navigate("ChooseAgeOrDistance")
              }
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
    // margin: 20,
    marginVertical: 25,
    marginHorizontal: 20,
    alignSelf: "center",
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
export default ChooseHobby;
