import React from 'react'
import {
  Container,
  Paper,
  Grow,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { avatarStyles } from '../material/Material.config'

import moment from 'moment'

export default function ProfileData({ user, children }) {
  const classes = avatarStyles()
  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Paper variant="outlined" style={{ padding: '1rem' }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <h2 style={{ color: '#163a5f' }}>{user.name}</h2>
            <Avatar
              alt={user.name}
              src={user.avatar}
              className={classes.large}
            />
            <List>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={6}>
                  <ListItem button style={{ textAlign: 'center' }}>
                    <ListItemText
                      primary="Nombre"
                      secondary={user ? user.name : null}
                    />
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem button style={{ textAlign: 'center' }}>
                    <ListItemText
                      primary="Edad"
                      secondary={moment().diff(user.birthday.toDate(), 'years')}
                    />
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem button style={{ textAlign: 'center' }}>
                    <ListItemText
                      primary="Tipo de cuenta"
                      secondary={user.type}
                    />
                  </ListItem>
                </Grid>
                <Grid item xs={6}>
                  <ListItem button style={{ textAlign: 'center' }}>
                    <ListItemText
                      primary="Número Celular"
                      secondary={user.phone}
                    />
                  </ListItem>
                </Grid>
                <Grid item xs={12}>
                  <ListItem button style={{ textAlign: 'center' }}>
                    <ListItemText
                      primary={user.type === 'Doctor' ? 'Logros' : 'Hijos'}
                      secondary={
                        user.type === 'Doctor'
                          ? user.features.length
                          : children.docs.map((child, idx) => (
                              <ListItem button key={idx}>
                                <ListItemText
                                  primary="Nombre"
                                  secondary={child.data().name}
                                />
                                <ListItemText
                                  primary="Edad"
                                  secondary={moment().diff(
                                    child.data().birthday.toDate(),
                                    'years'
                                  )}
                                />
                              </ListItem>
                            ))
                      }
                    />
                  </ListItem>
                </Grid>
                {user.type === 'Doctor' && (
                  <Grid item xs={12}>
                    <ListItem button style={{ textAlign: 'center' }}>
                      <ListItemText
                        primary="Estado de tu cuenta"
                        secondary="Al ser tu cuenta de tipo Doctor tenemos que revisar tu curriculum para luego proceder a una entrevista"
                      />
                    </ListItem>
                  </Grid>
                )}
              </Grid>
            </List>
          </Grid>
        </Paper>
      </Grow>
    </Container>
  )
}
