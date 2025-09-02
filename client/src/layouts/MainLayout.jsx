import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            <Header/>
            <div className='min-h-screen'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;