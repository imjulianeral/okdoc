import React from 'react'

import useProfile from '../hooks/useProfile'
import useAuth from '../hooks/useAuth'
import useQuery from '../hooks/useQuery'

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
import { avatarStyles } from './material/Material.config'

import Spinner from './Spinner'
import Status from './Status'

export default function AdminsList() {
  const { fetchingUser } = useAuth()
  const { userRecord, isLoading } = useProfile()
  const { records } = useQuery('Admin', 'createdAt')
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
                {records.map(admin => (
                  <ListItem key={admin.id}>
                    <ListItemAvatar>
                      <Avatar src={admin.avatar} className={classes.medium} />
                    </ListItemAvatar>
                    <ListItemText primary="Nombre" secondary={admin.name} />
                    {!isLoading && userRecord.type === 'Admin' && (
                      <Status STATUS={admin.status} ID={admin.id} />
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
