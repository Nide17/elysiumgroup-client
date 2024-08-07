import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { read, utils, writeFile } from 'xlsx';
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export function StatisticsCard({ color, icon, title, value, footer, data }) {

  const user = useSelector(state => state.users.user);
  const generateDownloadExcel = (data) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    writeFile(wb, "data.xlsx");

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });
      const sheet_name_list = workbook.SheetNames;
      const xlData = utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    };

    reader.readAsArrayBuffer(new Blob([wb], { type: 'application/octet-stream' }));
  }

  return (
    <Card className="border border-blue-gray-100 shadow-sm">

      <CardHeader variant="gradient" color={color} floated={false} shadow={false}
        className="absolute grid h-12 w-12 place-items-center" >
        {icon}
      </CardHeader>

      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4 flex items-center justify-between">
          <span>{footer}</span>
          <ArrowDownCircleIcon className={`h-6 w-6 text-blue-500 cursor-pointer
          ${user && user.role === 'admin' ? 'visible' : 'hidden'}`}
            onClick={() => generateDownloadExcel(data)} />
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
