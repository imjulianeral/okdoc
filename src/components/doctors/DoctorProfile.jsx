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
import { PictureAsPdf } from '@material-ui/icons'
import { avatarStyles, DownloadRedBTN } from '../material/Material.config'

import useProfile from '../../hooks/useProfile'

export default function DoctorProfile() {
  const [doc, setDoc] = useState({})
  const [pdf, setPDF] = useState()
  const { firebase } = useContext(FirebaseContext)
  const { id } = useParams()
  const { userRecord, isLoading } = useProfile()
  const classes = avatarStyles()

  useEffect(() => {
    const getDoc = async () => {
      const doctor = await firebase
        .firestore()
        .doc(`/users/${id}`)
        .get()
      setDoc(doctor.data())
    }
    const getCV = async () => {
      const cvRef = await firebase
        .storage()
        .ref(`doctors/${id}`)
        .getDownloadURL()
      setPDF(cvRef)
    }
    if (!isLoading && userRecord.type === 'Admin') {
      getCV()
    }
    getDoc()
  }, [firebase, userRecord, id, isLoading])

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
            <Grid item xs={12} style={{ marginTop: '1rem' }}>
              <DownloadRedBTN
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<PictureAsPdf />}
                href={pdf}
              >
                Ver CV
              </DownloadRedBTN>
            </Grid>
          </Grid>
        </Paper>
      </Grow>
    </Container>
  )
}
