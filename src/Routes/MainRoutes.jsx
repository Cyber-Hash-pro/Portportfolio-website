import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../page/Home'
import About from '../page/About'
import Projects from '../page/Projects'
import Blogs from '../page/Blogs'
import Contact from '../page/Contact'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  )
}

export default MainRoutes
