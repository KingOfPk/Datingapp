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

class ChooseConnections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedConnectionType: [],
      connectionType: [
        {
          id: 0,
          name: "New Friends",
        },
        {
          id: 1,
          name: "Dating",
        },
        {
          id: 2,
          name: `Online Dating`,
        },
        {
          id: 3,
          name: "Meetups",
        },
      ],
    };
  }
  selectType = (selectedItemId) => {
    console.log(selectedItemId);
    const tempAray = this.state.selectedConnectionType;
    tempAray.push({ id: selectedItemId });
    this.setState({
      selectedConnectionType: tempAray,
    });
    console.log(this.state.selectedConnectionType);
  };

  render() {
    const { connectionType, selectedConnectionType } = this.state;
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
            <Text style={styles.headingText}>What kind of</Text>
            <Text
              style={[
                styles.headingText,
                { color: "#ACABB4", left: 5, fontStyle: "italic" },
              ]}
            >
              connections
            </Text>
          </View>
          <Text style={styles.headingText}>are you interested in</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: "70%",
            // backgroundColor: "#ff0",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: "80%",
              alignItems: "center",
              // backgroundColor: "red",
              justifyContent: "center",
            }}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={connectionType}
              numColumns={2}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.selectType(item.id);
                    }}
                    style={[
                      styles.connectionTypeContainer,

                      selectedConnectionType.some(
                        (check) => check.id == item.id
                      )
                        ? { borderWidth: 3 }
                        : { borderWidth: 0 },
                      selectedConnectionType.some(
                        (check) => check.id == item.id
                      )
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
          </View>
          <View
            style={{
              width: "85%",
              justifyContent: "center",
              height: "20%",
              justifyContent: "center",
            }}
          >
            <Button
              text="Save"
              backgroundColor="#5FAEB6"
              Pressed={() => this.props.navigation.navigate("ChooseInterest")}
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
    marginVertical: 30,
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
export default ChooseConnections;
