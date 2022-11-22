import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where, orderBy,
    serverTimestamp, getDoc, updateDoc
}   from 'firebase/firestore'
import {
    getAuth, createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAc5Z2Aowrp4TRzfs5AAtWbwxQhEf-BZyg",
    authDomain: "akoya-denticles-ced11.firebaseapp.com",
    projectId: "akoya-denticles-ced11",
    storageBucket: "akoya-denticles-ced11.appspot.com",
    messagingSenderId: "609215769218",
    appId: "1:609215769218:web:baa038b5803d11f7c0e29b"
  }

  //init firebase app
  initializeApp(firebaseConfig)

  //init services
  const db = getFirestore()
  const auth = getAuth()

  //colletions ref
  const appointmentRef = collection(db, 'appointments')
  const patientRef = collection(db, 'patients')
  const doctorRef = collection(db, 'doctors')
  const adminRef = collection(db, 'admins')
  const eventRef = collection(db, 'events')
  const archiveRef = collection(db, 'archives')

  //Queries
  //Pangfilter ng binabatong snapshot
  const ap = query(appointmentRef, orderBy('createdAt'))
  const pa = query(patientRef, orderBy('createdAt'))
  const d = query(doctorRef, orderBy('createdAt'))
  const ad = query(adminRef, orderBy('createdAt', 'desc'))
  const ev = query(eventRef, orderBy('createdAt'))
  const ar = query(archiveRef, orderBy('createdAt'))
  
  ///////Get Collection Data////////
//   //appointment ref
//   getDocs(appointmentRef)
//   .then((snapshot) => {
//     let appointments = []
//     snapshot.docs.forEach((doc) => {
//         appointments.push({ ...doc.data(), id: doc.id})
//     })
//     console.log(appointments)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })

  //Realtime Get appointments
  const unsubAppointments = onSnapshot(ap, (snapshot) => {
    let appointments = []
    snapshot.docs.forEach((doc) => {
        appointments.push({ ...doc.data(), id: doc.id})
    })
    console.log(appointments)
  })



  //patient ref
  getDocs(patientRef)
  .then((snapshot) => {
    let patients = []
    snapshot.docs.forEach((doc) => {
        patients.push({ ...doc.data(), id: doc.id})
    })
    console.log(patients)
  })
  .catch(err => {
    console.log(err.message)
  })

//   //Realtime Get Patients
//   const unsubPatients = onSnapshot(pa, (snapshot) => {
//     let patients = []
//     snapshot.docs.forEach((doc) => {
//         patients.push({ ...doc.data(), id: doc.id})
//     })
//     console.log(patients)
//   })

  //doctor ref
  getDocs(doctorRef)
  .then((snapshot) => {
    let doctors = []
    snapshot.docs.forEach((doc) => {
        doctors.push({ ...doc.data(), id: doc.id})
    })
    console.log(doctors)
  })
  .catch(err => {
    console.log(err.message)
  })

//   //Realtime Get Doctors
//   const unsubDoctors = onSnapshot(d, (snapshot) => {
//     let doctors = []
//     snapshot.docs.forEach((doc) => {
//         doctors.push({ ...doc.data(), id: doc.id})
//     })
//     console.log(doctors)
//   })

  //admin ref
  getDocs(adminRef)
  .then((snapshot) => {
    let admins = []
    snapshot.docs.forEach((doc) => {
        admins.push({ ...doc.data(), id: doc.id})
    })
    console.log(admins)
  })
  .catch(err => {
    console.log(err.message)
  })

//   //Realtime Get Admin
//   const unsubAdmins = onSnapshot(ad, (snapshot) => {
//     let admins = []
//     snapshot.docs.forEach((doc) => {
//         admins.push({ ...doc.data(), id: doc.id})
//     })
//     console.log(admins)
//   })

  //events ref
  getDocs(eventRef)
  .then((snapshot) => {
    let events = []
    snapshot.docs.forEach((doc) => {
        events.push({ ...doc.data(), id: doc.id})
    })
    console.log(events)
  })
  .catch(err => {
    console.log(err.message)
  })

//   //Realtime Get Events
//   const unsubEvents = onSnapshot(ev, (snapshot) => {
//     let events = []
//     snapshot.docs.forEach((doc) => {
//         events.push({ ...doc.data(), id: doc.id})
//     })
//     console.log(events)
//   })

  //archive ref
  getDocs(archiveRef)
  .then((snapshot) => {
    let archives = []
    snapshot.docs.forEach((doc) => {
        archives.push({ ...doc.data(), id: doc.id})
    })
    console.log(archives)
  })
  .catch(err => {
    console.log(err.message)
  })

