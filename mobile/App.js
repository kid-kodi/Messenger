import { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
} from "react-native";
import SocketClient from "./core/network/SocketClient";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    SocketClient.initializeSocket();
  }, []);

  useEffect(() => {
    SocketClient.on("received_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const handleSendMessage = () => {
    SocketClient.emit("send_message", message);
    setMessage("");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={styles.inputText}
            placeholder="Ecrire un message..."
            value={message}
            onChangeText={(val) => setMessage(val)}
          />
          <Button title="ENVOYER" onPress={handleSendMessage} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  inputText: {
    borderWidth: 1,
    padding: 8,
    flex: 1,
  },
});
