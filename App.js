import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STRAGE_KEY = '@todos';

const YourApp = () => {
  const [doing, setDoing] = useState(true);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState({});
  const task = () => setDoing(false);
  const todo = () => setDoing(true);
  const onChangeText = (payload) => setText(payload);
  const saveToDos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STRAGE_KEY, JSON.stringify(toSave));
    } catch (error) {
      console.log(error);
    }
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STRAGE_KEY);
    setTodos(JSON.parse(s));
  };
  const addToDo = async () => {
    if (text === '') return;
    const newToDos = { ...todos, [Date.now()]: { text, work: doing } };
    setTodos(newToDos);
    await saveToDos(newToDos); // 새로운 오브젝트를 saveToDo에도 넣어줌
    setText('');
    // savetodo
  };

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.header}>
        <TouchableOpacity onPress={todo}>
          <Text style={{ ...styles.btnText, color: doing ? theme.white : theme.grey }}>Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={task}>
          <Text style={{ ...styles.btnText, color: doing ? theme.grey : theme.white }}>Task</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onSubmitEditing={addToDo}
        onChangeText={onChangeText}
        returnKeyType='done'
        value={text}
        placeholder={doing ? 'Add a To Do' : 'Add a Task'}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(todos).map((key) =>
          todos[key].work === doing ? (
            <View style={styles.toDo} key={key}>
              <Text style={styles.toDoText}>{todos[key].text}</Text>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
};

export default YourApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 100,
  },
  btnText: {
    fontSize: 38,
    fontWeight: '600',
    color: 'white',
  },
  input: {
    backgroundColor: theme.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.grey,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: theme.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
