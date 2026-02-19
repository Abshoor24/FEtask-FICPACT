import React from 'react'
import Navbar from './Navbar'
import Footer from '../Footer'
import Sec1 from './Sec1'
import Sec2 from './Sec2'
import Sec3 from './Sec3'
import Sec5 from './Sec5'
import Sec4 from './Sec4'

function Layout() {
  return (
    <>
      <div className='min-h-screen'>
        <Navbar/>
          <Sec1 />
          <Sec2 />
          <Sec3 />
          <Sec4 />
          <Sec5 />
        <Footer/>
      </div>
        
    </>
)
}

export default Layout