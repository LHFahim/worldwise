/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const URL = `http://localhost:3005`;

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("There was an error loading data....");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert("There was an error loading data....");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    // dispatch({ type: "loading" });

    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);

      // dispatch({ type: "city/created", payload: data });
    } catch {
      alert(`There was an error creatin the city`);
      // dispatch({
      //   type: "rejected",
      //   payload: "There was an error creating the city...",
      // });
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    // dispatch({ type: "loading" });

    try {
      setIsLoading(true);
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));

      // dispatch({ type: "city/deleted", payload: id });
    } catch {
      alert(`There was an error deleting city`);
      // dispatch({
      //   type: "rejected",
      //   payload: "There was an error deleting the city...",
      // });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(`CitiesContext was used outside the CitiesProvider`);
  return context;
}

export { CitiesProvider, useCities };
