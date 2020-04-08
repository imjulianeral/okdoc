import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Modal,
  Backdrop,
  Fade,
  Paper,
  Container,
  Grid,
  FormControl,
  FormHelperText,
  TextField,
  Button,
} from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { EventAvailable } from '@material-ui/icons'

import MomentUtils from '@date-io/moment'
import moment from 'moment'
import 'moment/locale/es'

import Map from '../Maps/Map'
import Spinner from '../Spinner'
import PlaceSelect from '../Maps/PlaceSelect'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #1ABC9C',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
  },
}))

export default function DateForm({ open, setOpen, date }) {
  const [selectedDate, handleDateChange] = useState()
  const [address, setAdress] = useState('')
  const [description, setDescription] = useState('')
  const [mapPosition, setMapPosition] = useState({
    lat: 21.8818,
    lng: -102.291,
  })

  const classes = useStyles()

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    handleDateChange(date)
  }, [date])

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper variant="outlined" className={classes.paper}>
          <MuiPickersUtilsProvider
            libInstance={moment}
            utils={MomentUtils}
            locale={moment.locale('es')}
          >
            <Container maxWidth="xs">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <h2 style={{ color: '#163a5f', textAlign: 'center' }}>
                  Agendar Cita
                </h2>
                <Grid item xs={12}>
                  <DateTimePicker
                    style={{ width: '16rem', margin: '0 auto' }}
                    label="Fecha y Hora"
                    inputVariant="outlined"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: '1rem' }}>
                  <PlaceSelect
                    inputValue={address}
                    setInputValue={setAdress}
                    setMapPosition={setMapPosition}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: '1rem', width: '16rem' }}
                >
                  <TextField
                    label="Descripción de los síntomas"
                    multiline
                    fullWidth
                    rows="3"
                    variant="outlined"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: '1rem', width: '16rem', height: '1rem' }}
                >
                  <Map
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.GATSBY_GOOGLE_MAPS}&libraries=places`}
                    containerElement={<div style={{ height: `20rem` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    loadingElement={<Spinner />}
                    mapPosition={mapPosition}
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: '1rem' }}>
                  <Button
                    fullWidth
                    color="primary"
                    startIcon={<EventAvailable />}
                  >
                    Crear Cita
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </MuiPickersUtilsProvider>
        </Paper>
      </Fade>
    </Modal>
  )
}
