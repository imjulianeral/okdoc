import React, { useContext, useEffect } from 'react'
import { FirebaseContext } from '../../firebase/context'
import useAuth from '../../hooks/useAuth'

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
  Avatar,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import { NavigateNext, Edit } from '@material-ui/icons'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { formStyles, avatarStyles } from '../material/Material.config'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/es'
import Spinner from '../Spinner'

moment.locale('es')

export default function AccountType({
  nextStep,
  user,
  setUser,
  handleChange,
  isLoading,
  userRecord,
}) {
  const authUser = useAuth()
  const { firebase } = useContext(FirebaseContext)
  const classes = formStyles()
  const avatarClasses = avatarStyles()
  const next = e => {
    e.preventDefault()
    if (user.type === 'Paciente') setUser({ ...user, status: 'ACTIVADO' })
    else if (user.type === 'Doctor' && user.avatar !== '') setUser({ ...user })
    else setUser({ ...user, status: 'PENDIENTE' })
    nextStep()
  }
  const fileSelectedHandler = async e => {
    await firebase
      .storage()
      .ref()
      .child(`avatars/${authUser.uid}`)
      .put(e.target.files[0])

    const image = await firebase
      .storage()
      .ref(`avatars/${authUser.uid}`)
      .getDownloadURL()

    setUser({
      ...user,
      avatar: image,
    })
  }

  if (isLoading) return <Spinner />
  return (
    <Container maxWidth="xs" style={{ marginTop: '5rem' }}>
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
                {user.status !== '' ? (
                  <h2 style={{ color: '#163a5f' }}>Edita tu cuenta</h2>
                ) : (
                  <h2 style={{ color: '#163a5f' }}>Configura tu cuenta</h2>
                )}
              </Grid>
              {!userRecord && (
                <Grid item xs={12}>
                  <KeyboardDatePicker
                    disableFuture
                    openTo="year"
                    format="DD/MM/YYYY"
                    label="Fecha de Nacimiento"
                    views={['year', 'month', 'date']}
                    value={userRecord ? user.birthday.toDate() : user.birthday}
                    defaultValue={moment().format('DD/MM/YYYY')}
                    onChange={handleChange}
                  />
                </Grid>
              )}
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
              {user.type === 'Doctor' && (
                <Grid item xs={12}>
                  <FormControl
                    className={classes.formControl}
                    style={{ minWidth: '15.5rem' }}
                  >
                    <TextField
                      required
                      variant="outlined"
                      name="name"
                      label="Escribe tu nombre"
                      value={user.name}
                      onChange={handleChange}
                    />
                    <FormHelperText>Escribe tu nombre completo</FormHelperText>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12}>
                {!userRecord && (
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
                )}
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
              <Grid
                item
                xs={12}
                style={{ marginTop: '1rem', marginBottom: '2rem' }}
              >
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Avatar className={avatarClasses.large} src={user.avatar} />
                  </Grid>
                  <Grid item xs={6} style={{ marginTop: '4rem' }}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      onChange={fileSelectedHandler}
                    />
                    <Tooltip title="Subir imagen de perfil" placement="right">
                      <label htmlFor="contained-button-file">
                        <IconButton component="span">
                          <Edit />
                        </IconButton>
                      </label>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={next}
                  disabled={
                    !user.type || !user.phone || !user.birthday || !user.avatar
                  }
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
