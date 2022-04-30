import { useEffect, useRef, useState } from "react";




export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef( [])
 
  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true)
      const httpAbbortController = new AbortController();
      activeHttpRequests.current.push(httpAbbortController)
      try {
          const response = await fetch(url, {
              method,
              body,
              headers,
              signal: httpAbbortController.signal
          })
          const responseData = await response.json();
          if (!response.ok) {
            throw new Error(responseData.message);
          }

          return responseData
          
      } catch (error) {
          setError(err.message)
      }
      setIsLoading(false)
  }, []);

const clearError = () => {
    setError(null)
}

useEffect(() => {
    return() => {
        activeHttpRequests.current.forEach(abortCtrl => abortCtrl())
    }
}, [])

return { isLoading, error, sendRequest, clearError } 
}