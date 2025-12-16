import React from 'react'
import { useSession } from "next-auth/react";

const Welcome = () => {
    const { data: session, status } = useSession();
  return (
    <div className='text-center'>
     <div className="text-(--secondary-color) text-xl mt-5  font-semibold">
      Welcome, {session.user.name}!
    </div>
    <p className="text-(--subtext-color) text-sm">
  Keep all your thoughts, ideas, and important information in one place. Quickly create, manage, and access your notes anytime, anywhere.
</p>

    </div>
  )
}

export default Welcome
