import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { theme } from './material/Material.config'
import { SnackbarProvider } from 'notistack'

import { FirebaseContext } from '../firebase/context'

import useFirebase from '../hooks/useFirebase'
import useAuth from '../hooks/useAuth'
import useProfile from '../hooks/useProfile'

import Header from './Header'

import '../css/layout.css'
import BottomNav from './BottomNav'
import BottomAdmin from './BottomAdmin'

function Layout({ children }) {
  const { user } = useAuth()
  const { userRecord, isLoading } = useProfile()
  const firebase = useFirebase()

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={10}>
          <CssBaseline />
          <Header siteTitle={data.site.siteMetadata.title} />
          <main>{children}</main>
          {!isLoading && userRecord.type === 'Admin' ? (
            <BottomAdmin user={user} />
          ) : (
            <BottomNav user={user} />
          )}
        </SnackbarProvider>
      </ThemeProvider>
    </FirebaseContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
