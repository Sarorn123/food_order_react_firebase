import React from 'react'

type Props = {}

const Layout = ({ children }: { children: React.ReactNode }) => {
    console.log(children);
  return (
    <div>Layout</div>
  )
}

export default Layout;