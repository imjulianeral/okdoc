import React from 'react'
import { Link } from 'gatsby'

import useProfile from '../../hooks/useProfile'
import useAuth from '../../hooks/useAuth'
import useQuery from '../../hooks/useQuery'

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
  Button,
} from '@material-ui/core'
import { PersonAdd } from '@material-ui/icons'
import { avatarStyles } from '../material/Material.config'

import Spinner from '../Spinner'
import Status from '../Status'
import SEO from '../SEO'

export default function AdminsList() {
  const { fetchingUser } = useAuth()
  const { userRecord, isLoading } = useProfile()
  const { records } = useQuery('Admin', 'createdAt')
  const classes = avatarStyles()

  if (fetchingUser || isLoading) return <Spinner />

  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <SEO title="Administradores" />
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Paper variant="outlined">
          <Button
            variant="outlined"
            color="primary"
            fullWidth={true}
            href="/app/crear-admin"
            startIcon={<PersonAdd />}
          >
            Añadir Admin
          </Button>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} lg={12}>
              <List>
                {records.map(admin => (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    key={admin.id}
                  >
                    <Grid item xs={10}>
                      <ListItem
                        key={admin.id}
                        button
                        component={Link}
                        to={`/app/usuario/${admin.id}`}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={admin.avatar}
                            className={classes.medium}
                          />
                        </ListItemAvatar>
                        <ListItemText primary="Nombre" secondary={admin.name} />
                      </ListItem>
                    </Grid>
                    <Grid item xs={2}>
                      {!isLoading && userRecord.type === 'Admin' && (
                        <Status STATUS={admin.status} ID={admin.id} />
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
