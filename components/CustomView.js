import { StyleSheet, Text, View, Image } from "react-native";

const CustomView = (props) => {
  // set view icons from props
  var icon =
    props.imageName == "gas"
      ? require("../assets/gas.png")
      : props.imageName == "elec"
      ? require("../assets/elec.png")
      : require("../assets/right-arrow.png");

  return (
    <View style={[styles.container, { backgroundColor: props.bgColor }]}>
      <Image source={icon} style={styles.icons} />
      <Text style={styles.title}>{props.value}</Text>
      <Text>{props.label}</Text>
    </View>
  );
};

export default CustomView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    padding: 10,
  },
  icons: {
    width: 32,
    height: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
