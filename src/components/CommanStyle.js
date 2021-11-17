import { StyleSheet, Dimensions } from "react-native";
import { font } from "./fonts";
const { height, width } = Dimensions.get("window");

const Styles = StyleSheet.create({
  whiteContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "red",
  },
  backButtonContainer: {
    height: 30,
    width: 30,
    backgroundColor: "#C4C4C48F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  mainWhiteContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  settingHeadingText: {
    fontFamily: font.SemiBold,
    fontSize: 20,
    color: "#000",
    padding: 10,
    fontWeight: "600",
  },
  arrowView: {
    width: 0,
    height: 0,
    backgroundColor: "#transparent",
    borderStyle: "solid",
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#416181",
    borderTopColor: "#416181",
  },
  userProfileContainer: {
    borderWidth: 4,
    borderColor: "#406284",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    marginHorizontal: "30%",
    height: height / 1.5,
    width: "90%",
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    padding: 10,
  },
});

export default Styles;
