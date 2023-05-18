import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';

const YourApp = () => {
  const [doing, setDoing] = useState(true);
  const [text, setText] = useState('');
  const task = () => setDoing(false);
  const todo = () => setDoing(true);
  const onChangeText = (payload) => setText(payload);

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
        onChangeText={onChangeText}
        value={text}
        placeholder={doing ? 'Add a To Do' : 'Add a Task'}
        style={styles.input}
      />
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
    marginTop: 20,
    fontSize: 18,
  },
});
