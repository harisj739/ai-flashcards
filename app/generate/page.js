/*
This page contains frontend for the generating flashcard side. 
- Contains textbox to generate flashcards
- contains flashcards
- flip flashcard
- save flashcards 
*/

'use client'

import {useUser} from '@clerk/nextjs'
import {db} from '@/firebase'
import {writeBatch, doc, getDoc, collection} from 'firebase/firestore'
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle,
    Grid,
    Paper, TextField,
    Typography, 
    CircularProgress
} from '@mui/material'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Layout from '../components/appbar'


export default function Generate(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([]) // Generates flashcards
    const [flipped, setFlipped] = useState([]) // Flips flashcards 
    const [text, setText] = useState('') // sets text
    const [name, setName]= useState('') // sets name 
    const [open, setOpen] = useState(false) // flash card is closed by defualt (for modals)
    const [loading, setLoading] = useState(false) // Loading system for when the cards are being generated 
   const router = useRouter()


    // submits text to api to generate flashcards + integration of loading indicator during API calls
    const handleSubmit = async () => {
        setLoading(true);  // Start loading
        fetch('api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })  // Ensure your backend expects JSON
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            setFlashcards(data);  // Update the state with new flashcards
            setLoading(false);  // Stop loading
        })
        .catch(error => {
            console.error('Error loading flashcards:', error);
            setLoading(false);  // Stop loading if there is an error
        });
    };
    

    const handleCardClick = (id) =>
        {
        // flips id (sets to opposite of prev id
        setFlipped((prev)=> ({
            ...prev,
            [id]: !prev[id],

        }))
    }

    const handleOpen=() => {
        setOpen(true)
    }

    const handleClose=()=>{
        setOpen(false)
    }

    const goHome = () =>{
        router.push("/")
    }


    


    // Saves flashcards
// Saves flashcards
const saveFlashcards = async () => {
    if (!name) {
        alert('Please enter a name');
        return;
    }

    // Ensure user is loaded and authenticated before attempting to access user.id
    if (!user || !user.id) {
        console.error('Authentication error: No user logged in.');
        alert('You must be logged in to save flashcards.');
        return; // Optionally, redirect to login page or handle error
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, 'users'), user.id);

    try {
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || [];
            if (collections.find(f => f.name === name)) {
                alert('Flashcard collection with the same name already exists.');
                return;
            } else {
                collections.push({ name });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] });
        }

        const colRef = collection(userDocRef, name);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        router.push('/flashcards');
    } catch (error) {
        console.error('Error saving flashcards:', error);
        alert('Failed to save flashcards.');
    }
};








    return <Container maxWidth="false" sx={{ minHeight: '100vh', bgcolor: '#202124', color: 'white'}}>

        <Layout></Layout>
        {/* Button that goes home  */}

        
        {/* Button that generates flashcards  */}
        <Box sx={{mt:4,mb:6,display:'flex',flexDirection:'column',alignItems:'center',}}>
            <Typography variant='h4'>
                Generate Flashcards
            </Typography>
            <Paper sx={{p: 4, width: '100%', bgcolor: '#202124', border: 1, borderColor: 'white'}}>
                <TextField value={text}
                onChange={(e) => setText(e.target.value)} 
                label ="Enter text"
                fullWidth
                multiline
                rows={4}
                variant = "outlined"
                sx={{
                    mb:2,
                    
                }}
                />

                <Button 
                variant ='contained'
                color='primary' 
                onClick={handleSubmit}
                fullWidth
                disabled={loading}
                >
                {' '}
                Submit
                </Button>

                

            </Paper>

         
        </Box>

        {/* Loading Status */}
        {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            

        
        
 {/* Display Flashcards */}
        {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5">Flashcards Preview</Typography>
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{bgcolor: "#202124"}}>
                                    <CardActionArea sx={{bgcolor: "#fffff0"}} onClick={() => handleCardClick(index)}>
                                        {/* Card Animation  */}
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    perspective: '1000px',
                                                 
                                                        transition: 'transform 0.6s',
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '300px',
                                                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                        transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)', 
                                                        '& > div': {
                                                            position: 'absolute',
                                                            width: '100%',
                                                            height: '100%',
                                                            backfaceVisibility: 'hidden',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            padding: 2,
                                                            boxSizing: 'border-box',
                                                        },
                                                        '& > div:nth-of-type(2)': {
                                                            transform: 'rotateY(180deg)',
                                                        },
                                                    
                                                }}
                                            >
                                                <div>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h5" component="div">
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="secondary" onClick={handleOpen}>
                    Save
                </Button>
            </Box>
            

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your flashcards collection
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Collection Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveFlashcards} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
    </Container>
}