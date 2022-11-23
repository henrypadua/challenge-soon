import { NativeBaseProvider, NativeBaseProviderProps } from 'native-base';

import { theme } from '@styles/theme';

export const ProviderTesting = (props: NativeBaseProviderProps) => {
	const inset = {
		frame: { x: 0, y: 0, width: 0, height: 0 },
		insets: { top: 0, left: 0, right: 0, bottom: 0 },
	};

	return (
		<NativeBaseProvider initialWindowMetrics={inset} theme={theme}>
			{props.children}
		</NativeBaseProvider>
	);
};