//   //Realtime Get Archives
//   const unsubArchives = onSnapshot(ar, (snapshot) => {
//     let archives = []
//     snapshot.docs.forEach((doc) => {
//         archives.push({ ...doc.data(), id: doc.id})
//     })
//     console.log(archives)
//   })
  

  //////Adding Documents////////
  //Add Appointment
  const addAppointmentForm = document.querySelector('.addAppointment')
  addAppointmentForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(appointmentRef, {
        lastName: addAppointmentForm.lastName.value,
        firstName: addAppointmentForm.firstName.value,
        contactNumber: addAppointmentForm.contactNumber.value,
        birthDate: addAppointmentForm.birthDate.value,
        preferredAppointmentDate: addAppointmentForm.preferredAppointmentDate.value,
        currentPatient: addAppointmentForm.currentPatient.value,
        createdAt:serverTimestamp()
    })
    .then(() => {
        addAppointmentForm.reset()
    })
  })

  //Add Patient
  const addPatientForm = document.querySelector('.addPatient')
  addPatientForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(patientRef, {
        lastName: addPatientForm.lastName.value,
        firstName: addPatientForm.firstName.value,
        contactNumber: addPatientForm.contactNumber.value,
        email: addPatientForm.email.value,
        birthDate: addPatientForm.birthDate.value,
        role: "patient",
        createdAt:serverTimestamp()
    })
    .then(() => {
        addPatientForm.reset()
    })
  })

  //Add Doctor
  const addDoctorForm = document.querySelector('.addDoctor')
  addDoctorForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(doctorRef, {
        lastName: addDoctorForm.lastName.value,
        firstName: addDoctorForm.firstName.value,
        contactNumber: addDoctorForm.contactNumber.value,
        email: addDoctorForm.email.value,
        birthDate: addDoctorForm.birthDate.value,
        role: "doctor",
        createdAt:serverTimestamp()
    })
    .then(() => {
        addDoctorForm.reset()
    })
  })

  //Add Admin
  const addAdminForm = document.querySelector('.addAdmin')
  addAdminForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(adminRef, {
        lastName: addAdminForm.lastName.value,
        firstName: addAdminForm.firstName.value,
        email: addAdminForm.email.value,
        role: "admin",
        createdAt:serverTimestamp()
    })
    .then(() => {
        addAdminForm.reset()
    })
  })

  //Add Events
  const addEventForm = document.querySelector('.addEvent')
  addEventForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(eventRef, {
        start: addEventForm.start.value,
        end: addEventForm.end.value,
        title:addEventForm.title.value,
        description: addEventForm.description.value,
        allDay: addEventForm.allDay.value,
        free: addEventForm.free.value,
        color: addEventForm.color.value,
        createdAt:serverTimestamp()
    })
    .then(() => {
        addEventForm.reset()
    })
  })


  /////Deleting Documents//////
  //delete Appointment
  const deleteAppointmentForm = document.querySelector('.deleteAppointment')
  deleteAppointmentForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'appointments', deleteAppointmentForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteAppointmentForm.reset()
        })
  })

  //delete patient
  const deletePatientForm = document.querySelector('.deletePatient')
  deletePatientForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'patients', deletePatientForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deletePatientForm.reset()
        })
  })

  //delete doctor
  const deleteDoctorForm = document.querySelector('.deleteDoctor')
  deleteDoctorForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'doctors', deleteDoctorForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteDoctorForm.reset()
        })
  })

  //delete admin
  const deleteAdminForm = document.querySelector('.deleteAdmin')
  deleteAdminForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'admins', deleteAdminForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteAdminForm.reset()
        })
  })

  //delete event
  const deleteEventForm = document.querySelector('.deleteEvent')
  deleteEventForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'events', deleteEventForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteEventForm.reset()
        })
  })

//////Get Single Document//////
//   const docRef = doc(db, 'appointments', 'a6IfZ73ani7fEDTvDuRG')

//   getDoc(docRef)
//     .then((doc) => {
//         console.log(doc.data(), doc.id)
//     })

//     //realtime get single document
//     const unsubAppointmentsDoc = onSnapshot(docRef, (doc) => {
//         console.log(doc.data(), doc.id)
//     })

  /////Updating Documents//////
  //update Appointment
  const updateAppointmentForm = document.querySelector('.updateAppointment')
  updateAppointmentForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'appointments', updateAppointmentForm.id.value)

    updateDoc(docRef, {
        firstName: 'Mich'
    })
    .then(() => {
        updateAppointmentForm.reset()
    })
        
  })

////////signing users up////////
  //Patient signup
    const patientSignupForm = document.querySelector('.signupUser')
    patientSignupForm.addEventListener('submit', (e) => {
     e.preventDefault()

     const email = patientSignupForm.email.value
     const password = patientSignupForm.password.value

     createUserWithEmailAndPassword(auth, email, password)
       .then(cred => {
        //  console.log('patient has been created:', cred.user)
         patientSignupForm.reset()
      })
       .catch(err => {
        console.log(err.message)
       })
    })

///////Logging In and Out////////
const logoutButton = document.querySelector('.logoutUser')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
    //   console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.loginUser')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
    //   console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch(err => {
      console.log(err.message)
    })
})

/////Subscribing to Auth Changes////////
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
  })

/////Unsubscribing from changes (auth & db)//////
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
  console.log('unsubscribing')
  unsubAppointments()
//   unsubPatients()
//   unsubDoctors()
//   unsubAdmins()
//   unsubEvents()
//   unsubArchives()
  unsubAppointmentsDoc()
  unsubAuth()
})

