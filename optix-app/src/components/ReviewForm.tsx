import { useState, useEffect } from "react"
import { submitReview } from "../api"
import { Modal, Box, Typography, TextField, FormLabel, Button } from "@mui/material"
import { useMovieContext } from "../context/MovieContext"

export function ReviewContain() {
  const [isMobile, setIsMobile] = useState(false)
  const { setModalOpen, modalOpen } = useMovieContext()
  
  function closeModal() {
    setModalOpen(false)
  }

  useEffect(()=>{
    function handleResize() {
      window.innerWidth < 768 ? setIsMobile(true) : setIsMobile(false)
    }

    handleResize()
    
    window.addEventListener('resize', ()=>{
      handleResize()
    })

    return ()=> {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isMobile ? (
    <Modal 
      open={modalOpen}
      onClose={closeModal}
      sx={{padding: '3rem 0'}}
    >
      <Box sx={{backgroundColor: 'aliceblue', padding: '2.5rem', width: '90%', maxWidth:'350px', margin: '0 auto'}}>
        <ReviewForm />
      </Box>
      
    </Modal>
  ) : 
  (
    <ReviewForm></ReviewForm>
  )
}

function ReviewForm() {

  const [formValid, setFormValid] = useState(true)
  const [review, setReview] = useState('')
  const { setSuccessMessage, successMessage, selectedMovie } = useMovieContext()

  async function submitForm(e:React.FormEvent) {
    e.preventDefault()

    if(formValid) {
      const res = await submitReview({
        id: selectedMovie?.id,
        text: review
      })

      if(res.error) {
        setSuccessMessage(res.error)
        
      } else {
        setSuccessMessage(res.message)
        setReview('')
      }
    } else {
      setFormValid(false)
    }
  }

  function validate(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const input = e.currentTarget
    const val = input.value
    setReview(val)

    val.length > 100 ? setFormValid(false) : setFormValid(true)
  }

  return (
    <>
      <Typography sx={{marginBottom: '1rem'}}>
        { selectedMovie ? selectedMovie.title as string ? "You have selected: " + selectedMovie.title as string : "No Movie Title" : "No Movie Selected"}
      </Typography>
    
      { selectedMovie && successMessage === null ?
        <>
          <Typography sx={{marginBottom: '1rem'}}>Please leave a review below</Typography> 

          <form onSubmit={(e)=>submitForm(e)}>
            <FormLabel sx={{display:'block', marginBottom: '.5rem', color: 'black'}}>Review:</FormLabel>
            <TextField sx={{width: '100%', marginBottom: '1rem', backgroundColor: 'white'}} multiline rows={4} value={review} onChange={(e)=>validate(e)} placeholder="Rate the movie..."/>
            { !formValid &&
              <Typography sx={{color: 'red', marginBottom: '1rem', fontSize:'.75rem'}}>Review must be less than 100 characters</Typography>
            }
            <Button variant="contained" sx={{marginBottom: '1rem', display: 'block'}} color={'secondary'} disabled={formValid ? false : true} value="Submit review" type="submit">Submit review</Button>
          </form>
        </>
        :
        <Typography>{successMessage}</Typography>
      }
    </>
  )
}