import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Badge,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const TaskCard = styled(Card)`
  margin: 10px 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const TimeBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: ${(props) =>
      props.status === "completed" ? "#4caf50" : "#f44336"};
    color: white;
    font-weight: bold;
  }
`;

const Reviews = () => {
    const location = useLocation()
  const tasks = [
    {
      title: "Follow up client for feedback",
      subtitle: "Sending report",
      time: "00:15",
      status: "completed",
    },
    {
      title: "Follow up client for feedback",
      subtitle: "Received report",
      time: "00:15",
      status: "completed",
    },
    {
      title: "Follow up client for feedback",
      subtitle: "Sending report",
      time: "00:15",
      status: "pending",
    },
  ];
  if (location.pathname !== "/reviews") {
    return null;
  }
  return (
    <Box p={3}>
      <Typography variant="h6">My Task</Typography>
      {tasks.map((task, index) => (
        <TaskCard key={index}>
          <CardContent>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="subtitle1">{task.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.subtitle}
                </Typography>
              </Grid>
              <Grid item>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <TimeBadge badgeContent={task.time} status={task.status} />
                  </Grid>
                  <Grid item>
                    <IconButton>
                      <CheckCircleOutline
                        color={
                          task.status === "completed" ? "success" : "action"
                        }
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </TaskCard>
      ))}
    </Box>
  );
};

export default Reviews;
