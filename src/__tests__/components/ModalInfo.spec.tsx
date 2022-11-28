import { render } from '@testing-library/react-native';

import { ProviderTesting } from '@utils/ProviderTesting';

import { ModalInfo } from '@components/ModalInfo';

const setOpenModal = jest.fn();

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
			<ModalInfo openModal={true} setOpenModal={setOpenModal} />
		</ProviderTesting>,
	).toJSON();

	expect(screen).toMatchSnapshot();
});
