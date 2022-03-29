import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { baseurl } from "../../utils/index";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUserDetail } from "../../Store/Action/user.action.js";
import { Loader } from "../../components/Loader";
import Styles from "../../components/CommanStyle";
import { font } from "../../components/fonts";
import moment from "moment";
import { getDistance, getPreciseDistance } from "geolib";
class YouLike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
    };
  }

  componentDidMount = async () => {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/like_dislikes/you_like`,
      headers: {
        token: token,
      },
    };

    axios(config)
      .then((response) => {
        var res = response.data;
        if (res.status) {
          this.setState({
            userList: res.data,
          });
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  async componentWillReceiveProps(nextProp) {
    var token = await AsyncStorage.getItem("userToken");
    var config = {
      method: "get",
      url: `${baseurl}/api/v1/like_dislikes/you_like`,
      headers: {
        token: token,
      },
    };
    console.log(config);
    axios(config)
      .then((response) => {
        var res = response.data;
        if (res.status) {
          this.setState({
            userList: res.data,
          });
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  age = (dob) => {
    var currentDate = moment();
    var date = moment(dob);
    var diff = currentDate.diff(date, "years");
    console.log(diff);
    return diff;
  };

  distance = (item) => {
    console.log(this.props.Address);
    const { position } = this.props.Address;
    var dis = getDistance(
      { latitude: position.lat, longitude: position.lng },
      {
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
      }
    );
    var distance = dis / 1000;
    // console.log(dis);
    return distance.toFixed(2);
  };
  render() {
    const { userList } = this.state;
    console.log(userList);
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
          {userList.length == 0 ? (
            <View
              style={{
                height: 500,
                width: "100%",

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: font.Bold }}>
                No likes
              </Text>
            </View>
          ) : (
            <FlatList
              data={userList}
              numColumns={2}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.props.goToCart(item)}
                    style={styles.containerView}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: "60%",
                      }}
                    >
                      <Image
                        source={{ uri: item.profile_image?.images.url }}
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
                          style={{
                            width: 25,
                            height: 25,
                            resizeMode: "contain",
                          }}
                        />
                      </TouchableOpacity>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        width={"100%"}
                        style={styles.boldText}
                      >
                        {item.name}
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
                        {item.last_name}
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
                          {this.distance(item)} Miles
                        </Text>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          width={"100%"}
                          style={styles.boldText}
                        >
                          {this.age(item.dob)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
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
export default connect(mapStateToProps, mapDispatchToProps)(YouLike);
// export default YouLike;
