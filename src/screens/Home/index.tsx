import React, { useState, useEffect } from 'react';

import * as Location from 'expo-location';
import { VStack } from 'native-base';
import MapView from 'react-native-maps';

type OriginProps = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

export function Home() {
	const [origin, setOrigin] = useState<OriginProps>({} as OriginProps);
	const [destination, setDestination] = useState();

	async function getPermission() {
		const { status } = await Location.requestForegroundPermissionsAsync();

		if (status !== 'granted') {
			throw new Error('Permission to access location was denied');
		}

		const location = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.High,
		});

		setOrigin({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
	}

	useEffect(() => {
		// getPermission();
	}, []);

	return (
		<VStack flex={1}>
			<MapView
				style={{
					flex: 1,
					width: '100%',
					height: '100%',
					zIndex: -1,
					position: 'absolute',
				}}
				initialRegion={{
					latitude: -23.5505,
					longitude: -46.6333,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
				showsUserLocation
				showsMyLocationButton
			/>
		</VStack>
	);
}
