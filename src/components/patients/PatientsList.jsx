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

export default function PatientsList() {
  const { userRecord, isLoading } = useProfile()
  const { fetchingUser } = useAuth()
  const { records } = useQuery('Paciente', 'createdAt')
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
                {records.map(paciente => (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    key={paciente.id}
                  >
                    <Grid item xs={10}>
                      <ListItem
                        button
                        component={Link}
                        to={`/app/doctor/${paciente.id}`}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={paciente.avatar}
                            className={classes.medium}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Nombre"
                          secondary={paciente.name}
                        />
                        <ListItemText
                          primary="Hijos"
                          secondary={paciente.children.length}
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={2}>
                      {!isLoading && userRecord.type === 'Admin' && (
                        <Status STATUS={paciente.status} ID={paciente.id} />
                      )}
                    </Grid>
                  </Grid>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Container>
  )
}
