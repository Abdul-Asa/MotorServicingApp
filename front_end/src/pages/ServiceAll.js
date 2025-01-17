import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ServicePage from '../components/ServicePage/ServicePage';
import ServicesDetails from '../components/ServiceCard/servicesDetails';


export default function ServicesAll() {
    return (
        <>
        <Navbar />
        <ServicePage />
        <ServicesDetails />
        <Footer />
        </>
    )
}