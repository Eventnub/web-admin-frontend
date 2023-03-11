// ----------------------------------------------------------------------

export default function Typography(theme) {
  const customHeaderStyle = { color: '#1A4187' };
  const customSubtitleStyle = { color: '#1A4187' };
  const customBodyStyle = { color: '#547196' };

  return {
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
        h1: customHeaderStyle,
        h2: customHeaderStyle,
        h3: customHeaderStyle,
        h4: customHeaderStyle,
        h5: customHeaderStyle,
        h6: customHeaderStyle,
        subtitle1: customSubtitleStyle,
        subtitle2: customSubtitleStyle,
        body1: customBodyStyle,
        body2: customBodyStyle,
      },
    },
  };
}
