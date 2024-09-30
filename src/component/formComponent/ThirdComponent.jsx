import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2 as Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import CustomTextField from "../atom/CustomTextField";

const ThirdComponent = () => {
  return (
    <Box>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="once"
          name="radio-buttons-group"
        >
          <FormControlLabel
            value="once"
            control={<Radio size="small" />}
            label="Once (This activity occurs only once)"
          />
          <FormControlLabel
            value="daily"
            control={<Radio size="small" />}
            label="Daily (This activity occurs daily)"
          />
          <FormControlLabel
            value="weekly"
            control={<Radio size="small" />}
            label="Weekly (This activity occurs weekly)"
          />
          <FormControlLabel
            value="monthly"
            control={<Radio size="small" />}
            label="Monthly (This activity occurs monthly)"
          />
          <FormControlLabel
            value="yearly"
            control={<Radio size="small" />}
            label="Yearly (This activity occurs yearly)"
          />
        </RadioGroup>
      </FormControl>

      <Grid container spacing={2} sx={{ mt: 1, py: 1 }}>
        <Grid size={6}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ minWidth: "80px" }}>
              Starts :
            </Typography>
            <CustomTextField
              fullWidth
              size="small"
              label=""
              variant="outlined"
            />
          </Box>
        </Grid>
        <Grid size={6}>
        <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ minWidth: "80px" }}>
              Ends :
            </Typography>
            <CustomTextField fullWidth size="small" label="" variant="outlined" />
          </Box>
          <FormControlLabel
            value="no end date"
            control={<Radio size="small" />}
            label="No end date"
          />
          
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThirdComponent;
