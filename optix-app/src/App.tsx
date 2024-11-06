import React, { useEffect, useState } from 'react';
import { Container, Typography } from "@mui/material"
import { getMovies, getMovieCompanies } from './api'
import { Refresh } from './components/Refresh'
import { MovieTable } from './components/MovieTable'
import { ReviewContain } from './components/ReviewForm'
import { MovieProvider } from './context/MovieContext'

export type Movie = {
  title:string,
  id:string,
  filmCompanyId:string,
  releaseYear:number,
  cost:number,
  reviews:number[],
}

export type MovieCompany = {
  id:string,
  name:string
}

export const App = () =>  {

  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [companies, setCompanies] = useState<MovieCompany[] | null>(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    setIsLoading(true)
    setIsError(false)

    try {
      const movs = await getMovies()
      const coms = await getMovieCompanies()

      if(movs.error || coms.error) {
        setIsLoading(false)
        setIsError(true)
        movs.error ? console.log(movs.error) : console.log(coms.error)
      } else {
        setMovies(movs)
        setCompanies(coms)
        setIsLoading(false)
        setIsError(false)
      }
    } catch(error) {
      setIsLoading(false)
      setIsError(true)
      console.log(error)
    }
  }

  useEffect(()=>{
    getData();
  }, [])

  return (
    <MovieProvider>
      <Container sx={{padding: '2rem'}}>
        <Typography sx={{ marginBottom: '2rem'}} variant='h2'>Welcome to Movie database!</Typography>
        <Refresh getData={getData}/>
        {
          isLoading ?
          <Typography sx={{marginBottom: '1rem'}}>Loading...</Typography>
          :
          isError ?
          <Typography sx={{marginBottom: '1rem'}}>Error getting data. Try refreshing.</Typography>
          :
          <>
            <Typography sx={{marginBottom: '2rem'}}>Total movies displayed: {movies?.length}</Typography>
            <MovieTable movies={movies} companies={companies} setMovies={setMovies}/>
            <ReviewContain />
          </>
        }
      </Container>
    </MovieProvider>
  );
}