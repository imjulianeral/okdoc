import { useState, useEffect } from 'react'
import { firebase } from '../firebase'

export default function useDoctors(type, order) {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getDocs = async () => {
      await firebase
        .firestore()
        .collection('users')
        .where('type', '==', type)
        .orderBy(order, 'desc')
        .onSnapshot(manageSnap)
    }
    getDocs()
  }, [order, type])

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
