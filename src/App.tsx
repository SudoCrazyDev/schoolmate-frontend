import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button/Button';
import { useState } from 'react';
import { app, firestore } from './modules/Initializations';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';


function App() {
  const [user, setUser] = useState({firstname: '', lastname: '', email: '', password: '', teacher_id: '', school_name: '', address: '', district: '', region: '', school_id: '', school_level: ''});
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [event.target.id]: event.target.value});
  };
  
  const handleSubmit = async () => {
    const auth = getAuth(app);
    
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(async(newUserCredentials) => {
      console.log('NEW USER CREDENTIALS', newUserCredentials);
      try {
        const ownersCollectionRef = collection(firestore, 'owners');
        const schoolsCollectionRef = collection(firestore, 'schools');
        addDoc(ownersCollectionRef, {firstname: user.firstname, lastname: user.lastname, teacher_id: user.teacher_id})
        .then((newOwner) => {
          console.log('NEW OWNER', newOwner);
          addDoc(schoolsCollectionRef, {address: user.address, district: 'GSC', name: user.school_name, region: 'XII', school_id: user.school_id, school_level: ['jhs', 'shs'], owner_uid: newUserCredentials.user.uid})
          .then((newSchool) => {
            console.log('NEW SCHOOL', newSchool);
          });
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((err) => {
      
    });
  };
  
  return (
    <div style={{ minHeight: '100vh', width: '100vw'}}>
        <div className="container h-100 d-flex justify-content-center align-items-center">
          <form>
            <div className="card">
                <div className="card-body d-flex flex-column p-5" style={{ minHeight: '400px', minWidth: '400px', gap: '20px'}}>
                  <TextField id="firstname" variant='standard' label="Firstname" onChange={handleChange}/>
                  <TextField id="lastname" variant='standard' label="Lastname" onChange={handleChange}/>
                  <TextField id="email" variant='standard' label="Email" onChange={handleChange}/>
                  <TextField id="teacher_id" variant='standard' label="Teacher ID" onChange={handleChange}/>
                  <TextField id="password" variant='standard' label="Password" type='password' onChange={handleChange}/>
                  <TextField id="school_name" variant='standard' label="School Name" onChange={handleChange}/>
                  <TextField id="address" variant='standard' label="Address" onChange={handleChange}/>
                  <TextField id="district" variant='standard' label="District" onChange={handleChange}/>
                  <TextField id="region" variant='standard' label="Region" onChange={handleChange}/>
                  <TextField id="school_id" variant='standard' label="School ID" onChange={handleChange}/>
                  <TextField id="school_level" variant='standard' label="School Level Eg. JHS,SHS" onChange={handleChange}/>
                  <Button variant='contained' onClick={handleSubmit}>Register</Button>
                </div>
            </div>
          </form>
        </div>
    </div>
  )
}

export default App
