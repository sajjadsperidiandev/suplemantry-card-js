import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../components/dashboard'
import { Supplementcard } from '../components/supplementcard'

export const AppRoutes = () => {
  return (
    <Routes>
        <Route  path='/' element={<Dashboard/>} />
        <Route  path='/:id' element={<Dashboard/>} />
        <Route path='/sup-card' element={<Supplementcard/>} />
    </Routes>

    )
}
