import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	baseContainer: {
		position: 'absolute',
		backgroundColor: '#f2f3f3e3',
		borderRadius: 10,
		width: '80%',
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomContainerStyle: {
		bottom: 100,
	},
	topContainerStyle: {
		top: 170,
	},
	baseText: {
		fontSize: 25,
		color: '#0F2E49',
		textAlign: 'center',
		alignSelf: 'center',
		fontWeight: 'bold',
	},
});
