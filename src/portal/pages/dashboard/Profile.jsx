import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Card, CardBody, CardHeader, CardFooter, Avatar, Typography, Tabs, TabsHeader, Tab, Switch, Tooltip,
  Button
} from "@material-tailwind/react"
import { ChatBubbleLeftEllipsisIcon, PencilIcon } from "@heroicons/react/24/solid"
import { ProfileInfoCard, MessageCard } from "@/portal/widgets/cards"
import Loading from '@/components/utils/Loading';
import { useDispatch, useSelector } from "react-redux";
import { loadUser, editProfilePicture, editProfilePlatformSettings, editProfile } from "@/redux/slices/usersSlice"
import { getFeaturedProjects } from "@/redux/slices/projectsSlice";
import { getUserChatList } from "@/redux/slices/messagesSlice";
import { CreateEditDialog } from "@/portal/widgets/dialogs/CreateEditDialog"
import { UploadImageDialog } from "@/portal/widgets/dialogs/UploadImageDialog"
import { openDialog } from "@/redux/slices/appSlice";

export function Profile() {

  const dispatch = useDispatch();
  const projects = useSelector(state => state.projects);
  const { chatList } = useSelector(state => state.messages);
  const { isLoading, user } = useSelector(state => state.users);
  const isDialogOpen = useSelector(state => state.app.isDialogOpen);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isUploadImageOpen, setIsUploadImageOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { dispatch(loadUser()) }, [dispatch]);
  useEffect(() => { user && user._id && dispatch(getFeaturedProjects(user._id)) }, [dispatch, user]);
  useEffect(() => { user && user._id && dispatch(getUserChatList(user._id)) }, [dispatch, user]);

  const userAvatar = user && user.picture && user.picture.url ? user.picture.url : "/img/team-2.jpeg";
  const userDepartment = user && user.department && user.department == "Unassigned" ? "No department  |  " : "  |  ";

  if (isLoading || !user) {
    return <Loading />
  }

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>

      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">

              <Tooltip
                content="Click to change profile picture"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                className="border border-blue-gray-50 bg-white px-3 py-2 shadow-xl 
                shadow-black/10 text-blue-500 rounded-lg cursor-pointer hover:shadow-lg"
              >
                <Avatar
                  src={userAvatar}
                  alt="bruce-mars"
                  size="xl"
                  variant="rounded"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40 cursor-pointer hover:shadow-lg"
                  onClick={() => {
                    setIsEditProfileOpen(false);
                    setIsUploadImageOpen(true);
                    dispatch(openDialog());
                  }}
                />
              </Tooltip>

              {isDialogOpen && isUploadImageOpen && (
                <UploadImageDialog
                  id={user._id}
                  uploadAction={({ formData, id }) => {
                    if (formData && id) {
                      return dispatch(editProfilePicture({ formData, id }));
                    }
                    return Promise.reject(new Error('User not found'));
                  }}
                  uploadName="profilePicture"
                  dialogTitle="Upload Profile Picture"
                  btnTitle="Upload Picture"
                  altBtnTitle="No, Thanks"
                  message={`Would you like to update your profile picture?`}
                />
              )}

              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {user.name && user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </Typography>
                <Typography variant="small" className="font-normal text-blue-gray-600">
                  {userDepartment} {!user.title || user.title == "Unassigned" ? "No title" : user.title}
                </Typography>
              </div>

            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>

                  {/* <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab> */}

                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Messages
                  </Tab>

                  {/* <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab> */}

                </TabsHeader>
              </Tabs>
            </div>
          </div>

          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            {
              user.platformSettingsData &&
              <div>
                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Platform Settings
                </Typography>

                <div className="flex flex-col gap-12">
                  {user.platformSettingsData.map(({ _id, title, options }) => {
                    const settingID = _id;
                    return (
                      <div key={_id}>

                        <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500">
                          {title}
                        </Typography>

                        <div className="flex flex-col gap-6">
                          {options.map(({ _id, checked, label }) => (
                            <Switch key={_id} id={_id} label={label} defaultChecked={checked}
                              color="blue"
                              labelProps={{ className: "text-sm my-2 font-normal text-blue-gray-500", }}
                              onChange={(e) => {
                                dispatch(editProfilePlatformSettings({
                                  settingID, optionID: _id, isChecked: e.target.checked, userID: user._id
                                }));
                              }}
                            />
                          ))}
                        </div>

                      </div>
                    )
                  })}
                </div>
              </div>
            }

            <ProfileInfoCard title="Profile Information" description={user.bio}
              details={{
                mobile: user.phone ? user.phone : "N/A",
                email: user.email ? user.email : "N/A"
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500"
                    onClick={() => {
                      setIsUploadImageOpen(false);
                      setIsEditProfileOpen(true);
                      dispatch(openDialog());
                    }}
                  />
                </Tooltip>
              } />

            {isDialogOpen && isEditProfileOpen && (
              <CreateEditDialog
                formData={{ _id: user._id, name: user.name, bio: user.bio, phone: user.phone }}
                functionToCall={editProfile}
                refresh={loadUser}
                dialogTitle={"Would you like to update your profile info?"}
                btnTitle={"Update"}
                altBtnTitle="Cancel" />
            )}
            <div>

              <Typography variant="h6" color="blue-gray" className="mb-3">
                Messages
              </Typography>

              <ul className="flex flex-col gap-6">
                {chatList && chatList.map((props) => {
                  // Skip if user is null for direct messages
                  if (!props.user) {
                    return null;
                  }

                  const userImage = props.user.picture && props.user.picture.url ? props.user.picture.url : "/img/team-2.jpeg";

                  return (
                    <MessageCard
                      key={props.user._id}
                      img={userImage}
                      name={props.user.name}
                      message={props.latestMessage.message}
                      action={
                        <Button variant="text" size="sm"
                          onClick={() => {
                            localStorage.setItem('msgReceiver', JSON.stringify(props.user));
                            navigate(`/dashboard/chat`)
                          }}>
                          reply
                        </Button>
                      }
                    />
                  );
                })}

              </ul>
            </div>
          </div>

          <div className="px-4 pb-4">

            {
              projects && projects.featuredProjects && projects.featuredProjects.length > 0 &&
              <>
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Projects
                </Typography>

                <Typography variant="small" className="font-normal text-blue-gray-500">
                  Featured projects
                </Typography>

                <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                  {projects.featuredProjects.map(
                    ({ pGallery, pName, pDescription, status, route }) => (
                      <Card key={pName} color="transparent" shadow={false}>

                        <CardHeader floated={false} color="gray" className="mx-0 mt-0 mb-4 h-64 xl:h-40">
                          <img src={pGallery.length > 0 && pGallery[0].url} alt={pName} className="h-full w-full object-cover" />
                        </CardHeader>

                        <CardBody className="py-0 px-1">
                          <Typography variant="small" className="font-normal text-blue-gray-500">
                            {status}
                          </Typography>

                          <Typography variant="h5" color="blue-gray" className="mt-1 mb-2">
                            {pName}
                          </Typography>

                          <Typography variant="small" className="font-normal text-blue-gray-500">
                            {pDescription}
                          </Typography>
                        </CardBody>

                        <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                          <Link to={route}>
                            <Button variant="outlined" size="sm">
                              view project
                            </Button>
                          </Link>

                          <div>
                            {pGallery.map(({ url, public_id }, key) => (
                              <Tooltip key={public_id} content={public_id}>
                                <Avatar src={url} alt={public_id} size="xs" variant="circular"
                                  className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"}`} />
                              </Tooltip>
                            ))}
                          </div>
                        </CardFooter>

                      </Card>))}
                </div>
              </>
            }
          </div>
        </CardBody>
      </Card>
    </>
  )
}

export default Profile
