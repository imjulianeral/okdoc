import React, { useState } from 'react'

import {
  Container,
  Paper,
  Grid,
  FormControl,
  FormHelperText,
  Grow,
  TextField,
  Button,
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { formStyles, RedButton } from '../material/Material.config'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/es'

import {
  NavigateNext,
  NavigateBefore,
  Add,
  ChildCare,
  Delete,
} from '@material-ui/icons'

export default function Children({ nextStep, prevStep, user, setUser, boys }) {
  console.log(boys)
  const [children, setChildren] = useState(
    boys.length !== 0 ? boys : user.children
  )
  const classes = formStyles()

  const next = e => {
    e.preventDefault()
    nextStep()
    setUser({
      ...user,
      children,
    })
  }
  const back = e => {
    e.preventDefault()
    prevStep()
    setUser({
      ...user,
      children,
    })
  }
  const handleDateChange = idx => date => {
    const setBDay = children.map((child, index) => {
      if (idx !== index) return child
      return {
        ...child,
        birthday: new Date(date),
      }
    })
    setChildren(setBDay)
  }
  const handleChildChange = idx => e => {
    const newChild = children.map((child, index) => {
      if (idx !== index) return child
      return {
        ...child,
        name: e.target.value,
      }
    })
    setChildren(newChild)
  }
  const addChild = () => {
    setChildren([...children, ''])
  }
  const deleteChild = idx => () => {
    setChildren(children.filter((child, index) => idx !== index))
  }

  return (
    <Container
      maxWidth="xs"
      style={{ marginTop: '5rem', marginBottom: '5rem' }}
    >
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
                <h2 style={{ color: '#163a5f' }}>
                  Añade el perfil de tus hijos
                </h2>
              </Grid>
              {children.map((child, idx) => {
                return (
                  <Paper
                    style={{ padding: '1rem', marginTop: '1rem' }}
                    variant="outlined"
                    key={idx}
                  >
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          required
                          variant="outlined"
                          id="standard-basic"
                          label="Nombre de tu hijo"
                          value={child.name}
                          onChange={handleChildChange(idx)}
                        />
                        <FormHelperText>
                          No es necesario escribir el nombre completo
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <KeyboardDatePicker
                        disableFuture
                        disabled={child.id}
                        openTo="year"
                        format="DD/MM/YYYY"
                        label="Fecha de Nacimiento de tu hijo"
                        views={['year', 'month', 'date']}
                        value={
                          child.id ? child.birthday.toDate() : child.birthday
                        }
                        defaultValue={moment().format('DD/MM/YYYY')}
                        onChange={handleDateChange(idx)}
                      />
                    </Grid>
                    {boys.length === 0 && (
                      <Grid
                        item
                        xs={12}
                        style={{ marginTop: '1rem', textAlign: 'center' }}
                      >
                        <RedButton
                          variant="contained"
                          onClick={deleteChild(idx)}
                        >
                          <Delete />
                        </RedButton>
                      </Grid>
                    )}
                  </Paper>
                )
              })}
              <Grid
                item
                xs={12}
                style={{ marginTop: '2rem' }}
                onClick={addChild}
              >
                <Button variant="outlined" color="primary">
                  <Add />
                  <ChildCare />
                </Button>
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
                  onClick={next}
                  disabled={children.length === 0}
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
