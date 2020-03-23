import React from 'react'
import { Grid, Button } from '@material-ui/core'

export default function Completed() {
  return (
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
  )
}
