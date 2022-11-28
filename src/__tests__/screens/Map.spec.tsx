import { render } from '@testing-library/react-native';

import { ProviderTesting } from '@utils/ProviderTesting';

import { Map } from '@screens/Map';

jest.mock('@hooks/useMap', () => ({
	useMap() {
		return {
			isloading: true,
			infoRoute: {
				distance: 0,
				duration: 0,
			},
		};
	},
}));

test('renders correctly', () => {
	const screen = render(
		<ProviderTesting>
			<Map />
		</ProviderTesting>,
	).toJSON();

	expect(screen).toMatchSnapshot();
});
