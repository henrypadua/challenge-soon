import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('@react-navigation/native', () => {
	const actualNav = jest.requireActual('@react-navigation/native');
	return {
		...actualNav,
		useNavigation: () => ({
			navigate: jest.fn(),
			dispatch: jest.fn(),
		}),
	};
});

jest.mock('react-native-maps', () => {
	const { View } = jest.requireActual('react-native');

	const MockMapView = (props) => {
		return <View>{props.children}</View>;
	};
	const MockMarker = (props) => {
		return <View>{props.children}</View>;
	};
	return {
		__esModule: true,
		default: MockMapView,
		Marker: MockMarker,
	};
});

jest.mock('react-native-reanimated', () => {
	const Reanimated = jest.requireActual('react-native-reanimated/mock');

	// The mock for `call` immediately calls the callback which is incorrect
	// So we override it with a no-op
	Reanimated.default.call = () => {};

	return Reanimated;
});

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
