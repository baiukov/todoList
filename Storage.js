import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'
import { Platforms } from './enums/Platforms'


export const Storage = {

	isWeb: Platform.OS === Platforms.WEB,

	getItem: (key) => {
		if (this.isWeb) {
			return localStorage.getItem(key)
		} else {
			return SecureStore.getItem(key)
		}
	},

	setItem: (key, value) => {
		if (this.isWeb) {
			return localStorage.setItem(key, value)
		} else {
			return SecureStore.setItem(key, value)
		}
	}
}