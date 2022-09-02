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
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

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

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: "#277BC0",
          paddingBottom: 10,
          marginBottom: 10,
        }}
      >
        <Text>{item.name}</Text>
      </View>
    );
  };

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
