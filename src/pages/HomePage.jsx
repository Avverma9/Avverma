import React from 'react';
import Banner from './home-section/banner';
import Locations from './home-section/locations';
import Offered from './home-section/Offered';
import SearchForm from '../components/Search';

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