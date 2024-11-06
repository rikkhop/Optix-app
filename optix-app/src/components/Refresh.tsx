import { useMovieContext } from '../context/MovieContext'
import { Button } from '@mui/material'

export function Refresh({getData}: {getData:()=>void}) {

  const { setSelectedMovie } = useMovieContext()

  async function refresh() {
    setSelectedMovie(null)

    getData()
  }
  
  return (
    <Button variant="contained" sx={{marginBottom: '1rem'}} color={'secondary'} onClick={refresh}>Refresh</Button>
  )
}