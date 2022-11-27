import { createContext, useContext, useState, useEffect } from 'react';

import * as Location from 'expo-location';
import {
	GooglePlaceData,
	GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import { LatLng } from 'react-native-maps';

interface MapProviderProps {
	children: React.ReactNode;
}

interface MapContextData {
	origin: LatLng | null;
	setOrigin: (origin: LatLng | null) => void;
	destination: LatLng | null;
	setDestination: (destination: LatLng | null) => void;
	originPlace: PlaceProps | null;
	setOriginPlace: (originPlace: PlaceProps | null) => void;
	destinationPlace: PlaceProps | null;
	setDestinationPlace: (destinationPlace: PlaceProps | null) => void;
	infoRoute: {
		distance: number;
		duration: number;
	};
	setInfoRoute: (infoRoute: { distance: number; duration: number }) => void;
	isLoading: boolean;
	errorMsg: string;
}

type PlaceProps = {
	data: GooglePlaceData | null;
	details: GooglePlaceDetail | null;
};

export const MapContext = createContext({} as MapContextData);

function MapProvider({ children }: MapProviderProps) {
	const [originHero, setOriginHero] = useState<LatLng>({} as LatLng);
	const [origin, setOrigin] = useState<LatLng | null>(null);
	const [destination, setDestination] = useState<LatLng | null>(null);
	const [originPlace, setOriginPlace] = useState<PlaceProps | null>(null);
	const [destinationPlace, setDestinationPlace] = useState<PlaceProps | null>(
		null,
	);
	const [infoRoute, setInfoRoute] = useState({
		distance: 0,
		duration: 0,
	});

	const [isLoading, setIsLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

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
		<MapContext.Provider
			value={{
				origin,
				setOrigin,
				destination,
				setDestination,
				originPlace,
				setOriginPlace,
				destinationPlace,
				setDestinationPlace,
				infoRoute,
				setInfoRoute,
				isLoading,
				errorMsg,
			}}
		>
			{children}
		</MapContext.Provider>
	);
}

function useMap() {
	const context = useContext(MapContext);

	return context;
}

export { MapProvider, useMap };
