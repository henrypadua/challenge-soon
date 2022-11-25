import React from 'react';
import { View, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { GooglePlaceData } from 'react-native-google-places-autocomplete';

import styles from './styles';

export function PlaceRow({ data }: { data: GooglePlaceData }) {
	return (
		<View style={styles.row}>
			<View style={styles.iconContainer}>
				<Ionicons name="location-sharp" size={15} color="white" />
			</View>
			<Text style={styles.locationText}>
				{data.description || data.vicinity}
			</Text>
		</View>
	);
}
