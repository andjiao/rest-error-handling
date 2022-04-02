 
export async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const error = new Error(errorResponse.message)
       
        error.apiError = errorResponse
        throw error
    }
    return res.json()
  }
 
  export function makeOptions(method, body) {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if (body) { //Observe how we can add new fields to an object when needed
      opts.body = JSON.stringify(body);
    }
    return opts;
  }
