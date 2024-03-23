import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import TextBoxGroup from "../components/TextBoxGroup";
import CustomView from "../components/CustomView";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

const HomeScreen = () => {
  const [gasCost, setGasCost] = useState(0);
  const [gasMileage, setGasMileage] = useState(0);

  const [elecCost, setElecCost] = useState(0);
  const [elecMileage, setElecMileage] = useState(0);

  const [selectedYearlyKM, setSelectedYearlyKM] = useState("15000");
  const [selectedYearlyKMIndex, setSelectedYearlyKMIndex] = useState(0);

  const [gas, setGas] = useState(0);
  const [elec, setElec] = useState(0);
  const [kmMore, setKMMore] = useState(0);
  const [savings, setSavings] = useState(0);

  const estimateSavings = () => {
    let currKM = Number(selectedYearlyKM);
    let elecDistance = elecMileage * (gasCost / elecCost);

    setGas((Number(gasMileage) ? Number(gasMileage) : 0).toFixed(1)); // KM a car can drive / L
    setElec((elecDistance ? elecDistance : 0).toFixed(1)); // KM a car can drive / kwH
    setKMMore(((elecDistance ? elecDistance : 0) - gasMileage).toFixed(1)); // additional KM for elec vs gas

    let annualGasCost = gasCost * (currKM / gasMileage);
    let annualElecCost = elecCost * (currKM / elecMileage);
    let savings = annualGasCost - annualElecCost; // annual savings for elec vs gas

    setSavings(savings ? savings.toFixed() : 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, styles.boldText]}>EV Savings Calculator</Text>
      {/* Gas Text Boxes */}
      <TextBoxGroup
        groupName="Gas Vehicle Information"
        tb1={setGasCost}
        tb1PlaceHolder="Price per litre ($/L)"
        tb1InputMode="decimal"
        tb2={setGasMileage}
        tb2PlaceHolder="Gas mileage (km/L)"
        tb2InputMode="decimal"
      />

      {/* Electric Text Boxes */}
      <TextBoxGroup
        groupName="Electric Vehicle Information"
        tb1={setElecCost}
        tb1PlaceHolder="Utilities cost ($/kwH)"
        tb1InputMode="decimal"
        tb2={setElecMileage}
        tb2PlaceHolder="EV mileage (km/kwH)"
        tb2InputMode="decimal"
      />

      {/* KM Picker */}
      <View>
        <Text>How many km do you drive each year?</Text>
        <SegmentedControl
          style={{ width: "100%" }}
          values={["15000", "25000", "40000"]}
          selectedIndex={selectedYearlyKMIndex}
          onValueChange={(itemValue) => {
            setSelectedYearlyKM(itemValue);
          }}
          onChange={(event) => {
            setSelectedYearlyKMIndex(event.nativeEvent.selectedSegmentIndex);
          }}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={estimateSavings}>
        <Text style={styles.boldText}>Estimate Savings</Text>
      </TouchableOpacity>

      {/* Distance Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultLabel}>
          For the price of 1 liter of gas, you can travel:
        </Text>

        <View style={styles.oneRow}>
          <CustomView
            imageName="gas"
            bgColor="rgb(234, 161, 193)"
            value={gas}
            label="km"
          />
          <CustomView
            imageName="elec"
            bgColor="rgb(145,220,223)"
            value={elec}
            label="km"
          />
          <CustomView
            imageName="arrow"
            bgColor="rgb(246,198,67)"
            value={kmMore}
            label="km more"
          />
        </View>

        {/* Savings Result */}
        <Text style={styles.resultLabel}>
          By switching to electric, you obtain:
        </Text>
        <View style={styles.blackBox}>
          <Text style={[styles.blackBoxText, styles.title]}>${savings}</Text>
          <Text style={[styles.blackBoxText, styles.resultLabel]}>
            in savings per year
          </Text>
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    margin: 20,
    gap: 20,
  },
  title: {
    fontSize: 32,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    padding: 15,
  },
  boldText: {
    fontWeight: "bold",
  },
  resultLabel: {
    fontSize: 18,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 20,
  },
  oneRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },
  blackBox: {
    backgroundColor: "rgb(21,28,32)",
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    padding: 15,
  },
  blackBoxText: {
    color: "white",
  },
});
