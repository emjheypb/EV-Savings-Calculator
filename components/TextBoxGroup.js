import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const TextBoxGroup = (props) => {
  const [tb1, onChangeTB1] = useState("");
  const [tb2, onChangeTB2] = useState("");

  const setPropsTBValues = () => {
    // return values to Home
    props.tb1(Number(tb1) ? tb1 : 0);
    props.tb2(Number(tb2) ? tb2 : 0);
  };

  useEffect(() => {
    setPropsTBValues();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.groupName}</Text>

      <View style={styles.oneRow}>
        <TextInput
          style={styles.customTextBox}
          placeholder={props.tb1PlaceHolder}
          value={tb1}
          onChangeText={onChangeTB1}
          inputMode={props.tb1InputMode}
        />
        <TextInput
          style={styles.customTextBox}
          placeholder={props.tb2PlaceHolder}
          value={tb2}
          onChangeText={onChangeTB2}
          inputMode={props.tb2InputMode}
        />
      </View>
    </View>
  );
};

export default TextBoxGroup;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  oneRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
    gap: 10,
    marginTop: 10,
  },
  customTextBox: {
    flex: 1,
    backgroundColor: "rgb(239, 239, 239)",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    fontWeight: "bold",
  },
});
