import { makeStyles, createMuiTheme } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minWidth: 250,
    marginTop: 50,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}))

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1ABC9C',
      light: '#15eda3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#03dac6',
    },
  },
})

export const headerStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))
