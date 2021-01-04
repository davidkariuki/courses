import useSWR from "swr"

const fetcher = (...args: any[]) =>
  fetch(args[0], ...args).then((res) => res.json())

function useUser(id: string) {
  const { data, error } = useSWR(`/api/users/${id}`, fetcher)
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useUser
