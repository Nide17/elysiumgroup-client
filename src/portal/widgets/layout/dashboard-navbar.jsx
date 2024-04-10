import React, { useEffect } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { Navbar, Typography, Button, IconButton, Breadcrumbs, Menu, MenuHandler, MenuList, MenuItem, Avatar } from "@material-tailwind/react"
import { UserCircleIcon, Cog6ToothIcon, BellIcon, ClockIcon, Bars3Icon } from "@heroicons/react/24/solid"
import { formatDistanceToNow } from 'date-fns'
import { useMaterialTailwindController, setOpenConfigurator, setOpenSidenav } from "@/portal/context"
import { logout } from "@/redux/slices/usersSlice"
import { getUserNotifications, markAsRead } from "@/redux/slices/notificationsSlice"
import { useDispatch, useSelector } from "react-redux"

export function DashboardNavbar() {

  useEffect(() => { document.title = "Dashboard" }, [])
  const [controller, dispatch] = useMaterialTailwindController()
  const { fixedNavbar, openSidenav } = controller
  const navigate = useNavigate()

  const dispatchRedux = useDispatch()
  const { pathname } = useLocation()
  const [layout, page] = pathname.split("/").filter((el) => el !== "")
  const { user } = useSelector(state => state.users)
  const { notifications } = useSelector(state => state.notifications)
  const userAvatar = user && user.picture && user.picture.url ? user.picture.url : "/img/team-2.jpeg";

  useEffect(() => { user && dispatchRedux(getUserNotifications(user._id)) }, [user, dispatchRedux])

  return (
    <Navbar color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-2 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"}`}
      fullWidth blurred={fixedNavbar}>

      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""}`}>

            <Link to={`/${layout === 'dashboard' ? '#' : layout}`}>
              <Typography variant="small" color="blue-gray" className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100">
                {layout ? layout : "Dashboard"}
              </Typography>
            </Link>

            <Typography variant="small" color="blue-gray" className="font-normal">
              {page ? page : "Home"}
            </Typography>

          </Breadcrumbs>

          {/* <Typography variant="h6" color="blue-gray">
            {page}
          </Typography> */}
        </div>

        <div className="flex items-center align-end gap-0">
          {/* <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" />
          </div> */}

          <div className="flex items-center gap-4">
            <Avatar src={userAvatar} alt="user-avatar" size="xs" variant="circular" withBorder={true} color="blue" />
            <Typography variant="small" color="blue-gray" className="xl:flex">
              {user && user.name ? user.name : "User"}
            </Typography>
          </div>

          <Button variant="text" color="blue-gray" className="items-center gap-1 px-2 mx-3 py-2 xl:flex normal-case"
            onClick={() => dispatchRedux(logout())}>
            Sign Out
          </Button>

          <IconButton variant="text" color="blue-gray" className="grid xl:hidden">
            <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>

          {notifications && notifications.length > 0 &&
            <Menu>
              <MenuHandler>
                <IconButton variant="text" color="blue-gray">
                  <BellIcon className="h-5 w-5 text-blue-500" />
                </IconButton>
              </MenuHandler>

              <MenuList className="w-max border-0">
                {notifications && notifications.map((notification, key) => {
                  const senderImg = notification.sender && notification.sender.picture && notification.sender.picture.url
                    ? notification.sender.picture.url
                    : "/img/team-2.jpeg"

                  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })

                  return (
                    <MenuItem key={key} className="flex items-center gap-3 border-1 border-blue-gray-100 my-2 bg-blue-gray-50
                      hover:bg-blue-300 hover:bg-opacity-10" onClick={() => {
                        dispatchRedux(markAsRead(notification._id))
                          .then(() => {
                            dispatchRedux(getUserNotifications(user._id))
                              .then(() => { navigate(`/dashboard/chat`) })
                          })
                      }}>
                      <Avatar src={senderImg} alt="item-1" size="sm" variant="circular" />
                      <div>
                        <Typography variant="small" color="blue-gray" className="mb-1 font-normal">
                          <strong className="text-blue-gray-800 text-xs">
                            {notification.message ? notification.message : "New Notification"}
                          </strong>
                        </Typography>
                        <Typography variant="small" color="blue-gray"
                          className="flex items-center gap-1 text-xs font-normal opacity-60">
                          <ClockIcon className="h-3.5 w-3.5" /> {timeAgo ? timeAgo : "Just now"}
                        </Typography>
                      </div>
                    </MenuItem>
                  )
                })}
              </MenuList>
            </Menu>
          }

          <IconButton variant="text" color="blue-gray" onClick={() => setOpenConfigurator(dispatch, true)}>
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>

          <IconButton variant="text" color="blue-gray" className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}>
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar >
  )
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx"

export default DashboardNavbar
