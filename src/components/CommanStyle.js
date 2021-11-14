import { StyleSheet } from "react-native";
import { font } from "./fonts";

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
});

export default Styles;
