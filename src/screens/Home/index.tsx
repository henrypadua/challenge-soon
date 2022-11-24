import React, { useState, useEffect, useRef } from 'react';
import { Alert, Dimensions } from 'react-native';

import { GOOGLE_MAPS_APIKEY } from '@env';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import {
	Avatar,
	Button,
	FormControl,
	HStack,
	Icon,
	IconButton,
	Image,
	Input,
	Modal,
	Spinner,
	Text,
	VStack,
} from 'native-base';
import MapView, { LatLng, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import utils from '@utils/Utils';

import { mapStyle } from '@styles/mapStyle';

export function Home() {
	const [destination, setDestination] = useState<LatLng>();
	const [origin, setOrigin] = useState<LatLng>({ latitude: 0, longitude: 0 });
	const [isReady, setIsReady] = useState(false);
	const [angle, setAngle] = useState(0);
	const [infoRoute, setInfoRoute] = useState({
		distance: 0,
		duration: 0,
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [openModal, setOpenModal] = useState(true);

	const mapView = useRef<MapView>(null);

	async function getLocation() {
		setIsLoading(true);

		const { status } = await Location.requestForegroundPermissionsAsync();

		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		}

		const location = await Location.getCurrentPositionAsync({}).finally(
			() => {
				setIsLoading(false);
			},
		);
		setOrigin({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		});
	}

	useEffect(() => {
		getLocation();
	}, []);

	return (
		<>
			{isLoading ? (
				<VStack
					flex={1}
					justifyContent="center"
					alignItems="center"
					bgColor={'#242E42'}
				>
					<Spinner size={'lg'} color="#ffffff" />
					<Text color="#ffffff">Loading...</Text>
				</VStack>
			) : (
				<MapView
					ref={mapView}
					style={{
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').height,
					}}
					customMapStyle={mapStyle}
					region={{
						latitude: origin?.latitude,
						longitude: origin?.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					loadingBackgroundColor="#242E42"
					loadingIndicatorColor="#ffffff"
					loadingEnabled
					showsBuildings={false}
					showsPointsOfInterest={false}
					onPress={(e) => {
						setDestination(e.nativeEvent.coordinate);
					}}
				>
					{origin && (
						<Marker
							coordinate={origin}
							tracksViewChanges={false}
							anchor={{
								x: 0.5,
								y: 0.5,
							}}
						>
							<Image
								source={require('@assets/pin.png')}
								height={'50px'}
								width={'32px'}
								alt="pin"
							/>
						</Marker>
					)}

					{destination && (
						<Marker
							coordinate={destination}
							tracksViewChanges={false}
							anchor={{
								x: 0.5,
								y: 0.5,
							}}
							rotation={angle}
						>
							<Image
								source={require('@assets/car.png')}
								height={'50px'}
								width={'32px'}
								alt="pin"
							/>
						</Marker>
					)}
					<MapViewDirections
						origin={origin}
						destination={destination}
						apikey={GOOGLE_MAPS_APIKEY}
						strokeWidth={5}
						strokeColor="#9722FB"
						optimizeWaypoints={true}
						onReady={(result) => {
							setInfoRoute({
								distance: result.distance,
								duration: result.duration,
							});

							if (!isReady) {
								// Fit the map based on the route
								mapView?.current?.fitToCoordinates(result.coordinates, {
									edgePadding: {
										right: Dimensions.get('window').width * 0.1,
										bottom: 400,
										left: Dimensions.get('window').width * 0.1,
										top: Dimensions.get('window').height * 0.1,
									},
								});
								// Reposition the navigator
								if (result.coordinates.length >= 2) {
									const calculatedAngle = utils.calculateAngle(
										result.coordinates,
									);
									setAngle(calculatedAngle);
								}
								setIsReady(true);
							}
						}}
					/>
				</MapView>
			)}

			<Modal
				isOpen={openModal}
				onClose={() => setOpenModal(false)}
				justifyContent="flex-end"
				bottom="4"
				size="xl"
				backdropVisible={false}
			>
				<Modal.Content>
					<Modal.Header bgColor={'#F7F7F7'}>
						<HStack
							alignContent={'center'}
							alignItems={'center'}
							justifyContent="space-evenly"
						>
							<Avatar
								w={'50px'}
								source={require('@assets/avatar.png')}
							/>
							<VStack alignItems="flex-start">
								<Text
									fontSize="md"
									color="#242E42"
									fontFamily={'heading'}
								>
									Gregory Smith
								</Text>
								<HStack alignContent={'center'} alignItems={'center'}>
									<Icon
										as={MaterialCommunityIcons}
										name="star"
										color="#FFC107"
									/>
									<Text
										fontSize="sm"
										color="#C8C7CC"
										fontFamily={'body'}
									>
										4.9
									</Text>
								</HStack>
							</VStack>
							<HStack
								alignContent={'center'}
								alignItems={'center'}
								space={4}
							>
								<IconButton
									icon={
										<Icon
											as={Ionicons}
											name="chatbubble-ellipses"
											color="#FFFFFF"
											size={'lg'}
										/>
									}
									ml="auto"
									rounded="full"
									bgColor={'#4252FF'}
									onPress={() => Alert.alert('Chat')}
								/>
								<IconButton
									icon={
										<Icon
											as={Ionicons}
											name="call"
											color="#FFFFFF"
											size={'lg'}
										/>
									}
									variant="solid"
									ml="auto"
									rounded="full"
									bgColor={'#4CE5B1'}
									onPress={() => Alert.alert('Phone')}
								/>
							</HStack>
						</HStack>
					</Modal.Header>
					<Modal.Body>
						Enter email address and well send a link to reset your
						password.
						<FormControl mt="3">
							<FormControl.Label>Email</FormControl.Label>
							<Input />
						</FormControl>
					</Modal.Body>
					<Modal.Footer>
						<VStack flex={1}>
							<HStack space={3}>
								<Text color={'#C8C7CC'}>DISTANCE</Text>
								<Text color={'#C8C7CC'}>TIME</Text>
								<Text color={'#C8C7CC'}>PRICE</Text>

								<Text color={'#242E42'}>
									{infoRoute.distance.toFixed(1)}km
								</Text>
								<Text color={'#242E42'}>
									{infoRoute.duration.toFixed(0)}min
								</Text>
								<Text color={'#242E42'}>
									${(infoRoute.distance * 4.2).toFixed(2)}
								</Text>
							</HStack>
							<Button
								onPress={() => {
									setOpenModal(false);
								}}
								bgColor={'#242E42'}
							>
								Cancel Request
							</Button>
						</VStack>
					</Modal.Footer>
				</Modal.Content>
			</Modal>

			<Button
				zIndex={1}
				position="absolute"
				onPress={() => setOpenModal(true)}
			>
				Open Modal
			</Button>
		</>
	);
}
