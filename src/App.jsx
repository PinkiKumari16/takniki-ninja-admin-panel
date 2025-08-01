import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { BlogForm } from './pages/BlogForm'
import { CourseForm } from './pages/CourseForm'
import { AddBlogContent } from './pages/AddBlogContent'
import { UserDetailsPage } from './pages/UserDetailsPage'
import { SourceCodeForm } from './pages/SourceCodeForm'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/admin-panel' element={<Home />} />
          <Route path='/blog-form' element={<BlogForm />} />
          <Route path='/content-form/:blogId' element={<AddBlogContent />} />
          <Route path='/course-form' element={<CourseForm />} />
          <Route path='/source-form' element={<SourceCodeForm />} />
          <Route path='/users/:userId' element={<UserDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
