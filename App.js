import {
  StyleSheet,
  View,
  FlatList,
  Button,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])


  function startAddGoalHandler() {
    setModalIsVisible(true)
  }
  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText !== "") {
      setCourseGoals(currentCourseGoals => [...currentCourseGoals, { 'text': enteredGoalText, 'id': Math.random().toString() }])
      setModalIsVisible(false)
    }

  };
  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id)
    })
  }

  return (
    <>
      <StatusBar style='inverted'/>
      <View style={styles.appContainer}>
        <Button title='Add New Goal' color="#5e08cc" onPress={startAddGoalHandler} />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onClose={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            keyExtractor={(item, index) => {
              return item.id
            }}
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDelete={deleteGoalHandler}
                />
              );
            }} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5
  }

});
