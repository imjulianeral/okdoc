import React from 'react'
import { Link } from 'gatsby'
import useAuth from '../../hooks/useAuth'
import useQuery from '../../hooks/useQuery'
import useProfile from '../../hooks/useProfile'

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
import Status from '../Status'

export default function DoctorsList() {
  const { fetchingUser } = useAuth()
  const { userRecord, isLoading } = useProfile()
  const { records } = useQuery('Doctor', 'createdAt')
  const classes = avatarStyles()

  if (fetchingUser || isLoading) return <Spinner />

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
                {records.map(doctor => (
                  <ListItem
                    button={userRecord.type !== 'Admin'}
                    key={doctor.id}
                    component={userRecord.type !== 'Admin' && Link}
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
                    {!isLoading && userRecord.type === 'Admin' && (
                      <Status STATUS={doctor.status} ID={doctor.id} />
                    )}
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
