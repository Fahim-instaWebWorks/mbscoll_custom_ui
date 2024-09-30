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

const FirstComponent = () => {
  return (
    <Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-standard-label" sx={{top:'-5px'}}>
              Activity type
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Activity type"
              fullWidth
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={4}>
          <CustomTextField
            fullWidth
            size="small"
            placeholder="Start Time"
            variant="outlined"
          />
        </Grid>
        <Grid size={4}>
          <CustomTextField
            fullWidth
            size="small"
            placeholder="End Time"
            variant="outlined"
          />
        </Grid>
        <Grid size={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-standard-label" sx={{top:'-5px'}}>
              Duration
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Duration"
              fullWidth
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
          <CustomTextField
            fullWidth
            size="small"
            placeholder="Associate with"
            variant="outlined"
          />
        </Grid>
        <Grid size={12}>
          <CustomTextField
            fullWidth
            size="small"
            placeholder="Regarding"
            variant="outlined"
          />
        </Grid>
        <Grid size={6}>
          <CustomTextField
            fullWidth
            size="small"
            placeholder="Resources"
            variant="outlined"
          />
        </Grid>
        <Grid size={6}>
          <CustomTextField
            fullWidth
            size="small"
            placeholder="Location"
            variant="outlined"
          />
        </Grid>
        <Grid size={4}>
          <FormControl fullWidth size="small" sx={{ minHeight: "20px" }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              sx={{
                top: "-5px", // Adjust the vertical position of the label
              }}
            >
              Priority
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Priority"
              fullWidth
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
            <InputLabel id="demo-simple-select-standard-label" sx={{top:'-5px'}}>
              Ring Alarm
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Ring Alarm"
              fullWidth
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
          <Button
            variant="contained"
            size="small"
            sx={{  bgcolor: "gray" }}
            fullWidth
          >
            {" "}
            Schedule for ...
          </Button>
        </Grid>
      </Grid>

      <FormControlLabel
        control={<Checkbox />}
        label="Create separate activity for each contact"
      />
    </Box>
  );
};

export default FirstComponent;
