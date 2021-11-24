import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Styles from "../../components/CommanStyle";
import { font } from "../../components/fonts";

class YouLike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
        {
          id: 0,
        },
      ],
    };
  }
  render() {
    const { userList } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "50%",
            height: 20,
            alignItems: "center",
            alignSelf: "flex-end",
          }}
        >
          <View style={Styles.arrowView} />
        </View>
        <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
          <FlatList
            data={userList}
            numColumns={2}
            renderItem={() => {
              return (
                <TouchableOpacity style={styles.containerView}>
                  <View
                    style={{
                      width: "100%",
                      height: "60%",
                    }}
                  >
                    <Image
                      source={require("../../../assets/images/profile.png")}
                      style={{
                        height: "100%",
                        width: "100%",
                        resizeMode: "cover",
                        borderRadius: 20,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      width: "100%",
                      height: "40%",
                      paddingHorizontal: 10,
                    }}
                  >
                    <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                      <Image
                        source={require("../../../assets/icons/Heart.png")}
                        style={{ width: 25, height: 25, resizeMode: "contain" }}
                      />
                    </TouchableOpacity>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      width={"100%"}
                      style={styles.boldText}
                    >
                      Jessica
                    </Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      width={"100%"}
                      style={[
                        styles.boldText,
                        {
                          color: "#ACABB4",
                        },
                      ]}
                    >
                      O’liver
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        width={"100%"}
                        style={[
                          styles.boldText,
                          {
                            color: "#ACABB4",
                            fontSize: 14,
                            fontFamily: font.Medium,
                          },
                        ]}
                      >
                        10 Miles
                      </Text>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        width={"100%"}
                        style={styles.boldText}
                      >
                        30
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boldText: {
    fontFamily: font.Bold,
    fontSize: 20,
    color: "#000",
  },
  containerView: {
    width: "45%",
    height: 300,
    backgroundColor: "#fff",
    margin: 10,

    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
export default YouLike;
