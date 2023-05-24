import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

function Layout({ children, search }) {
    return (
        <React.StrictMode>
            <Navbar search={search}/>
            {children}
            <Footer/>
        </React.StrictMode>  
    );
}

export default Layout;