import type { Metadata } from 'next'
import ProflePage from './page'

export const metadata: Metadata = {
  title: 'Auth Next | Profile',
  description: 'Profile page ',
}

const ProfileLayout = () => {
  return (
    <>
        <ProflePage/>
    </>
  )
}

export default ProfileLayout