import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableWithoutFeedback } from 'react-native-web'
import { Pages } from '../../enums/Pages'
import Task from '../tasks/Task'

export default function Main({ navigation }) {

	const addTask = (text) => {
		let tasks = JSON.parse(localStorage.getItem("tasks") || "[]")

		let newTask = {
			name: text,
			isDone: false,
		}
		tasks.forEach((task) => {
			if (task.name != newTask.name) return
			if (task.isDone) {
				tasks.splice(tasks.indexOf(task), 1)
			} else {
				newTask.name += " (copy)"
			}
		})
		newTask ? tasks.push(newTask) : 0
		localStorage.setItem("tasks", JSON.stringify(tasks))
		setTasks(sortTasks(tasks))
	}

	const loadScene = () => {
		navigation.navigate(Pages.EDITOR, { addTask: addTask })
	}

	const sortTasks = (tasks) => {
		const doneTasks = []
		const toDoTasks = []
		tasks.forEach((task) => {
			task.isDone ? doneTasks.push(task) : toDoTasks.push(task)
		})
		return [...toDoTasks, ...doneTasks]
	}

	const tasksData = JSON.parse(localStorage.getItem("tasks") || "[]")
	const [tasks, setTasks] = useState(sortTasks(tasksData))

	const removeTask = (text) => {
		tasksData.forEach((task) => {
			if (task.name != text) return
			task.isDone = true
		})
		localStorage.setItem("tasks", JSON.stringify(tasksData))
		setTasks(sortTasks(tasksData))
	}

	return (
		<View style={styles.container}>

			<FlatList
				data={tasks}
				renderItem={({ item }) => (
					<Task text={item.name || "Unknown task"} removeTask={removeTask} isDone={item.isDone} />
				)}
			/>

			<TouchableWithoutFeedback onPress={loadScene}>
				<View style={styles.mainButtonWrapper}>
					<View style={styles.mainButton}>
						<Text style={styles.mainButtonContent}>+</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>

		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#151515',
		gap: 10,
	},
	mainButton: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		fontWeight: 800,
		borderRadius: 999,
		backgroundColor: "orange",
		left: "-50%",
		right: 0,
		bottom: 0,
	},
	mainButtonWrapper: {
		position: "absolute",
		width: 50,
		height: 50,
		left: "50%",
		bottom: 10,
	},
	mainButtonContent: {
		fontSize: 24,
		fontWeight: 700,
	}
})
