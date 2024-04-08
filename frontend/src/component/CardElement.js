import * as React from "react";
import { Fragment } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton, Box, useTheme } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import the check circle icon

const CardElement = ({
  jobTitle,
  description,
  category,
  location,
  id,
  status,
  shouldShowMoreDetails,
  shouldShowStatus,
}) => {
  const { palette } = useTheme();
  return (
    <Card sx={{ minWidth: 275, mb: 3, mt: 3, bgcolor: palette.primary.white }}>
      <Box sx={{ position: 'relative' }}>
        {shouldShowStatus && (
          <Box sx={{ position: 'absolute', top: 5, right: 5, zIndex: 1 }}>
            <Button
              disableElevation
              variant="contained"
              size="small"
              startIcon={<CheckCircleIcon />} // Use the check circle icon
              sx={{ backgroundColor: "green", color: "#ffffff" }} // Style the button with green background and white text
            >
              {status}
            </Button>
          </Box>
        )}
      </Box>
      <CardContent>
        <Typography
          sx={{ fontSize: 15, color: palette.secondary.main, fontWeight: 500 }}
          gutterBottom
        >
          <IconButton>
            <LocationOnIcon
              sx={{ color: palette.secondary.main, fontSize: 18 }}
            />
          </IconButton>{" "}
          {location}
        </Typography>
        <Typography variant="h5" component="div">
          {jobTitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {category}
        </Typography>
        <Typography variant="body2">
          Description:{" "}
          {description && description.split(" ").slice(0, 15).join(" ") + "..."}
        </Typography>
      </CardContent>
      {shouldShowMoreDetails && (
        <Fragment>
          <CardActions>
            <Button
              disableElevation
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
            >
              <Link
                style={{ textDecoration: "none", color: "white", boxShadow: 0 }}
                to={`/user/job/${id}`}
              >
                More Details
              </Link>
            </Button>
          </CardActions>
        </Fragment>
      )}
    </Card>
  );
};

export default CardElement;
