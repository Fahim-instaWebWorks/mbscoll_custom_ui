import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import CustomTextField from "../atom/CustomTextField";
import { useState } from "react";

const FirstComponent = ({ formData, handleInputChange }) => {
  const [activityType, setActivityType] = useState([
    "Meeting",
    "Todo",
    "Appointment",
    "Boardroom",
    "Call Billing",
    "Email Billing",
    "Initial Consultation",
    "Call",
    "Mail",
    "Meeting Billing",
    "Personal Activity",
    "Room 1",
    "Room 2",
    "Room 3",
    "Todo Billing",
    "Vacation",
  ]);

  const [associateWith,setAssociateWith] = useState([])
  return (
    <Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid size={12}>
          <CustomTextField
            fullWidth
            size="small"
            placeholder="Event_title"
            variant="outlined"
            value={formData.Event_title}
            onChange={(e) => handleInputChange("Event_title", e.target.value)}
          />
        </Grid>

        <Grid size={12}>
          <FormControl fullWidth size="small">
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{ top: "-5px" }}
            >
              Activity type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Activity type"
              fullWidth
              value={formData.title}
              onChange={(e) =>
                handleInputChange("title", e.target.value)
              }
              MenuProps={{
                //   disablePortal: true,  // This ensures the dropdown is not restricted to the modal's container
                PaperProps: {
                  style: {
                    zIndex: 1300, // Increase this if necessary, depending on the z-index of your popup
                  },
                },
              }}
              sx={{
                "& .MuiSelect-select": {
                  padding: "3px 10px", // Adjust the padding to shrink the Select content
                },
                "& .MuiOutlinedInput-root": {
                  // height: '40px', // Set a consistent height
                  padding: 0, // Ensure no extra padding
                },
                "& .MuiInputBase-input": {
                  display: "flex",
                  alignItems: "center", // Align the content vertically
                },
              }}
            >
              {activityType.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem>
              
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <CustomTextField
            fullWidth
            size="small"
            placeholder="Start Time"
            variant="outlined"
            value={formData.startTime}
            onChange={(e) => handleInputChange("startTime", e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <CustomTextField
            fullWidth
            size="small"
            placeholder="End Time"
            variant="outlined"
            value={formData.endTime}
            onChange={(e) => handleInputChange("endTime", e.target.value)}
          />
        </Grid>
        <Grid size={4}>
          <FormControl fullWidth size="small">
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{ top: "-5px" }}
            >
              Duration
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Duration"
              fullWidth
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  padding: "3px 10px", // Adjust the padding to shrink the Select content
                },
                "& .MuiOutlinedInput-root": {
                  // height: '40px', // Set a consistent height
                  padding: 0, // Ensure no extra padding
                },
                "& .MuiInputBase-input": {
                  display: "flex",
                  alignItems: "center", // Align the content vertically
                },
              }}
            >
              <MenuItem value={10}>5 minutes</MenuItem>
              <MenuItem value={20}>10 minutes</MenuItem>
              <MenuItem value={30}>15 minutes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={12}>
        <FormControl fullWidth size="small">
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{ top: "-5px" }}
            >
              Associate with
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Associate with"
              fullWidth
              value={formData.title}
              onChange={(e) =>
                handleInputChange("associateWith", e.target.value)
              }
              MenuProps={{
                //   disablePortal: true,  // This ensures the dropdown is not restricted to the modal's container
                PaperProps: {
                  style: {
                    zIndex: 1300, // Increase this if necessary, depending on the z-index of your popup
                  },
                },
              }}
              sx={{
                "& .MuiSelect-select": {
                  padding: "3px 10px", // Adjust the padding to shrink the Select content
                },
                "& .MuiOutlinedInput-root": {
                  // height: '40px', // Set a consistent height
                  padding: 0, // Ensure no extra padding
                },
                "& .MuiInputBase-input": {
                  display: "flex",
                  alignItems: "center", // Align the content vertically
                },
              }}
            >
              {activityType.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <CustomTextField
            fullWidth
            size="small"
            placeholder="Associate with"
            variant="outlined"
            value={formData.associateWith}
            onChange={(e) => handleInputChange("associateWith", e.target.value)}
          /> */}
        </Grid>
        <Grid size={12}>
        <FormControl fullWidth size="small">
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{ top: "-5px" }}
            >
              Schedule with
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Schedule with"
              fullWidth
              multiple
              value={formData.title}
              onChange={(e) =>
                handleInputChange("ScheduleWith", e.target.value)
              }
              MenuProps={{
                //   disablePortal: true,  // This ensures the dropdown is not restricted to the modal's container
                PaperProps: {
                  style: {
                    zIndex: 1300, // Increase this if necessary, depending on the z-index of your popup
                  },
                },
              }}
              sx={{
                "& .MuiSelect-select": {
                  padding: "3px 10px", // Adjust the padding to shrink the Select content
                },
                "& .MuiOutlinedInput-root": {
                  // height: '40px', // Set a consistent height
                  padding: 0, // Ensure no extra padding
                },
                "& .MuiInputBase-input": {
                  display: "flex",
                  alignItems: "center", // Align the content vertically
                },
              }}
            >
              {activityType.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid size={6}>
          <FormControl fullWidth size="small" sx={{ minHeight: "20px" }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{ top: "-5px" }}
            >
              Schedule for ...
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Schedule for"
              fullWidth
              value={formData.scheduleFor}
              onChange={(e) => handleInputChange("scheduleFor", e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  padding: "3px 10px", // Adjust the padding to shrink the Select content
                },
                "& .MuiOutlinedInput-root": {
                  // height: '40px', // Set a consistent height
                  padding: 0, // Ensure no extra padding
                },
                "& .MuiInputBase-input": {
                  display: "flex",
                  alignItems: "center", // Align the content vertically
                },
              }}
            >
              <MenuItem value={10}>Low</MenuItem>
              <MenuItem value={20}>Medium</MenuItem>
              <MenuItem value={30}>High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={6}>
          <CustomTextField
            fullWidth
            size="small"
            placeholder="Location"
            variant="outlined"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
        </Grid>

        <Grid size={4}>
          <FormControl fullWidth size="small" sx={{ minHeight: "20px" }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{ top: "-5px" }}
            >
              Priority
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Priority"
              fullWidth
              value={formData.priority}
              onChange={(e) => handleInputChange("priority", e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  padding: "3px 10px", // Adjust the padding to shrink the Select content
                },
                "& .MuiOutlinedInput-root": {
                  // height: '40px', // Set a consistent height
                  padding: 0, // Ensure no extra padding
                },
                "& .MuiInputBase-input": {
                  display: "flex",
                  alignItems: "center", // Align the content vertically
                },
              }}
            >
              <MenuItem value={10}>Low</MenuItem>
              <MenuItem value={20}>Medium</MenuItem>
              <MenuItem value={30}>High</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <FormControl fullWidth size="small">
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{ top: "-5px" }}
            >
              Ring Alarm
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Ring Alarm"
              fullWidth
              value={formData.ringAlarm}
              onChange={(e) => handleInputChange("ringAlarm", e.target.value)}
              sx={{
                "& .MuiSelect-select": {
                  padding: "3px 10px", // Adjust the padding to shrink the Select content
                },
                "& .MuiOutlinedInput-root": {
                  // height: '40px', // Set a consistent height
                  padding: 0, // Ensure no extra padding
                },
                "& .MuiInputBase-input": {
                  display: "flex",
                  alignItems: "center", // Align the content vertically
                },
              }}
            >
              <MenuItem value={10}>5 minutes</MenuItem>
              <MenuItem value={20}>10 minutes</MenuItem>
              <MenuItem value={30}>15 minutes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <CustomTextField type="color" label='color' fullWidth onChange={(e)=>console.log(e.target.value)}/>
        </Grid>
        {/* <Grid size={3}>
          <Button
            variant="contained"
            size="small"
            sx={{ bgcolor: "gray" }}
            fullWidth
          >
            {" "}
            Schedule for
          </Button>
        </Grid> */}
      </Grid>

      <FormControlLabel
        control={<Checkbox />}
        label="Create separate activity for each contact"
      />
    </Box>
  );
};

export default FirstComponent;
