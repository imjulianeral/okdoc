import React from 'react'

import {
  Container,
  Paper,
  Grid,
  FormControl,
  FormHelperText,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Grow,
} from '@material-ui/core'
import { NavigateNext } from '@material-ui/icons'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { formStyles } from '../material/Material.config'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')

export default function AccountType({ nextStep, user, setUser, handleChange }) {
  const classes = formStyles()
  const next = e => {
    e.preventDefault()
    if (user.type === 'Paciente') setUser({ ...user, status: 'ACTIVADO' })
    else setUser({ ...user, status: 'PENDIENTE' })
    nextStep()
  }

  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <MuiPickersUtilsProvider
        libInstance={moment}
        utils={MomentUtils}
        locale={moment.locale('es')}
      >
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
                <h2 style={{ color: '#163a5f' }}>Configura tu cuenta</h2>
              </Grid>
              <Grid item xs={12}>
                <KeyboardDatePicker
                  disableFuture
                  openTo="year"
                  format="DD/MM/YYYY"
                  label="Fecha de Nacimiento"
                  views={['year', 'month', 'date']}
                  value={user.birthday}
                  defaultValue={moment().format('DD/MM/YYYY')}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: '1rem' }}>
                <FormControl className={classes.formControl}>
                  <TextField
                    required
                    variant="outlined"
                    name="phone"
                    label="Número celular"
                    value={user.phone}
                    onChange={handleChange}
                  />
                  <FormHelperText>
                    Escribir un número donde se te pueda llamar
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  required
                  className={classes.formControl}
                >
                  <InputLabel id="type">Tipo de Cuenta</InputLabel>
                  <Select
                    labelId="type"
                    id="type"
                    name="type"
                    value={user.type}
                    onChange={handleChange}
                    label="Tipo de Cuenta"
                    style={{ minWidth: '15.5rem' }}
                  >
                    <MenuItem value="">
                      <em>Seleccionar:</em>
                    </MenuItem>
                    <MenuItem value="Paciente">Paciente</MenuItem>
                    <MenuItem value="Doctor">Doctor</MenuItem>
                  </Select>
                  <FormHelperText>Doctor o Paciente</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} style={{ marginTop: '1rem' }}>
                <FormControl
                  variant="outlined"
                  required
                  className={classes.formControl}
                  error
                >
                  <InputLabel id="city">Ciudad</InputLabel>
                  <Select
                    disabled
                    labelId="city"
                    id="city"
                    name="city"
                    value={user.city}
                    label="Tipo de Cuenta"
                  >
                    <MenuItem value={user.city}>{user.city}</MenuItem>
                  </Select>
                  <FormHelperText>
                    Debes de residir en Aguascalientes, México. De otra forma
                    cerraremos tu cuenta
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={next}
                  disabled={!user.type || !user.phone || !user.birthday}
                >
                  <NavigateNext />
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grow>
      </MuiPickersUtilsProvider>
    </Container>
  )
}
