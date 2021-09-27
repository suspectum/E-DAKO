export function themeTypography(themeOption) {
  return {
    fontFamily: themeOption.customization.fontFamily,
    h6: {
      fontSize: '0.75rem',
      color: themeOption.heading,
      fontWeight: 500,
    },
    h5: {
      fontSize: '0.875rem',
      color: themeOption.heading,
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      color: themeOption.heading,
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      color: themeOption.heading,
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      color: themeOption.heading,
      fontWeight: 700,
    },
    h1: {
      fontSize: '2.125rem',
      color: themeOption.heading,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: themeOption.textDark,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: themeOption.darkTextSecondary,
    },
    caption: {
      fontSize: '0.75rem',
      color: themeOption.darkTextSecondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: themeOption.darkTextPrimary,
    },
    customInput: {
      '& .MuiInputLabel-animated': {
        transform: 'translate(14px, -9px) scale(0.75)',
        transition: '0.1s ease all',
      },

      '& .MuiOutlinedInput-root': {
        height: 'auto',
      },
      marginTop: 8,
      marginBottom: 8,
      '& > label': {
        top: '23px',
        left: 0,
        color: themeOption.grey500,
        '&[data-shrink="false"]': {
          transform: 'translate(14px, 16px) scale(1)',
          transition: '0.1s ease all',
          top: '5px',
        },
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important',
      },
      '& legend': {
        display: 'none',
      },
      '& fieldset': {
        top: 0,
      },
    },
    mainContent: {
      backgroundColor: themeOption.background,
      width: '100%',
      minHeight: 'calc(100vh - 80px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '80px',
      marginRight: '20px',
      borderRadius: `${themeOption.customization.borderRadius}px`,
    },
    menuCaption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: themeOption.heading,
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '10px',
    },
    subMenuCaption: {
      fontSize: '0.6875rem',
      fontWeight: 500,
      color: themeOption.darkTextSecondary,
      textTransform: 'capitalize',
    },
    commonIconButton: {
      cursor: 'pointer',
      borderRadius: '8px',
      padding: '0',
    },
    smallIconButton: {
      width: '22px',
      height: '22px',
      fontSize: '1rem',
    },
    mediumIconButton: {
      width: '34px',
      height: '34px',
      fontSize: '1.25rem',
    },
    largeIconButton: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem',
    },
  };
}
