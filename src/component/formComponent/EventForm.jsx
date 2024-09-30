import React from "react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Input, Select, Textarea } from "@mobiscroll/react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const EventForm = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handlers for Next and Back buttons
  const handleNext = () => {
    if (value < 2) setValue(value + 1); // Increment to next tab
  };

  const handleBack = () => {
    if (value > 0) setValue(value - 1); // Decrement to previous tab
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 2,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          aria-label="simple tabs example"
        >
          <Tab label="General" />
          <Tab label="Details" />
          <Tab label="Reccurence" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FirstComponent />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button size="small" disabled>Back</Button> {/* Back is disabled on first tab */}
          <Button size="small" variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SecondComponent />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button size="small" variant="contained" color="primary" onClick={handleBack}>
            Back
          </Button>
          <Button size="small" variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ThirdComponent />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button size="small" variant="contained" color="primary" onClick={handleBack}>
            Back
          </Button>
          <Button size="small"  variant="contained" color="secondary">Submit</Button> {/* Next is disabled on the last tab */}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default EventForm;
