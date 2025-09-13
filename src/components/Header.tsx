import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import { useEffect } from "react";

interface HeaderProps {
	reloadGame: () => void;
	pauseGame: () => void;
	children: React.ReactElement;
	isPaused: boolean;
	palette: {
		primary: string;
		secondary: string;
		tertiary: string;
		background: string;
	};
}

export default function Header({
	children,
	reloadGame,
	pauseGame,
	isPaused,
    palette,
}: HeaderProps): React.ReactElement {
	const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
		Updates.useUpdates();

	useEffect(() => {
		if (isUpdatePending) {
			Updates.reloadAsync();
		}
	}, [isUpdatePending]);

	const showDownloadButton = isUpdateAvailable;

	const runTypeMessage = currentlyRunning.isEmbeddedLaunch
		? "This app is running from built-in code"
		: "This app is running an update";

	return (
		<View style={[styles.container, { borderColor: palette.primary, backgroundColor: palette.background }]}>
			<Text
				style={{
					position: "absolute",
					bottom: 1,
					left: "35%",
					color: "gray",
					fontSize: 10,
				}}
			>
				{runTypeMessage}
			</Text>
			<TouchableOpacity onPress={reloadGame}>
				<Ionicons name="reload-circle" size={35} color={palette.primary} />
			</TouchableOpacity>

			<TouchableOpacity onPress={Updates.checkForUpdateAsync}>
				<FontAwesome name={"refresh"} size={35} color={palette.primary} />
			</TouchableOpacity>

			{showDownloadButton ? (
				<TouchableOpacity onPress={Updates.fetchUpdateAsync}>
					<FontAwesome name={"check"} size={35} color={palette.primary} />
				</TouchableOpacity>
			) : null}

			<TouchableOpacity onPress={pauseGame}>
				<FontAwesome
					name={isPaused ? "play-circle" : "pause-circle"}
					size={35}
					color={palette.primary}
				/>
			</TouchableOpacity>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0.05,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 12,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		borderBottomWidth: 0,
		padding: 15,
	},
});
