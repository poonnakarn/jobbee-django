import axios from 'axios'

export const isAuthenticatedUser = async (accessToken) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/token/verify/`,
      {
        token: accessToken,
      }
    )

    if (response.status === 200) return true
    return false
  } catch (error) {
    return false
  }
}
