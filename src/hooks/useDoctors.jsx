import { useState, useEffect } from 'react'
import useFirebase from './useFirebase'

export default function useDoctors(user, loading, order) {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const firebase = useFirebase()

  useEffect(() => {
    const getAdminDocs = async () => {
      await firebase
        .firestore()
        .collection('users')
        .where('type', '==', 'Doctor')
        .orderBy(order, 'desc')
        .onSnapshot(manageSnap)
    }
    const getDocs = async () => {
      await firebase
        .firestore()
        .collection('users')
        .where('type', '==', 'Doctor')
        .where('status', '==', 'ACTIVADO')
        .orderBy(order, 'desc')
        .onSnapshot(manageSnap)
    }

    if (!loading && user.type === 'Admin' && firebase) {
      getAdminDocs()
    } else if (firebase) {
      getDocs()
    }
  }, [order, user, loading, firebase])

  function manageSnap(snapshot) {
    const record = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })

    setRecords(record)
    setIsLoading(false)
  }

  return { records, isLoading }
}
