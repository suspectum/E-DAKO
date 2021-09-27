export function componentStyleOverrides(themeOption) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: 'capitalize',
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: `${themeOption.customization.borderRadius}px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: themeOption.colors.textDark,
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: themeOption.darkTextPrimary,
          borderRadius: `${themeOption.customization.borderRadius}px`,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: themeOption.menuSelected,
            backgroundColor: themeOption.menuSelectedBack,
            '&:hover': {
              backgroundColor: themeOption.menuSelectedBack,
            },
            '& .MuiListItemIcon-root': {
              color: themeOption.menuSelected,
            },
          },
          '&:hover': {
            backgroundColor: themeOption.menuSelectedBack,
            color: themeOption.menuSelected,
            '& .MuiListItemIcon-root': {
              color: themeOption.menuSelected,
            },
          },
        },
      },
    },

    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: themeOption.darkTextPrimary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: themeOption.textDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: themeOption.textDark,
          '&::placeholder': {
            color: themeOption.darkTextSecondary,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '48px',
          background: themeOption.colors.grey50,
          borderRadius: `${themeOption.customization.borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeOption.colors.grey400,
          },
          '&:hover $notchedOutline': {
            borderColor: themeOption.colors.primaryLight,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          height: 'inherit',
          fontWeight: 500,
          background: themeOption.colors.grey50,
          padding: '0px 14px',
          borderRadius: `${themeOption.customization.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `${themeOption.customization.borderRadius}px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: themeOption.colors.grey300,
          },
        },
        mark: {
          backgroundColor: themeOption.paper,
          width: '4px',
        },
        valueLabel: {
          color: themeOption.colors.primaryLight,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: themeOption.divider,
          opacity: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: themeOption.colors.primaryDark,
          background: themeOption.colors.primary200,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: themeOption.paper,
          background: themeOption.colors.grey700,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
  };
}
