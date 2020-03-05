import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { theme } from './material/Material.config'

import Header from './Header'

import '../css/layout.css'
import '../css/index.css'

function Layout({ children }) {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <footer style={{ marginTop: '20rem' }}>
        Todos los derechos reservados &copy; {new Date().getFullYear()}
      </footer>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
