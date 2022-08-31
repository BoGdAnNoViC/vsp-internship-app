import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [universities, setUniversities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getUniversities = async () => {
    setUniversities([]);
    setLoading(true);
    const universities = await fetch(
      `http://universities.hipolabs.com/search?country=${text}`
    );
    const universitiesJson = await universities.json();
    setUniversities(universitiesJson);
    setLoading(false);
  };
  //useEffect(() => {
  //const getCountries = async () => {
  //const countries = await fetch("https://restcountries.com/v3.1/all");
  //const countriesJson = await countries.json();
  //setCountries(countriesJson);
  // };

  //    getCountries();
  //  getUniversities(); // run it, run it

  //    return () => {
  // this now gets called when the component unmounts
  //  };
  // });
  //aici poti sa faci modificari cum sa iti arate fiecare element in parte
  const renderItem = ({ item }) => {
    //de ex
    return (
      <View
        style={{ backgroundColor: "red", paddingBottom: 10, marginBottom: 10 }}
      >
        <Text>{item.name}</Text>
      </View>
    );
  };
  //nah ce fac acum ii sa afisez in lista numele univeritatii
  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => console.log("navigate to country info")}
      >
        <Text>{text}</Text>
      </TouchableHighlight>
      <TextInput
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
        onChangeText={setText}
        value={text}
      />
      <Button title="Get Universities" onPress={getUniversities} />
      {loading && <ActivityIndicator />}
      {universities.length > 0 && (
        <FlatList data={universities} renderItem={renderItem} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
