import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useContext } from 'react'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
} from '@material-ui/core'
import { AccountCircle, Face, PersonAdd, ExitToApp } from '@material-ui/icons'
import { headerStyles } from './material/Material.config'

import { FirebaseContext } from '../firebase/context'
import useAuth from '../hooks/useAuth'
import useProfile from '../hooks/useProfile'

function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { firebase } = useContext(FirebaseContext)
  const { user } = useAuth()
  const { userRecord, isLoading } = useProfile()
  const { siteTitle } = props
  const classes = headerStyles()
  const open = Boolean(anchorEl)

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar color="secondary">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Link
            to="/"
            style={{
              textDecoration: 'none',
            }}
          >
            <Button
              style={{
                color: '#03947e',
                textTransform: 'none',
              }}
            >
              {siteTitle}
            </Button>
          </Link>
        </Typography>
        {user ? (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt={user.displayName} src={user.photoURL} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              {!isLoading && userRecord.type !== 'Admin' && (
                <Link
                  to="/app/perfil"
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Face color="primary" fontSize="small" />
                    </ListItemIcon>
                    Perfil
                  </MenuItem>
                </Link>
              )}
              <Link
                to="/"
                onClick={() => firebase.auth().signOut()}
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ExitToApp color="primary" fontSize="small" />
                  </ListItemIcon>
                  Cerrar Sesión
                </MenuItem>
              </Link>
            </Menu>
          </>
        ) : (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <Link
                to="/login"
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Face color="primary" fontSize="small" />
                  </ListItemIcon>
                  Iniciar Sesión
                </MenuItem>
              </Link>
              <Link
                to="/crear-cuenta"
                style={{ textDecoration: 'none', color: '#000' }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd color="primary" fontSize="small" />
                  </ListItemIcon>
                  Crear Cuenta
                </MenuItem>
              </Link>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
