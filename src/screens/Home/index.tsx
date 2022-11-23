import React, { useState, useEffect } from 'react';

import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { VStack } from 'native-base';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';

type OriginProps = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

export function Home() {
	const [origin, setOrigin] = useState({} as LocationObject);
	const [destination, setDestination] = useState();
	const [camera, setCamera] = useState({
		center: {
			latitude: 0,
			longitude: 0,
		},
		pitch: 0,
		heading: 0,
		altitude: 1000,
		zoom: 16,
	});

	const [errorMsg, setErrorMsg] = useState('');

	useEffect(() => {
		const startTracking = async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				alert('Permissões para acessar a localização foram negadas.');
				return;
			}
			try {
				await Location.watchPositionAsync(
					{
						accuracy: Location.Accuracy.Highest,
						timeInterval: 5000,
						distanceInterval: 50,
					},
					(loc) => {
						setCamera((prevCamera) => ({
							...prevCamera,
							center: {
								latitude: loc.coords.latitude,
								longitude: loc.coords.longitude,
							},
						}));
					},
				);
			} catch (err) {
				console.warn('Algo deu errado...');
			}
		};
		startTracking();
	}, []);

	const getDirections = (latitude: number, longitude: number) => {
		setDestination({
			latitude: latitude,
			longitude: longitude,
		});
	};

	return (
		<VStack flex={1}>
			<MapView
				camera={center}
				showsUserLocation={true}
				showsMyLocationButton={false}
				zoomControlEnabled={true}
				loadingEnabled={true}
				loadingBackgroundColor={'#fff'}
				toolbarEnabled={false}
			/>
		</VStack>
	);
}
