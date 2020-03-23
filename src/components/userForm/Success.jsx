import React from 'react'

import { Container, Paper } from '@material-ui/core'

import Incomplete from './Incomplete'
import Completed from './Completed'

export default function Success({ errors, prevStep }) {
  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <Paper style={{ padding: '1rem' }}>
        {Object.keys(errors).length > 0 ? (
          <Incomplete errors={errors} prevStep={prevStep} />
        ) : (
          <Completed />
        )}
      </Paper>
    </Container>
  )
}
