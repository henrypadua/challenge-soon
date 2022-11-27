import { GOOGLE_MAPS_APIKEY } from '@env';
import { useMap } from '@hooks/useMap';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import * as Location from 'expo-location';
import { Button, Image, Text, VStack } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { PlaceRow } from './PlaceRow';
import styles from './styles';

export function Home() {
	Location.installWebGeolocationPolyfill();

	const navigation = useNavigation<AppNavigatorRoutesProps>();
	const {
		setDestination,
		setOrigin,
		destinationPlace,
		originPlace,
		setDestinationPlace,
		setOriginPlace,
	} = useMap();

	const checkNavigation = () => {
		console.log('originPlace', originPlace);
		if (originPlace && destinationPlace) {
			setDestination({
				latitude: destinationPlace.details?.geometry.location.lat || 0,
				longitude: destinationPlace.details?.geometry.location.lng || 0,
			});
			setOrigin({
				latitude: originPlace.details?.geometry.location.lat || 0,
				longitude: originPlace.details?.geometry.location.lng || 0,
			});

			navigation.navigate('map');
		}
	};

	return (
		<>
			<VStack safeArea flex={1} bgColor="white" height={'100%'}>
				<GooglePlacesAutocomplete
					placeholder="Onde você está?"
					onPress={(data, details = null) => {
						setOriginPlace({ data, details });
					}}
					enablePoweredByContainer={false}
					suppressDefaultStyles
					currentLocation={true}
					currentLocationLabel="Current location"
					styles={{
						textInput: styles.textInput,
						container: styles.autocompleteContainer,
						listView: styles.listView,
						separator: styles.separator,
					}}
					listViewDisplayed="auto"
					fetchDetails
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: 'pt-BR',
						components: 'country:br',
					}}
					renderRow={(data) => <PlaceRow data={data} />}
					renderDescription={(data) => data.description || data.vicinity}
				/>

				<GooglePlacesAutocomplete
					placeholder="Para onde vamos?"
					onPress={(data, details = null) => {
						setDestinationPlace({ data, details });
					}}
					enablePoweredByContainer={false}
					suppressDefaultStyles
					styles={{
						textInput: styles.textInput,
						container: {
							...styles.autocompleteContainer,
							top: 55,
						},
						separator: styles.separator,
						listView: styles.listViewDestination,
					}}
					fetchDetails
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: 'pt-BR',
						components: 'country:br',
					}}
					renderRow={(data) => <PlaceRow data={data} />}
				/>

				<VStack flex={1} position={'absolute'}>
					{/* Circle near Origin input */}
					<Image
						style={styles.circle}
						source={require('@assets/point.png')}
						alt="circle"
					/>

					{/* Line between dots */}
					<Image
						style={styles.line}
						source={require('@assets/line.png')}
						alt="line"
					/>

					{/* Square near Destination input */}
					<Image
						style={styles.square}
						source={require('@assets/oval.png')}
						alt="square"
					/>
				</VStack>
			</VStack>

			<VStack px={10} zIndex="1" py={5}>
				<Button onPress={checkNavigation} bgColor="#242E42" color="white">
					<Text fontFamily="heading" color="white">
						Search Hero
					</Text>
				</Button>
			</VStack>
		</>
	);
}
