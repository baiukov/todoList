import { useState } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { gStyle } from '../../styles/Style'

export default function TaskEditor({ route }) {

	const { addTask } = route.params
	const [isActive, setIsAcitive] = useState(false)
	const [text, setText] = useState("")

	return (
		<View style={styles.container}>

			<TextInput
				style={[styles.inputText, isActive ? styles.activeInput : styles.inactiveInput]}
				onFocus={() => { setIsAcitive(true) }}
				onBlur={() => { setIsAcitive(false) }}
				onChangeText={setText}
			/>

			<Pressable
				style={[styles.goButton, text ? styles.enabledButton : styles.disabledButton]}
				onPress={() => addTask(text)}
			>
				<Text style={{ color: "inherit" }}>Add task</Text>
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: gStyle.root.backgroundColor,
		gap: 20,
	},
	inputText: {
		borderBottomWidth: 2,
		borderRadius: 2,
		outlineStyle: "none",
		fontSize: 20,
		width: "40%",
		color: "white",
		padding: 10,
	},
	inactiveInput: {
		borderBottomColor: "white",
	},
	activeInput: {
		borderBottomColor: "green",
	},
	goButton: {
		color: "white",
		backgroundColor: "#555",
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
	},
	enabledButton: {
		color: "#fff",
		backgroundColor: "#33f",
	},
	disabledButton: {
		color: "#aaa",
		backgroundColor: "#555",
	},
})