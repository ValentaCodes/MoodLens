// Route handler function that will call our api's

const createURL = (path: string) => {
    // visiting github, the code below will return "https://github.com/"
    // Allowing me to attach my api route path
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const res = await fetch(
    // this creates a new request object
    new Request(createURL('/api/journal'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }

}
