import { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Pages } from '../../enums/Pages'
import { Storage } from '../../Storage'
import Task from '../Task'

export default function Main({ navigation }) {

	const loadScene = () => {
		navigation.navigate(Pages.EDITOR, { addTask: addTask }) 
	}

	const addTask = (text) => {
		let tasks = JSON.parse(Storage.getItem("tasks") || "[]")
		console.log(2, tasks)
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
		navigation.goBack()
		Storage.setItem("tasks", JSON.stringify(tasks))
		setTasks(sortTasks(tasks))
	}

	const sortTasks = (tasks) => {
		const doneTasks = []
		const toDoTasks = []
		tasks.forEach((task) => {
			task.isDone ? doneTasks.push(task) : toDoTasks.push(task)
		})
		console.log([...toDoTasks, ...doneTasks])
		return [...toDoTasks, ...doneTasks]
	}

	const tasksData = JSON.parse(Storage.getItem("tasks") || "[]")
	const [tasks, setTasks] = useState(sortTasks(tasksData))

	const removeTask = (text) => {
		tasksData.forEach((task) => {
			if (task.name != text) return
			task.isDone = true
		})
		Storage.setItem("tasks", JSON.stringify(tasksData))
		setTasks(sortTasks(tasksData))
	}

	return (
		<View style={styles.container}>

			<FlatList
				data={tasks}
				renderItem={({ item }) => (
					<Task 
						text={item.name || "Unknown task"} 
						removeTask={removeTask} 
						isDone={item.isDone} 
					/>
				)}
			/>

			<TouchableHighlight style={styles.mainButtonWrapper} onPress={loadScene}>
				<View style={styles.mainButton}>
					<Text style={styles.mainButtonContent}>+</Text>
				</View>
			</TouchableHighlight>

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
		width: 100,
		height: 100,
		left: "50%",
		bottom: 40,
	},
	mainButtonContent: {
		fontSize: 64,
		fontWeight: 100,
	}
})
