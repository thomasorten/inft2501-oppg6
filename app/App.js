import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();
const ws = new WebSocket('http://localhost:3000');

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

function HomeScreen({route, navigation}) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Not doing anything yet
  }, []);

  const handleSubmit = () => {
    ws.send(message);
  };

  ws.onmessage = event => {
    console.log(event);
    if (event.data != 'ping') {
      setMessages(msg => [...msg, event.data]);
    }
  };

  ws.onclose = () => {
    console.log('Closing connection');
  };

  ws.onopen = () => {
    console.log('Started connection');
  };

  ws.onerror = () => {
    console.log('Error');
  };

  return (
    <View style={{paddingTop: 20}}>
      <TextInput
        placeholder="Enter a chat message..."
        value={message}
        onChangeText={setMessage}
        style={{height: 40, borderColor: 'gray', borderWidth: 1, margin: 10}}
      />
      <Button title="Send" onPress={handleSubmit} />
      <ScrollView style={{height: 400}}>
        {messages.map((msg, i) => {
          return (
            <Text style={{margin: 10}} key={i}>
              {msg}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
  },
  input: {
    width: 100,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  name: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
  },
});
