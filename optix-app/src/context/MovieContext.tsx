import React, { createContext, useContext, useState } from 'react';
import { MovieCompany, Movie } from '../App'

interface MovieContext {
  selectedMovie:Movie | null;
  setSelectedMovie:React.Dispatch<React.SetStateAction<Movie | null>>;
  successMessage:string | null;
  setSuccessMessage:React.Dispatch<React.SetStateAction<string | null>>;
  modalOpen:boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getAvScore:(reviews:number[])=>number;
  getCompany:(movie:Movie, companies:MovieCompany[] | null)=>string;
}

const MovieContext = createContext<MovieContext | undefined>(undefined);

export const MovieProvider:React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  function getAvScore(reviews:number[]) {
    return parseFloat((reviews.reduce((acc: number, i: number) => acc + i, 0) / reviews.length).toFixed(1))
  }

  function getCompany(movie:Movie, companies:MovieCompany[] | null) {
    return companies?.find((company:MovieCompany | null) => company?.id === movie.filmCompanyId )?.name || 'Unknown'
  }

  return (
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie, successMessage, setSuccessMessage, modalOpen, setModalOpen, getAvScore, getCompany }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider')
  }
  return context
};