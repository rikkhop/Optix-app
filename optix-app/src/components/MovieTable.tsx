import { Movie, MovieCompany } from "../App"
import React, { useState } from "react"
import { Table, TableCell, TableBody, TableHead, TableRow } from "@mui/material"
import { useMovieContext } from "../context/MovieContext"

export function MovieTable({
  movies, 
  companies,
  setMovies
}:{
  movies:Movie[] | null, 
  companies:MovieCompany[] | null,
  setMovies:React.Dispatch<React.SetStateAction<Movie[] | null>>
}) {

  const [sortDir, setSortDir] = useState('DESC')
  const { setSuccessMessage, setModalOpen, selectedMovie, setSelectedMovie, getAvScore, getCompany } = useMovieContext()

  function sortMovies() {
    setSortDir((dir) => (dir === 'DESC' ? 'ASC' : 'DESC'));

    if(movies) {
      const sortedData = [...movies].sort((a:Movie, b:Movie) => {
        return sortDir === 'ASC' ? getAvScore(a.reviews) - getAvScore(b.reviews) : getAvScore(b.reviews) - getAvScore(a.reviews);
      });

      setMovies(sortedData);
    }
  }

  function selectMovie(movie:Movie) {
    setSuccessMessage(null)
    setSelectedMovie(movie)
    setModalOpen(true)
  }

  return (
    <Table sx={{marginBottom: '2rem'}}>
      <TableHead sx={{fontWeight: 'bold'}}>
        <TableRow className="trow">
          <TableCell sx={{fontWeight:'bold'}}>Title</TableCell>
          <TableCell sx={{fontWeight:'bold', cursor:'pointer'}} onClick={sortMovies}>Review</TableCell>
          <TableCell sx={{fontWeight:'bold'}}>Film Company</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { movies &&
          movies.map((movie:Movie, index:number) => (
          <TableRow key={movie.title + index} sx={{backgroundColor: selectedMovie?.id === movie.id ? '#eee' : 'transparent', cursor:'pointer'}} onClick={() => {selectMovie(movie)}}>
            <TableCell>{movie.title}</TableCell>
            <TableCell>{getAvScore(movie.reviews)}</TableCell>
            <TableCell>{getCompany(movie, companies)}</TableCell>
          </TableRow>
        ))
      }
      </TableBody>
    </Table>
  )
}