import React from 'react'
import { Link } from 'gatsby'

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { Favorite, LocalHospital, Event, PersonPin } from '@material-ui/icons'

export default function BottomNav() {
  const [value, setValue] = React.useState(3)

  return (
    <>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className="footer"
      >
        <BottomNavigationAction
          component={Link}
          to="/favoritos"
          label="Favoritos"
          icon={<Favorite />}
        />
        <BottomNavigationAction
          component={Link}
          to="/doctores"
          label="Doctores"
          icon={<LocalHospital />}
        />
        <BottomNavigationAction
          component={Link}
          to="/citas"
          label="Citas"
          icon={<Event />}
        />
        <BottomNavigationAction
          component={Link}
          to="/perfil"
          label="Perfil"
          icon={<PersonPin />}
        />
      </BottomNavigation>
    </>
  )
}
