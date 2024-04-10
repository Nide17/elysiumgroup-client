import React from "react"
import { Routes, Route, Outlet, Link } from "react-router-dom"

import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import HomeCarousel from "./components/carousel/HomeCarousel"
import About from "./components/about/About"
import Team from "./components/team/Team"
import ViewBio from "./components/team/ViewBio"
import Contact from "./components/contact/Contact"
import Services from "./components/services/Services"
import Service from "./components/services/Service"
import Projects from "./components/projects/Projects"
import Project from "./components/projects/Project"
import { Dashboard, Auth } from "@/portal/layouts"

export default function App() {

  return (
    <div id="content" className="App flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeCarousel />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<Project />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<Service />} />
          <Route path="/about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="view-bio/:id" element={<ViewBio />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoMatch />} />
        </Route>

        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </div>
  )
}

const Layout = () => {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

const NoMatch = () => {
  return (
    <div className="flex flex-col items-center my-auto">
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}