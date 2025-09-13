import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Coordinate } from "../types/types";

interface SnakeProps {
	snake: Coordinate[];
	palette: {
		primary: string;
		secondary: string;
		tertiary: string;
		background: string;
	};
}

export default function Snake({ snake, palette }: SnakeProps): React.ReactElement {
	return (
		<Fragment>
			{snake.map((segment: any, index: number) => {
				const segmentStyle = {
					left: segment.x * 10,
					top: segment.y * 10,
                    backgroundColor: palette.primary,
				};
				return <View key={index} style={[styles.snake, segmentStyle]} />;
			})}
		</Fragment>
	);
}
const styles = StyleSheet.create({
	snake: {
		width: 15,
		height: 15,
		borderRadius: 7,
		position: "absolute",
	},
});
