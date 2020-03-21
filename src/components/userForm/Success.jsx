import React from 'react'

import { Container, Paper, Grid, Button } from '@material-ui/core'

export default function Success({ createProfile }) {
  createProfile()
  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <Paper style={{ padding: '1rem' }}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <h2 style={{ color: '#163a5f' }}>Tu perfil ha sido completado</h2>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" href="/perfil">
              Ver perfil
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
