import { useState, useRef } from 'react';
import { Dimensions } from 'react-native';

import { GOOGLE_MAPS_APIKEY } from '@env';
import { useMap } from '@hooks/useMap';
import { Button, Image, Spinner, Text, View, VStack } from 'native-base';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import utils from '@utils/Utils';

import { ModalInfo } from '@components/ModalInfo';

import { mapStyle } from '@styles/mapStyle';

export function Map() {
	const [isReady, setIsReady] = useState(false);
	const [angle, setAngle] = useState(0);

	const [openModal, setOpenModal] = useState(false);

	const mapView = useRef<MapView>(null);
	const {
		isLoading,
		origin,
		destination,
		setInfoRoute,
		destinationPlace,
		originPlace,
	} = useMap();

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
						flex: 1,
						width: Dimensions.get('window').width,
						height: Dimensions.get('window').height,
					}}
					customMapStyle={mapStyle}
					region={{
						latitude: origin?.latitude || 0,
						longitude: origin?.longitude || 0,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					loadingBackgroundColor="#242E42"
					loadingIndicatorColor="#ffffff"
					loadingEnabled
					onMapLoaded={() => {
						setIsReady(true);
						setOpenModal(true);
					}}
					showsBuildings={false}
					showsPointsOfInterest={false}
					showsCompass={false}
				>
					{origin && (
						<Marker
							coordinate={origin}
							tracksViewChanges={true}
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
							tracksViewChanges={true}
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
						origin={origin || undefined}
						destination={destination || undefined}
						apikey={GOOGLE_MAPS_APIKEY}
						strokeWidth={5}
						strokeColor="#9722FB"
						optimizeWaypoints={true}
						mode="DRIVING"
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
							}
						}}
					/>
				</MapView>
			)}

			{destinationPlace && originPlace && isReady && !openModal && (
				<View
					style={{
						position: 'absolute',
						bottom: 10,
						right: 80,
						marginRight: 10,
						elevation: 10,
						width: 200,
					}}
				>
					<Button bgColor="#242E42" onPress={() => setOpenModal(true)}>
						<Text fontFamily="heading" fontSize={17} color="#fff">
							Request Detail
						</Text>
					</Button>
				</View>
			)}

			<ModalInfo openModal={openModal} setOpenModal={setOpenModal} />
		</>
	);
}
