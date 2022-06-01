import React, { useEffect } from "react"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import About from "./components/about/About"
import Team from "./components/team/Team.js"
import ViewBio from "./components/team/ViewBio.js"
import Contact from "./components/Contact"
import Login from './components/admin/Login'
import ForgotPassword from './components/admin/ForgotPassword'
import Register from './components/admin/Register'
import Services from "./components/services/Services"
import Projects from "./components/projects/Projects"
import SlideCarousel from "./components/carousel/SlideCarousel"

import { BrowserRouter, Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'
import store from './redux/store'
import { openNav, showServices, showProjects, handleClose, setHeight } from "./redux/app/app.actions"
import { loadUser } from './redux/auth/auth.actions'

const App = (props) => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  useEffect(() => {
    props.setHeight(contH)
  })

  const bodyElement = document.body
  props.menuOpen
    ? bodyElement.classList.add("menu-open")
    : bodyElement.classList.remove("menu-open")

  let contH = document.querySelector("body").clientHeight

  return (
    <div id="content" className="App">
      <BrowserRouter>
        <Route exact path="/login" render={() => <Login auth={props.auth} />} />
        <Route exact path="/register" render={() => <Register auth={props.auth} />}/>
        <Route exact path="/forgot-password" component={ForgotPassword} />

        <Header
          openMenu={props.menuOpen}
          contentHeight={contH}
          isServices={props.isServices}
          isProjects={props.isProjects}
          showServices={props.showServices}
          showProjects={props.showProjects}
          closeHandler={props.closeHandler}
          menuOpened={props.openNav}
        />

        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <SlideCarousel
                isServices={props.isServices}
                isProjects={props.isProjects}
              />
            )}
          />

          <Route exact path="/services" component={Services} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/about" component={About} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/view-bio/:memberId" component={ViewBio} />
          <Route exact path="/contact" component={Contact} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isServices: state.appReducer.isServices,
    isProjects: state.appReducer.isProjects,
    menuOpen: state.appReducer.menuOpen,
    contentHeight: state.appReducer.contentHeight,
    auth: state.authReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openNav: () => dispatch(openNav()),

    showServices: (e) => {
      e.preventDefault()
      return dispatch(showServices())
    },

    showProjects: (e) => {
      e.preventDefault()
      return dispatch(showProjects())
    },

    closeHandler: () => dispatch(handleClose()),
    setHeight: () => dispatch(setHeight()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)