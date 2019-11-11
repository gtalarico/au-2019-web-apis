
const clearToken = () => {
  localStorage.removeItem("access_token")
}

const getToken = () => {
  return localStorage.getItem("access_token")
}

export const setToken = (accessToken) => {
  localStorage.setItem("access_token", accessToken)
}

export const getAuthenticationUrl = () => {
    const client_id = "GFYvzPiDlRVoMAO6LrnTGIAlsMY39W0s"
    const scope = "data:read user:read"
    const redirect_uri = encodeURIComponent("http://localhost:8080/")
    return `https://developer.api.autodesk.com/authentication/v1/authorize?response_type=token&redirect_uri=${redirect_uri}&client_id=${client_id}&scope=${scope}`
}

const apiRequest = async (url, method="GET", jsonify=true) => {
  const request = {
    method: method,
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  }
  const response = await fetch(url, request)
  if (response.status === 401)  {
    clearToken()
  } else {
    if (jsonify) {
      const responseData =  await response.json()
      return responseData
    } else {
      return response
    }
  }
}

export const getHubs = () => apiRequest("https://developer.api.autodesk.com/project/v1/hubs")
export const getProjects = (hubId) => apiRequest(`https://developer.api.autodesk.com/project/v1/hubs/${hubId}/projects`)
export const getFolders = (hubId, projectId) => apiRequest(`https://developer.api.autodesk.com/project/v1/hubs/${hubId}/projects/${projectId}/topFolders`)
export const getContents = (projectId, folderId) => apiRequest(`https://developer.api.autodesk.com/data/v1/projects/${projectId}/folders/${folderId}/contents`)
export const getItem = (projectId, itemId) => apiRequest(`https://developer.api.autodesk.com/data/v1/projects/${projectId}/items/${itemId}`)
export const getResource = (resourceUlr) => apiRequest(resourceUlr, "GET", null)
