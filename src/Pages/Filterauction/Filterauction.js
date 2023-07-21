import React from "react";
import { Filterauctioncard } from "../../Component/Filterauctioncard/filterauctioncard";
import "./Filterauction.css";
import {filterIcon} from '../../assets/index';

export const Filterauction = () => {
  return (
    <div className="filter-container">
      <div className="_filter_sidebar">
        <form><div className="filter-logo">
        <img src={filterIcon} alt="icon" srcset="" />
          <p>Filter Auction</p>
          </div>
          <div className="_filter_checkbox">
            <input type="checkbox" id="filter1" name="filter1" />
            <label htmlFor="filter1">Running Auction</label>
          </div>
          <div className="_filter_checkbox">
            <input type="checkbox" id="filter2" name="filter2" />
            <label htmlFor="filter2">Awaiting Status Declaration</label>
          </div>
          <div className="_filter_checkbox">
            <input type="checkbox" id="filter3" name="filter3" />
            <label htmlFor="filter3">Awaiting Payment Approval</label>
          </div>
          <div className="_filter_checkbox">
            <input type="checkbox" id="filter4" name="filter4" />
            <label htmlFor="filter4">Expired</label>
          </div>
          <div className="_filter_checkbox">
            <input type="checkbox" id="filter5" name="filter5" />
            <label htmlFor="filter5">Complete</label>
          </div>
          <div className="_filter_checkbox">
            <input type="checkbox" id="filter6" name="filter6" />
            <label htmlFor="filter6">State</label>
          </div>
          <div className="_filter-select">
            <select name="_filter-select" id="_filter-select">
              <option value="">-- Please choose an option --</option>
              <option value="name">West Bengal</option>
              <option value="mobile">Rajasthan</option>
              <option value="email">Bihar</option>
            </select>
          </div>
          <div className="_filter_checkbox">
            <input type="checkbox" id="filter7" name="filter7" />
            <label htmlFor="filter7">Region</label>
          </div>
          <div className="_filter-select">
            <select name="_filter-select" id="_filter-select">
              <option value="">-- Please choose an option --</option>
              <option value="name">Kolkata</option>
              <option value="mobile">Jaipur</option>
              <option value="email">Patna</option>
            </select>
          </div>
          <div className="_filter_checkbox">
            <input type="checkbox" id="filter8" name="filter8" />
            <label htmlFor="filter8">Seller Name</label>
          </div>
          <div className="_filter-select">
            <select name="_filter-select" id="_filter-select">
              <option value="">-- Please choose an option --</option>
              <option value="name">Raju</option>
              <option value="mobile">Shyam</option>
              <option value="email">Ram</option>
            </select>
          </div>
          <div className="_filter_checkbox">
            <input type="checkbox" id="filter9" name="filter9" />
            <label htmlFor="filter9">Category</label>
          </div>
          <div className="_filter-select">
            <select name="_filter-select" id="_filter-select">
              <option value="">-- Please choose an option --</option>
              <option value="name">Category 1</option>
              <option value="mobile">Category 2</option>
              <option value="email">Category 3</option>
            </select>
          </div>
          {/* <input type="submit" defaultValue="Submit" /> */}
        </form>
      </div>
      <div className="filterauction">
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
        <Filterauctioncard />
      </div>
    </div>
  );
};
