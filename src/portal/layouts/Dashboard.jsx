import React, { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import { Sidenav, DashboardNavbar, Configurator } from "@/portal/widgets/layout"
import { useMaterialTailwindController } from "@/portal/context"
import routes from "@/portal/routes"
import { Toaster } from 'react-hot-toast'
import Loading from '@/components/utils/Loading'
import { useDispatch, useSelector } from "react-redux"
import { loadUser, updateOnlineUsers } from "@/redux/slices/usersSlice"
import { socket } from "@/portal/socket";

export function Dashboard() {

  const [controller] = useMaterialTailwindController()
  const { isLoading, user } = useSelector(state => state.users)
  const { sidenavType } = controller

  const navigate = useNavigate()
  const dispatchAuth = useDispatch()

  // Add a new state to track if the auth check has completed
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false)

  useEffect(() => {
    dispatchAuth(loadUser()).then(() => {
      setAuthCheckCompleted(true)
    });
  }, [dispatchAuth])

  useEffect(() => {
    if (!isLoading && authCheckCompleted && !user) {
      navigate("/auth/login")
    }
  }, [isLoading, navigate, authCheckCompleted])

  // Connect to the socket server once the user opens the chat page
  useEffect(() => {
    // Connect to the socket server and send the user ID to the server
    if (user) {
      socket.auth = { user };
      socket.connect();
    }

    // Log socket connection
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    // Log socket disconnection
    socket.on('disconnect', (reason) => {
      console.log('Disconnected from socket server:', reason);
    });

    // Disconnect the socket when the user leaves the chat page
    return () => {
      socket.disconnect();
    }
  }, [user]);

  useEffect(() => {
    socket.on("onlineUsers", (oUsers) => {
      dispatchAuth(updateOnlineUsers(oUsers));
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [updateOnlineUsers]);

  if (isLoading || !authCheckCompleted) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Toaster position="top-right" reverseOrder={false} />
      <Sidenav routes={routes} brandImg={sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"} />
      <div className="p-2 xl:p-4 xl:ml-80">

        <DashboardNavbar />
        <Configurator />

        <Routes>
          {routes.map(({ layout, pages }) => layout === "dashboard" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
          )}
        </Routes>
      </div>
    </div>
  )
}

Dashboard.displayName = "/src/portal/layout/dashboard.jsx"

export default Dashboard
