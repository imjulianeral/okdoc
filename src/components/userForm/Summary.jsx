import React from 'react'

import {
  Container,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Grow,
} from '@material-ui/core'
import { NavigateNext, NavigateBefore } from '@material-ui/icons'

import moment from 'moment'

import useAuth from '../../hooks/useAuth'

export default function Summary({
  user: { birthday, type, children, features, phone },
  nextStep,
  prevStep,
  handleSubmit,
}) {
  const user = useAuth()
  const next = e => {
    e.preventDefault()
    handleSubmit()
    nextStep()
  }
  const back = e => {
    e.preventDefault()
    prevStep()
  }

  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Paper style={{ padding: '1rem' }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <h2 style={{ color: '#163a5f' }}>Verifica tu Perfil</h2>
            </Grid>
            <Grid item xs={12}>
              <Paper variant="outlined">
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
                          secondary={user ? user.displayName : null}
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItem button style={{ textAlign: 'center' }}>
                        <ListItemText
                          primary="Edad"
                          secondary={moment().diff(birthday, 'years')}
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItem button style={{ textAlign: 'center' }}>
                        <ListItemText
                          primary="Tipo de cuenta"
                          secondary={type}
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItem button style={{ textAlign: 'center' }}>
                        <ListItemText
                          primary={type === 'Doctor' ? 'Logros' : 'Hijos'}
                          secondary={
                            type === 'Doctor'
                              ? features.length
                              : children.length
                          }
                        />
                      </ListItem>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItem button style={{ textAlign: 'center' }}>
                        <ListItemText
                          primary="Número Celular"
                          secondary={phone}
                        />
                      </ListItem>
                    </Grid>
                    {type === 'Doctor' && (
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
              </Paper>
            </Grid>

            <Grid item xs={12} style={{ marginTop: '2rem' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={back}
                style={{ marginRight: '1rem' }}
              >
                <NavigateBefore />
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={next}
              >
                <NavigateNext />
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Container>
  )
}
