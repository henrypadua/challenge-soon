import { render } from '@testing-library/react-native';

import { ProviderTesting } from '@utils/ProviderTesting';

import { Map } from '@screens/Map';

jest.useFakeTimers();

test('renders correctly', () => {
	const screen = render(
		<ProviderTesting>
			<Map />
		</ProviderTesting>,
	).toJSON();

	expect(screen).toMatchSnapshot();
});
