
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {AppBar, Box, Button, Container, Drawer, Grid, IconButton, List, ListItem, ListItemText, Toolbar, Typography} from "@mui/material";
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Link from "next/link";

const Layout = ({ children }) => {

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Create Flashcards', path: '/generate' },
        { name: 'Saved Flashcards', path: '/flashcards' },
    ];

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () =>{
        setDrawerOpen(!drawerOpen)
    }

    return(
        <>
        {/* Navigation */}
        
      <AppBar position={"static"} sx={{ bgcolor: 'grey.900' }}>
      <Toolbar>
          <IconButton
              edge="start"
              color = "primary"
              aria-label= "menu"
              onClick = {toggleDrawer}
              sx={{mr: 2}}>

                  <MenuIcon />
              
          </IconButton>
        <Button href = '/' variant={"h6"} style={{flexGrow: 1}}>
            Flashy
        </Button>

{/* What you see when signed out */}
        <SignedOut>
          <Button color={"inherit"} href="/sign-in"> Login </Button>
          <Button color={"inherit"} href="/sign-up"> Sign Up </Button>
        </SignedOut>
{/* What you see when signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>

      </Toolbar>
    </AppBar>
    
     <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer}
                sx={{
                    width: '240px', // Set the width of the drawer
                    '& .MuiDrawer-paper': {
                        width: '240px', // Set the width of the drawer inner paper
                        bgcolor: 'primary.main',  // Set a dark background color for the sidebar
                        color: 'white',  // Set text color to white for better readability
                        '& .MuiListItem-button:hover': {
                            bgcolor: 'secondary-main'  // Add a hover effect with a slightly lighter background
                        }
                    }
                }}
            >
                <List>
                    {menuItems.map((item, index) => (
                        <Link href={item.path} key={item.name} passHref>
                            <ListItem button onClick={toggleDrawer}>
                                <ListItemText primary={item.name} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Drawer>
            <Container>
                {children} 
            </Container>
        </>
    );
}
export default Layout