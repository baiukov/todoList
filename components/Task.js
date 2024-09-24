import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native'

export default function Task({ text, removeTask, isDone }) {
	console.log(isDone)
	return (
		
		<View style={styles.container}>
			<Text style={[styles.text, isDone ? styles.doneText : null]}>{text}</Text>
			{
				isDone ? null : (
					<TouchableHighlight onPress={() => removeTask(text)}>
						<Image 
							source={ require( "../assets/images/icons/close.png" )}  
							style={{width: 25, height: 25}}
						/>
					</TouchableHighlight>
				)
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		borderTopWidth: 2,
		borderTopColor: "green",
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
	},
	text: {
		color: "white",
		padding: 10,
		fontSize: 24,
	},
	doneText: {
		textDecorationLine: "line-through",
		textDecorationStyle: "solid"
	}
})
