import {
  makeStyles,
  withStyles,
  createMuiTheme,
} from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import Button from '@material-ui/core/Button'

export const formStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '15.5rem',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: 'none',
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
  // typography: {
  //   // Tell Material-UI what's the font-size on the html element is.
  //   htmlFontSize: 10,
  // },
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

export const RedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button)
