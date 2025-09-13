import { Text, StyleSheet } from "react-native";

interface ScoreProps {
	score: number;
	palette: {
		primary: string;
		secondary: string;
		tertiary: string;
		background: string;
	};
}

export default function Score({ score, palette }: ScoreProps): React.ReactElement {
	return <Text style={[styles.text, { color: palette.tertiary }]}>🍎 {score}</Text>;
}

const styles = StyleSheet.create({
	text: {
		fontSize: 22,
		fontWeight: "bold",
	},
});
