'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {AppBar, Box, Button, Container, Drawer, Grid, IconButton, List, ListItem, ListItemText, Toolbar, Typography} from "@mui/material";
import Head from "next/head";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Link from "next/link";
import Layout from './components/appbar'

export default function Home() {

    const Router = useRouter()
    const handleSubmit = async () =>{

        const checkoutSession = await fetch('/api/checkout_session', {
            method: 'POST',
            headers: {
                origin: 'http://localhost:3000',
            },

        })
        const checkoutSessionJson = await checkoutSession.json()



        // handles error
        if (checkoutSession.statusCode === 500){
            console.error(checkoutSession.message)
        }

        const stripe = await getStripe()
        const {error} = await stripe.redirectToCheckout({
            sessionId: checkoutSessionJson.id
        })

        if(error){
            console.warn(error.message)
        }
    }

    // Adding feature to app bar by implementing side bar 

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Create Flashcards', path: '/generate' },
        { name: 'Saved Flashcards', path: '/flashcards' },
        { name: 'Account', path: '/account' }
    ];

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () =>{
        setDrawerOpen(!drawerOpen)
    }

    const goGenerate = () => {
        Router.push("generate")
    }
  return (

    <Container maxWidth='false' sx={{minHeight: '120vh', bgcolor: '#202124', color: 'white'}}>
      <Head>
        <title> Flashcard SaaS </title>
        <meta name={"description"} content={"Create flashcard from your text"} />
      </Head>

{/* APPBAR */}
<Layout></Layout>
        <Box sx={{
            textAlign: "center",
            my: 4
        }}>
            <Typography variant={"h2"} gutterBottom> Welcome to FlashyAI! </Typography>
            <Typography variant={"h5"} gutterBottom> The easiest way to make flashcards from your text! </Typography>
            <Button variant={"contained"} color={"primary"} onClick = {goGenerate} sx={{mt:2}}> Get Started </Button>
        </Box>
{/* Features */}
        <Box sx={{my: 6}}>
            <Typography variant={"h4"} gutterBottom> Features  </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Box sx={{my: 1, p: 3,
                        border: '1px solid',
                        borderColor: "grey.300",
                        borderRadius: 2} }>
                    <Typography variant={"h6"} gutterBottom> Easy Text Input </Typography>
                    
                    <Typography> {' '} Simply input your text and let our software do the rest. Creating flashcards has never been easier!</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box sx={{my: 1, p: 3,
                        border: '1px solid',
                        borderColor: "grey.300",
                        borderRadius: 2} }>
                    <Typography variant={"h6"} gutterBottom> Smart Flashcards </Typography>
                    <Typography> {' '} Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                <Box sx={{my: 1, p: 3,
                        border: '1px solid',
                        borderColor: "grey.300",
                        borderRadius: 2} }>
                    <Typography variant={"h6"} gutterBottom> Accessible Anywhere </Typography>
                    <Typography> {' '} Access your flashcards from any device and at any time! Study on the go with ease! </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>

        <Box sx={{my: 6, textAlign: "center"}}>
            <Typography variant={"h4"} gutterBottom> Pricing  </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        p: 3,
                        border: '1px solid',
                        borderColor: "grey.300",
                        borderRadius: 2
                    }}>
                        <Typography variant={"h5"} gutterBottom> Basic  </Typography>
                        <Typography variant={"h6"} gutterBottom> $5/month  </Typography>
                        <Typography> {' '} Access to basic flashcard features and limited storage. </Typography>
                        <Button variant={"contained"} color="primary" sx={{mt: 2}}> Choose Basic </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{
                        p: 3,
                        border: '1px solid',
                        borderColor: "grey.300",
                        borderRadius: 2
                    }}>
                        <Typography variant={"h5"} gutterBottom> Pro  </Typography>
                        <Typography variant={"h6"} gutterBottom> $10/month  </Typography>
                        <Typography> {' '} Unlimited flashcards and storage with priority support! </Typography>
                        <Button variant={"contained"} color="primary" sx={{mt: 2}} onClick={handleSubmit}> 
                            Choose Pro 
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Container>
  );
}
