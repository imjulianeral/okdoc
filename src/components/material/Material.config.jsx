import {
  makeStyles,
  withStyles,
  createMuiTheme,
} from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import { IconButton, Button } from '@material-ui/core'

export const formStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minwidth: '15rem',
    maxWidth: '16rem',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
}))

export const navBottomStyles = makeStyles(theme => ({
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
}))

export const avatarStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
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
}))(IconButton)
export const DownloadRedBTN = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button)
