import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null)
  }

  const completeTask = (index) => {
    let itemCopy = [...taskItems]
    itemCopy.splice(index, 1);
    setTaskItems(itemCopy);
  }

  return (
    <View style={styles.container}>

      {/* Today's Task */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>

        <View style={styles.items}>
          {/* This is where task will go */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      {/* Write Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder='write text'
          onChangeText={(task) => setTask(task)}
          value={task}
        />

        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c0c0c0',
    borderRadius: 30,
    width: 250,
  },
  addWrapper: {
    borderWidth: 1,
    borderColor: '#c0c0c0',
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addText: {
    fontSize: 50,
    color: "gray",
  },
});
