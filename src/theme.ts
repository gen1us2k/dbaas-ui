import { ThemeOptions } from '@mui/material';
import { GrafanaTheme2 } from '@grafana/data';

// const customColors = {
//   bunker: '#11181e',
// } as const;
//
// const baseBackgroundPrimaryColor = customColors.bunker;

// eslint-disable-next-line import/prefer-default-export

export default (grafanaTheme: GrafanaTheme2): ThemeOptions => ({
  palette: {
    mode: 'dark',
    // primary: {
    //   main: grafanaTheme.colors.background.secondary,
    //   light: grafanaTheme.colors.background.primary,
    //   dark: grafanaTheme.colors.background.canvas,
    // },
    background: {
      default: grafanaTheme.colors.background.canvas,
      paper: grafanaTheme.colors.background.primary,
    },
    text: {
      primary: grafanaTheme.colors.text.primary,
      secondary: grafanaTheme.colors.text.secondary,
      disabled: grafanaTheme.colors.text.disabled,
    },
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: grafanaTheme.colors.text.secondary,
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          backgroundColor: grafanaTheme.colors.background.canvas,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: grafanaTheme.colors.secondary.shade,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'rgb(41, 41, 41)',
        },
      },
    },
  },
});

// export const lightTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#363637',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//   },
// });
