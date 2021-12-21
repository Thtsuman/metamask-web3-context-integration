import React from 'react'
import './app.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar/Navbar'
import RootProvider from './contexts/RootProvider';

const App = () => {

    return (
        <RootProvider>
            <div className="app bg-dark text-white">
                <Navbar />
                <div className="container">
                    hello
                </div>
            </div>
        </RootProvider>
    )
}

export default App
