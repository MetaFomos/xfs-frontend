import React from "react";
// import {
//     Card,
//     CardHeader,
//     CardBody,
//     CardFooter,
//     Typography,
//   } from "@material-tailwind/react";
import {
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

interface IDashboardProps {}

export const Dashboard: React.FC<IDashboardProps> = () => {
  return (
    <div>
      <h1 className="text-6xl mt-5 text-center">XDAG Funding System</h1>
      <p className="text-center text-xl mt-5">
        XDAG is a novel application of Directed Acyclic Graph (DAG) technology
        that solves the issues currently facing blockchain technology.{" "}
      </p>
      <div className="flex gap-5 mt-5">
        <Card className="w-[50%] cursor-pointer hover:shadow-xl">
          <CardBody className="text-center border p-3 h-[150px] flex items-center flex-col">
            <Typography variant="h5" className="mb-2 mt-3">
              Ideas
            </Typography>
            <Typography>
              If you have an idea for a feature, task, or service, this is the
              place to pitch it for discussion.
            </Typography>
          </CardBody>
        </Card>
        <Card className="w-[50%] cursor-pointer hover:shadow-xl">
          <CardBody className="text-center border p-3 h-[150px] flex items-center flex-col">
            <Typography variant="h5" className="mb-2 mt-3">
              Fund Required
            </Typography>
            <Typography>
              Once a pitched and approved idea has been picked up by a developer
              or team it goes here for community fundraising.
            </Typography>
          </CardBody>
        </Card>
      </div>
      <div className="flex gap-5 mt-5">
        <Card className="w-[50%] cursor-pointer hover:shadow-xl">
          <CardBody className="text-center border p-3 h-[150px] flex items-center flex-col">
            <Typography variant="h5" className="mb-2 mt-3">
              Work In Progress
            </Typography>
            <Typography>
              Approved ideas that have been picked up and successfully funded
              are moved here so their progress can be monitored.
            </Typography>
          </CardBody>
        </Card>
        <Card className="w-[50%] cursor-pointer hover:shadow-xl">
          <CardBody className="text-center border p-3 h-[150px] flex items-center flex-col">
            <Typography variant="h5" className="mb-2 mt-3">
              Completed
            </Typography>
            <Typography>
              Once an item has been completed, all milestones met, and all funds
              paid out, the thread moves here.
            </Typography>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};