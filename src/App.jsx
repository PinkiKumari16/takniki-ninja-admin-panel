import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { BlogForm } from './pages/BlogForm'
import { CourseForm } from './pages/CourseForm'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/admin-panel' element={<Home />} />
          <Route path='/blog-form' element={<BlogForm />} />
          <Route path='/course-form' element={<CourseForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
