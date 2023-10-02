// API util functions that will hit our Route handlers
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
      },
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const deleteEntry = async (id: string) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'DELETE',
    })
  )

  if (res.ok) {
    const data = await res.json()
    console.log('deleted entry');
    
    return data.data
  }
}
