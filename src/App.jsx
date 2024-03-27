/** @format */
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        "https://crio-location-selector.onrender.com/countries"
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const fetchStates = async (countryName) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${countryName}/states`
      );

      setStates(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await axios.get(
        `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
      );
      setCities(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
    fetchStates();
    fetchCities();
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    fetchStates(selectedCountry);
  };

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    fetchCities(selectedCountry, selectedState);
  };

  return (
    <div>
      <h1> Select Location</h1>
      <select id="country" onChange={handleCountryChange}>
        <option value="">Select Country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select id="state" onChange={handleStateChange}>
        <option value="">Select State</option>
        {states.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select id="city">
        <option value="">Select City</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default App;
