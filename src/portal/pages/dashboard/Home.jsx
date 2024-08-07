import React, { useEffect, useState } from "react";
import { Typography, Card, CardHeader, CardBody, IconButton, Menu, MenuHandler, MenuList, MenuItem, Avatar, Tooltip, Progress } from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/portal/widgets/cards";
import { StatisticsChart } from "@/portal/widgets/charts";
import { statisticsCardsData, statisticsChartsData, projectsTableData, ordersOverviewData } from "@/portal/data";
import { QueueListIcon, PuzzlePieceIcon, UserGroupIcon, Squares2X2Icon, ClockIcon, EnvelopeOpenIcon, UsersIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";

import { getClients } from "@/redux/slices/clientsSlice"
import { getProjects } from "@/redux/slices/projectsSlice";
import { getPTypes } from "@/redux/slices/projectTypesSlice";
import { getServices } from "@/redux/slices/servicesSlice";
import { getUsers } from "@/redux/slices/usersSlice";
import { getContacts } from "@/redux/slices/contactsSlice";

export function Home() {

  const dispatch = useDispatch();
  const [statistics, setStatistics] = useState([]);

  const services = useSelector(state => state.services);
  const pTypes = useSelector(state => state.pTypes);
  const projects = useSelector(state => state.projects);
  const clients = useSelector(state => state.clients);
  const users = useSelector(state => state.users);
  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(getServices());
    dispatch(getPTypes());
    dispatch(getProjects());
    dispatch(getClients());
    dispatch(getUsers());
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    setStatistics([
      {
        icon: QueueListIcon,
        title: "Services",
        value: services.services,
        footer: {
          value: "",
          label: "Company services",
          color: "yellow",
        },
      },
      {
        icon: Squares2X2Icon,
        title: "Project Types",
        value: pTypes.pTypes,
        footer: {
          value: "",
          label: "Company project types",
          color: "pink",
        },
      },
      {
        icon: PuzzlePieceIcon,
        title: "Projects",
        value: projects.projects,
        footer: {
          value: "",
          label: "Company projects",
          color: "blue",
        },
      },
      {
        icon: UserGroupIcon,
        title: "Clients",
        value: clients.clients,
        footer: {
          value: "",
          label: "Company clients",
          color: "red",
        },
      },
      {
        icon: UsersIcon,
        title: "Employees",
        value: users.users,
        footer: {
          value: "",
          label: "Company employees",
          color: "green",
        },
      },
      {
        icon: EnvelopeOpenIcon,
        title: "Contacts",
        value: contacts.contacts,
        footer: {
          value: "",
          label: "All contacts",
          color: "green",
        },
      },
    ]);
  }, [clients, projects, pTypes, services, users, contacts]);

  return (
    <div className="mt-12">

      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">

        {statistics.map(({ icon, title, value, footer }) => (
          <StatisticsCard
            key={title}
            icon={React.createElement(icon, { className: "w-6 h-6 text-white" })}
            title={title}
            value={value.length}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>
                  {footer.value}
                </strong>&nbsp;{footer.label}
              </Typography>} color={footer.color}
            data={value}
          />
        ))}

        {/* {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))} */}
      </div>

      {/* 
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div> */}

      {/*       
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
                <CheckCircleIcon strokeWidth={3} className="h-4 w-4 text-blue-gray-200" />
                <strong>30 done</strong> this month
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["companies", "members", "budget", "completion"].map(
                    (el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                      }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                              <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${key === 0 ? "" : "-ml-2.5"
                                  }`}
                              />
                            </Tooltip>
                          ))}
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {budget}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>


        <Card className="border border-blue-gray-100 shadow-sm">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Orders Overview
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal text-blue-gray-600"
            >
              <ArrowUpIcon
                strokeWidth={3}
                className="h-3.5 w-3.5 text-green-500"
              />
              <strong>24%</strong> this month
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            {ordersOverviewData.map(
              ({ icon, color, title, description }, key) => (
                <div key={title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key === ordersOverviewData.length - 1
                      ? "after:h-0"
                      : "after:h-4/6"
                      }`}
                  >
                    {React.createElement(icon, {
                      className: `!w-5 !h-5 ${color}`,
                    })}
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium"
                    >
                      {title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500"
                    >
                      {description}
                    </Typography>
                  </div>
                </div>
              )
            )}
          </CardBody>
        </Card>

      </div> */}
    </div>
  );
}

export default Home;
