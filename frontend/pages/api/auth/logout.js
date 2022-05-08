import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body

    // Set 'access' cookie from backend to browser
    res.setHeader('Set-Cookie', [
      cookie.serialize('access', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: new Date(0), // Expire instantly
        sameSite: 'Lax',
        path: '/',
      }),
    ])

    return res.status(200).json({ success: true })
  }
}
