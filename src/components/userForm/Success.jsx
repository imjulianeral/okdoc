import React from 'react'

import { Container, Paper, Grow } from '@material-ui/core'

import Incomplete from './Incomplete'
import Completed from './Completed'

export default function Success({ errors, prevStep }) {
  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Paper style={{ padding: '1rem' }}>
          {errors ? (
            <Incomplete errors={errors} prevStep={prevStep} />
          ) : (
            <Completed />
          )}
        </Paper>
      </Grow>
    </Container>
  )
}
