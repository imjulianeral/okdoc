import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../firebase/context'

import { useParams } from '@reach/router'

import {
  Container,
  Paper,
  Grow,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import { avatarStyles } from '../material/Material.config'

export default function DoctorProfile() {
  const [doc, setDoc] = useState({})
  const { firebase } = useContext(FirebaseContext)
  const { id } = useParams()
  const classes = avatarStyles()

  useEffect(() => {
    const getDoc = async () => {
      const doctor = await firebase
        .firestore()
        .doc(`/users/${id}`)
        .get()
      setDoc(doctor.data())
    }
    getDoc()
  }, [firebase, id])

  return (
    <Container maxWidth="xs" style={{ marginTop: '7rem' }}>
      <Grow
        in={true}
        style={{ transformOrigin: '0 0 0' }}
        {...(true ? { timeout: 1000 } : {})}
      >
        <Paper variant="outlined" style={{ padding: '1rem' }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <h2 style={{ color: '#163a5f' }}>{doc.name}</h2>
            <Avatar alt={doc.name} src={doc.avatar} className={classes.large} />
          </Grid>
        </Paper>
      </Grow>
    </Container>
  )
}
