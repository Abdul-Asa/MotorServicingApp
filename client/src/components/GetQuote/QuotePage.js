import React, { useState } from 'react';
import ContactForm from './ContactForm';
import VehicleForm from './VehicleForm';
import DatePicker from './DatePicker';
import ServicesForm from './ServicesForm';
import Checkout from './Checkout';
import { SectionTitle } from '../HomePage/HomePage';
import './css/Quote.css';

const QuotePage = () => {
  const form = {
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    vehicleBrand: '',
    vehicleMake: '',
    vehicleYear: '2007',
    date: '',
    time: '',
    services: [],
  };

  const [formData, setformData] = useState(form);

  const getData = (e) => {
    const { name, value } = e.target;
    setformData((inputDetails) => {
      return { ...inputDetails, [name]: value };
    });
  };

  const getServicesData = (e) => {
    const { name, checked } = e.target;
    setformData((inputDetails) => {
      if (checked) {
        return { ...inputDetails, services: [...inputDetails.services, name] };
      }
      if (!checked) {
        return {
          ...inputDetails,
          services: inputDetails.services.filter((service) => service !== name),
        };
      }
    });
  };

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="quote-page">
      <SectionTitle text1="Book" text2="an appointment" />
      <div className="wrapper">
        <ContactForm getData={getData} data={formData} />
        <VehicleForm getData={getData} data={formData} />
      </div>
      <div className="wrapper">
        <DatePicker getData={getData} data={formData} />
        <ServicesForm getData={getServicesData} data={formData} />
      </div>
      <div className="wrapper">
        <Checkout onsubmit={onSubmit} />
      </div>
    </div>
  );
};

export default QuotePage;
