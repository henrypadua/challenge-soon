import { extendTheme } from 'native-base';

export const theme = extendTheme({
	fonts: {
		heading: 'Inter_700Bold',
		body: 'Inter_400Regular',
	},
	fontSizes: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 20,
	},
	sizes: {
		14: 56,
	},
});
