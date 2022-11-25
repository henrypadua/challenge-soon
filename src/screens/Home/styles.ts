import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	textInput: {
		padding: 10,
		backgroundColor: '#eee',
		marginVertical: 5,
		marginLeft: 40,
		marginRight: 15,
		borderRadius: 10,
		fontSize: 15,
	},
	separator: {
		backgroundColor: '#efefef',
		height: 1,
	},
	listView: {
		position: 'absolute',
		top: 110,
		marginLeft: 20,
		marginRight: 15,
	},
	listViewDestination: {
		position: 'absolute',
		top: 55,
		marginLeft: 20,
		marginRight: 15,
	},
	autocompleteContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},

	row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
	},
	iconContainer: {
		backgroundColor: '#242E42',
		padding: 5,
		borderRadius: 50,
		marginRight: 10,
	},
	locationText: {},

	circle: {
		position: 'absolute',
		top: 20,
		left: 10,
	},
	line: {
		position: 'absolute',
		top: 40,
		left: 18,
	},
	square: {
		position: 'absolute',
		top: 75,
		left: 10,
	},
});

export default styles;
