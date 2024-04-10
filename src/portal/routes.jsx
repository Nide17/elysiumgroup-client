import { HomeIcon, UserCircleIcon, QueueListIcon, UserGroupIcon, UsersIcon, PuzzlePieceIcon, EnvelopeOpenIcon, Squares2X2Icon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid"
import { Home, Profile, Services, ProjectTypes, Projects, AddProjectForm, EditProjectForm, ImagesUploader, Clients, Contacts, Users, EditUserForm, Chat } from "./pages/dashboard"

const icon = {
  className: "w-5 h-5 text-inherit",
}

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "users",
        path: "/users",
        element: <Users />,
      },
      {
        name: "edit-user/:userID",
        path: "/users/edit-user/:userID",
        element: <EditUserForm />,
      },
      {
        icon: <QueueListIcon {...icon} />,
        name: "services",
        path: "/services",
        element: <Services />,
      },
      {
        icon: <Squares2X2Icon {...icon} />,
        name: "projects-types",
        path: "/projects-types",
        element: <ProjectTypes />,
      },
      {
        icon: <PuzzlePieceIcon {...icon} />,
        name: "projects",
        path: "/projects",
        element: <Projects />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "clients",
        path: "/clients",
        element: <Clients />,
      },
      {
        icon: <EnvelopeOpenIcon {...icon} />,
        name: "contacts",
        path: "/contacts",
        element: <Contacts />,
      },
      {
        icon: <ChatBubbleLeftRightIcon {...icon} />,
        name: "chat",
        path: "/chat",
        element: <Chat />,
      },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
      // New project
      {
        name: "new-project",
        path: "/projects/new-project",
        element: <AddProjectForm />,
      },
      {
        name: "edit-project/:projectID",
        path: "/projects/edit-project/:projectID",
        element: <EditProjectForm />,
      },
      {
        name: "add-images",
        path: "/projects/add-images/:projectID",
        element: <ImagesUploader />,
      },
    ],
  }
]

export default routes
