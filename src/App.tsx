import React from 'react';

import {
	useFonts,
	Inter_400Regular,
	Inter_700Bold,
} from '@expo-google-fonts/inter';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { Loading } from '@components/Loading';

import { Routes } from './routes';
import { theme } from './styles/theme';

export default function App() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_700Bold,
	});

	return (
		<NativeBaseProvider theme={theme}>
			<StatusBar
				translucent
				barStyle={'dark-content'}
				backgroundColor={'transparent'}
			/>
			{!fontsLoaded ? <Loading /> : <Routes />}
		</NativeBaseProvider>
	);
}
