export function themePalette(themeOption) {
  return {
    primary: {
      light: themeOption.colors.primaryLight,
      main: themeOption.colors.primaryMain,
      dark: themeOption.colors.primaryDark,
      200: themeOption.colors.primary200,
      800: themeOption.colors.primary800,
    },
    secondary: {
      light: themeOption.colors.secondaryLight,
      main: themeOption.colors.secondaryMain,
      dark: themeOption.colors.secondaryDark,
      200: themeOption.colors.secondary200,
      800: themeOption.colors.secondary800,
    },
    error: {
      light: themeOption.colors.errorLight,
      main: themeOption.colors.errorMain,
      dark: themeOption.colors.errorDark,
    },
    orange: {
      light: themeOption.colors.orangeLight,
      main: themeOption.colors.orangeMain,
      dark: themeOption.colors.orangeDark,
    },
    warning: {
      light: themeOption.colors.warningLight,
      main: themeOption.colors.warningMain,
      dark: themeOption.colors.warningDark,
    },
    success: {
      light: themeOption.colors.successLight,
      200: themeOption.colors.success200,
      main: themeOption.colors.successMain,
      dark: themeOption.colors.successDark,
    },
    grey: {
      50: themeOption.colors.grey50,
      100: themeOption.colors.grey100,
      500: themeOption.darkTextSecondary,
      600: themeOption.heading,
      700: themeOption.darkTextPrimary,
      900: themeOption.textDark,
    },
    text: {
      primary: themeOption.darkTextPrimary,
      secondary: themeOption.darkTextSecondary,
      dark: themeOption.textDark,
      hint: themeOption.colors.grey100,
    },
    background: {
      paper: themeOption.paper,
      default: themeOption.backgroundDefault,
    },
  };
}
