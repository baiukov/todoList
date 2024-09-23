import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

export default function Task({ text, removeTask, isDone }) {

	return (
		<View style={styles.container}>
			<Text style={[styles.text, isDone ? styles.doneText : null]}>{text}</Text>
			{
				isDone ? null : (
					<TouchableHighlight styles={isDone ? styles.invisible : null} onPress={() => removeTask(text)}>
						<Image source={{
							width: 15,
							height: 15,
							uri: "../assets/images/icons/close.png"
						}} />
					</TouchableHighlight>
				)
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		border: "2px solid transparent",
		borderTopColor: "green",
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
	},
	text: {
		color: "white",
		padding: 10
	},
	invisible: {
		display: "none"
	},
	doneText: {
		textDecorationLine: "line-through",
		textDecorationStyle: "solid"
	}
})
