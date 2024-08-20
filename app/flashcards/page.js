'use client'
import { useUser } from '@clerk/nextjs'
import {useEffect, useState} from 'react'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import {db} from '@/firebase'
import { useRouter } from 'next/navigation'
import { Router } from 'next/router'
import { CardActionArea, Grid, Container, CardContent, Typography, Card} from '@mui/material'
import Layout from '../components/appbar'

// Shows all stored flashcards from database
export default function Flashcards(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(()=>{
        async function getFlashcards(){
            if (!user) return
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()){
                const collections = docSnap.data().flashcards || [] // if flashcards dont exist, empty array 

                setFlashcards(collections)
            }
            else{
                await setDoc(docRef, {flashcards: []}) // flashcard set to empty array if it doesnt exist
            }
        }
        
        getFlashcards()
    }, [user])

    if(!isLoaded || !isSignedIn){
        return <></>
    }

    // handles each indivdual card when you click on it 
    const handleCardClick = (id) =>{
        router.push(`/flashcard?id=${id}`)
``
    }

    // Display flashcards
    return(<Container maxWidth = "100wv" sx={{ minHeight: '100vh', bgcolor: '#202124', color: 'white'}}>
        <Layout></Layout>
        <Grid container spacing = {3} sx={{
            mt: 4
        }}>
            {flashcards.map((flashcard, index)=>(
                <Grid item xs={12} sm = {6} md={4} key={index}>
                    <Card>
                        <CardActionArea
                         onClick={()=> {
                            handleCardClick(flashcard.name)
                         }}>
                            <CardContent> 
                                <Typography variant='h6'>
                                    {flashcard.name}

                                </Typography>
                            </CardContent>
                         </CardActionArea>
                    </Card>
                </Grid>
            ))}

        </Grid>

    </Container>)
}