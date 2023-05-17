import React from 'react'

export default function ToDoList (todos) {
  return (
    {Object.keys(toDos).map((key) =>
        toDos[key].working === working ? (
          <View key={key} style={styles.toDo}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
            <TouchableOpacity onPress={() => deleteToDo(key)}>
              <Feather name='trash-2' size={20} color={theme.grey} />
            </TouchableOpacity>
          </View>
        ) : null
      )}
  )
}
