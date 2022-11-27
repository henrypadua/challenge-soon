import {
	createNativeStackNavigator,
	NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { Map } from '@screens/Map';

type AppRoutes = {
	home: undefined;
	map: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
	return (
		<Navigator screenOptions={{ headerShown: true }}>
			<Screen
				name="home"
				component={Home}
				options={{
					headerTitle: 'Search Hero',
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontFamily: 'Roboto',
						fontWeight: 'bold',
						fontSize: 23,
						color: '#242E42',
					},
				}}
			/>
			<Screen
				name="map"
				component={Map}
				options={{
					headerTitle: 'Hero Location',
					headerTitleAlign: 'center',
					headerTitleStyle: {
						fontFamily: 'Roboto',
						fontWeight: 'bold',
						fontSize: 23,
						color: '#242E42',
					},
				}}
			/>
		</Navigator>
	);
}
