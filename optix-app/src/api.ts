export async function getMovies() {
  try {
    const response = await fetch('http://localhost:3000/movies');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    console.log(data)
    return data;
  } catch(error) {
    console.log(error);
    return { error: 'problem getting movies data'};
  }
}

export async function getMovieCompanies() {
  try {
    const response = await fetch('http://localhost:3000/movieCompanies');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()

    console.log(data)
    return data
  } catch(error) {
    console.log(error)
    return { error: 'problem getting movie companies data'}
  }
}

export async function submitReview(review:{id:string | undefined, text:string}) {
  try {
    const response = await fetch('http://localhost:3000/submitReview', {
      method: "POST",
      body: JSON.stringify(review)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()

    return data
  } catch(error) {
    console.log(error)
    return { error: "There was a problem submitting your review. Please try again." };
  }
}