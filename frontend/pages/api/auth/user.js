import axios from 'axios'
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'GET') {
    const cookies = cookie.parse(req.headers.cookie || '')

    // Retrieve 'access' cookie from browser
    const access = cookies.access || false

    if (!access) {
      return res.status(401).json({
        error: 'Login first to load user',
      })
    }

    try {
      const response = await axios.get(`${process.env.API_URL}/api/me/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })

      if (response.data) {
        return res.status(200).json({
          user: response.data,
        })
      }
    } catch (error) {
      return res.status(error.response.status).json({
        error: 'Cannot retrieve user data. Please try again later.',
      })
    }
  }
}
