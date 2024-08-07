import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Sidenav, DashboardNavbar, Configurator } from "@/portal/widgets/layout";
import { useMaterialTailwindController } from "@/portal/context";
import routes from "@/portal/routes";
import { Toaster } from 'react-hot-toast';
import Loading from '@/components/utils/Loading';
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateOnlineUsers } from "@/redux/slices/usersSlice";
import { socket } from "@/portal/socket";

export function Dashboard() {
  const [controller] = useMaterialTailwindController();
  const { isLoading, user } = useSelector(state => state.users);
  const { sidenavType } = controller;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to track if auth check is completed
  const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

  // Load user on mount
  useEffect(() => {
    dispatch(loadUser()).then(() => setAuthCheckCompleted(true));
  }, [dispatch]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && authCheckCompleted && !user) {
      navigate("/auth/login");
    }
  }, [isLoading, navigate, authCheckCompleted, user]);

  // Manage socket connection
  useEffect(() => {
    if (user) {
      socket.auth = { user };
      socket.connect();

      socket.on('connect', () => console.log('Connected to socket server'));
      socket.on('disconnect', (reason) => console.log('Disconnected from socket server:', reason));

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  // Update online users
  useEffect(() => {
    socket.on("onlineUsers", (oUsers) => {
      dispatch(updateOnlineUsers(oUsers));
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [dispatch]);

  if (isLoading || !authCheckCompleted) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Toaster position="top-right" reverseOrder={false} />
      <Sidenav routes={routes} brandImg={sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"} />
      <div className="p-2 xl:p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <Routes>
          {routes.map(({ layout, pages }) =>
            layout === "dashboard" &&
            pages.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))
          )}
        </Routes>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/portal/layout/dashboard.jsx";