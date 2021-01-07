import useSWR from "swr"

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.")
    error.message = await res.json()
    throw error
  }

  return res.json()
}

function currentUser() {
  const { data, error } = useSWR(`/api/users/current`, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default currentUser
