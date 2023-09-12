import type { Metadata } from 'next'
import LoginPage from './page'

export const metadata: Metadata = {
  title: 'Auth Next | Login',
  description: 'Login page of Auth Next.js App',
}

const LoginLayout = () => {
  return (
    <>
        <LoginPage/>
    </>
  )
}

export default LoginLayout