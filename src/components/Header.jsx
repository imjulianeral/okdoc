import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useEffect, useContext } from 'react'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@material-ui/core'
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons'
import { headerStyles } from './material/Material.config'

import { FirebaseContext } from '../firebase/context'
import useAuth from '../hooks/useAuth'

function Header(props) {
  const { siteTitle } = props
  const { firebase } = useContext(FirebaseContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const user = useAuth()

  const open = Boolean(anchorEl)

  const classes = headerStyles()

  // const handleChange = event => {
  //   setAuth(event.target.checked)
  // }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const fetchData = async () => {
      const children = await firebase.db.collection('children').get()
      console.log(
        children.docs.map(child =>
          Object.assign(child.data(), { id: child.id })
        )
      )
    }
    fetchData()
  }, [firebase])

  return (
    <AppBar>
      <Toolbar>
        {user && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        )}
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
              <MenuItem onClick={handleClose}>
                <Link
                  to="/perfil"
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  Perfil
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  to="/"
                  onClick={() => firebase.auth.signOut()}
                  style={{ textDecoration: 'none', color: '#000' }}
                >
                  Cerrar Sesión
                </Link>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<AccountCircle />}
                style={{ marginRight: '1rem' }}
              >
                Iniciar Sesión
              </Button>
            </Link>
            <Link
              to="/crear-cuenta"
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                endIcon={<AccountCircle />}
              >
                Crear Cuenta
              </Button>
            </Link>
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
