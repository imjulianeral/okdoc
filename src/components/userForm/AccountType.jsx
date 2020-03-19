import React from 'react'

import { Container } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')

export default function AccountType({ nextStep, user }) {
  const next = e => {
    e.preventDefault()
    nextStep()
  }

  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2002-01-01T21:11:54')
  )

  const handleDateChange = date => {
    setSelectedDate(date)
  }

  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <MuiPickersUtilsProvider
        libInstance={moment}
        utils={MomentUtils}
        locale={moment.locale('es')}
      >
        <KeyboardDatePicker
          disableFuture
          openTo="year"
          format="DD/MM/YYYY"
          label="Fecha de Nacimiento"
          views={['year', 'month', 'date']}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </Container>
  )
}
