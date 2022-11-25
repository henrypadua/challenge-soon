import { render } from '@testing-library/react-native';

import { ProviderTesting } from '@utils/ProviderTesting';

import { Home } from '@screens/Map';

jest.useFakeTimers();

test('renders correctly', () => {
	const screen = render(
		<ProviderTesting>
			<Home />
		</ProviderTesting>,
	).toJSON();

	expect(screen).toMatchSnapshot();
});
