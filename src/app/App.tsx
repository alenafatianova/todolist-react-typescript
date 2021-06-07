import React, { useEffect } from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import { Login } from '../features/Login'
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress'
import { logoutTC } from '../features/auth-reducer'

type PropsType = {
    demo?: boolean
}

export const App = ({demo = false}: PropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch]) 

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitilized = useSelector<AppRootStateType, boolean>(state => state.app.isInitilized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

   

    if (!isInitilized) {
    return <div style={{position: 'fixed', top: '30%', textAlign: 'center'}}> 
    <CircularProgress/>
    </div>
        
    }      
        return (  
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>

                    { isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button> }
                    
                </Toolbar>
             { status === 'loading' &&  <LinearProgress /> }
            </AppBar>
            
            <Container fixed>
                <BrowserRouter>
                <Switch>
                <Route exact path={'/'} render={() => <TodolistsList demo={demo}/> } />
                <Route path={'/login'} render={() => <Login/> } />
                <Route path={ '/404' } render={ () => <h1>404: PAGE NOT FOUND</h1> }/>
                <Redirect from ={'*' } to={'/404'} />
            </Switch>
                </BrowserRouter>
           

            </Container>
        </div>
    )
}


