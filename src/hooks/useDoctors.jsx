import { useState, useEffect } from 'react'
import { firebase } from '../firebase'

export default function useDoctors(order) {
  const [doctors, setDoctors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getDocs = async () => {
      await firebase
        .firestore()
        .collection('users')
        .where('type', '==', 'Doctor')
        .orderBy(order, 'desc')
        .onSnapshot(manageSnap)
    }
    getDocs()
  }, [order])

  function manageSnap(snapshot) {
    const doctors = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })

    setDoctors(doctors)
    setIsLoading(false)
  }

  return { doctors, isLoading }
}
