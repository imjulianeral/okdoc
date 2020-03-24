import React, { useEffect, useState } from 'react'
import { Grid, Button } from '@material-ui/core'
import { NavigateBefore } from '@material-ui/icons'

import Alert from '../Alert'

export default function Incomplete({ errors, prevStep }) {
  const [errorArray, setErrorArray] = useState([])

  useEffect(() => {
    setErrorArray(Object.values(errors))
  }, [])

  const back = e => {
    e.preventDefault()
    prevStep()
  }
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={12}>
        <h2 style={{ color: '#163a5f' }}>
          No has completado tu perfil, por favor completalo
        </h2>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={back}
          style={{ marginRight: '1rem' }}
        >
          <NavigateBefore />
        </Button>
      </Grid>
      {errorArray &&
        errorArray.map((error, idx) => (
          <Alert key={idx} text={error} variant="error" />
        ))}
    </Grid>
  )
}
