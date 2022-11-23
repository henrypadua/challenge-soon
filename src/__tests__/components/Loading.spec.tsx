import { render } from '@testing-library/react-native';

import { ProviderTesting } from '@utils/ProviderTesting';

import { Loading } from '@components/Loading';

jest.useFakeTimers();

test('renders correctly', () => {
	const screen = render(
		<ProviderTesting>
			<Loading />
		</ProviderTesting>,
	).toJSON();

	expect(screen).toMatchSnapshot();
});
