import React from 'react'
import Main from './components/pages/Main'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TaskEditor from './components/pages/TaskEditor'
import { Pages } from './enums/Pages'

const Stack = createStackNavigator()

export default function Navigation() {
	return <NavigationContainer>
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: '#202020',
					borderBottomWidth: 0,
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}
		>
			<Stack.Screen
				name={Pages.MAIN}
				component={Main}
				options={{ title: Pages.MAIN }}
			/>
			<Stack.Screen
				name={Pages.EDITOR}
				component={TaskEditor}
				options={{ title: Pages.EDITOR }}
			/>
		</Stack.Navigator>
	</NavigationContainer >
} 