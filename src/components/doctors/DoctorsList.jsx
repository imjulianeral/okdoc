import React, { useEffect, useContext } from 'react'
import { Link, navigate } from 'gatsby'
import { FirebaseContext } from '../../firebase/context'
import useAuth from '../../hooks/useAuth'
import useDoctors from '../../hooks/useDoctors'

import {
  Container,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Grow,
  Avatar,
} from '@material-ui/core'
import { avatarStyles } from '../material/Material.config'

import Spinner from '../Spinner'

export default function DoctorsList() {
  const { firebase } = useContext(FirebaseContext)
  const user = useAuth()
  const { doctors, isLoading } = useDoctors('createdAt')

  const classes = avatarStyles()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) return navigate('login')
    })
  }, [firebase])

  if (!user || isLoading) return <Spinner />

  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Paper variant="outlined">
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} lg={12}>
              <List>
                {doctors.map(doctor => (
                  <ListItem
                    button
                    key={doctor.id}
                    component={Link}
                    to={`/app/doctor/${doctor.id}`}
                  >
                    <ListItemAvatar>
                      <Avatar src={doctor.avatar} className={classes.medium} />
                    </ListItemAvatar>
                    <ListItemText primary="Nombre" secondary={doctor.name} />
                    <ListItemText
                      primary="Logros"
                      secondary={doctor.features.length}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Container>
  )
}
