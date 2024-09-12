import { createTheme } from "@mantine/core";

export const theme = createTheme({
    fontFamily: "Open sans, sans-serif",
    primaryColor: 'cyan',
    cursorType: 'pointer', // Checkbox
    colors: {
        // https://v6.mantine.dev/theming/colors/#default-colors
        dark: [
            "#C1C2C5",
            "#A6A7AB",
            "#909296",
            "#5c5f66",
            "#373A40",
            "#2C2E33",
            "#25262b",
            "#1A1B1E",
            "#141517",
            "#101113",
        ],
    },
});
