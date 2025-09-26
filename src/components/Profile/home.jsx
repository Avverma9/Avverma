import React from 'react';
import Banner from '../../pages/home-section/banner';
import Locations from '../../pages/home-section/locations';
import Offered from '../../pages/home-section/Offered';
import SearchForm from '../Search';

export default function HomePage() {
  return (
    <>
      <Banner />
      <SearchForm />
      <Locations />
      <Offered />
    </>
  );
}