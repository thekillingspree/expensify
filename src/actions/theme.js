import { SET_DARK, SET_THEME, black } from "../constants";

export const setDarkMode = darkMode => ({
    type: SET_DARK,
    darkMode
});

export const setTheme = color => {
    return {
        type: SET_THEME,
        color
    }
};