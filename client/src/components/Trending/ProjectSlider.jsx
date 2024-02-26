// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import IconButton from "@mui/material/IconButton";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: "San Francisco",
//     imgPath:
//       "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
//     viewLink: "#",
//     githubLink: "#",
//   },
//   {
//     label: "Bird",
//     imgPath:
//       "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
//     viewLink: "#",
//     githubLink: "#",
//   },
//   // ... other images
// ];

// function ProjectSlider() {
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const maxSteps = images.length;

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
//   };

//   const handleBack = () => {
//     setActiveStep(
//       (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps
//     );
//   };

//   const handleStepChange = (step) => {
//     setActiveStep(step);
//   };

//   return (
//     <Box sx={{ maxWidth: 400, flexGrow: 1, position: "relative", mt: 3 }}>
//       <AutoPlaySwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={activeStep}
//         onChangeIndex={handleStepChange}
//         enableMouseEvents>
//         {images.map((step, index) => (
//           <div key={step.label} style={{ position: "relative" }}>
//             {Math.abs(activeStep - index) <= 2 ? (
//               <Box
//                 component="img"
//                 sx={{
//                   maxHeight: 200,
//                   display: "block",
//                   maxWidth: 400,
//                   width: "100%",
//                 }}
//                 src={step.imgPath}
//                 alt={step.label}
//               />
//             ) : null}
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center", // Center the content vertically
//                 alignItems: "center",
//                 backgroundColor: "rgba(0, 0, 0, 0.5)",
//                 padding: 1,
//                 opacity: 0.9,
//               }}>
//               <Typography sx={{ color: "white", textAlign: "center", mb: 1 }}>
//                 {step.label}
//               </Typography>
//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <IconButton
//                   color="inherit"
//                   component="a"
//                   href={step.viewLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   sx={{
//                     bgcolor: "white",
//                     ":hover": { bgcolor: "#2196F3", color: "white" },
//                     mr: 1,
//                   }}>
//                   <VisibilityIcon />
//                 </IconButton>
//                 <IconButton
//                   color="inherit"
//                   component="a"
//                   href={step.githubLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   sx={{
//                     bgcolor: "white",
//                     ":hover": { bgcolor: "#2196F3", color: "white" },
//                     ml: 1,
//                   }}>
//                   <GitHubIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </div>
//         ))}
//       </AutoPlaySwipeableViews>
//       <MobileStepper
//         steps={maxSteps}
//         position="static"
//         activeStep={activeStep}
//         nextButton={
//           <Button
//             size="small"
//             onClick={handleNext}
//             disabled={activeStep === maxSteps - 1}>
//             Next
//             {theme.direction === "rtl" ? (
//               <KeyboardArrowLeft />
//             ) : (
//               <KeyboardArrowRight />
//             )}
//           </Button>
//         }
//         backButton={
//           <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
//             {theme.direction === "rtl" ? (
//               <KeyboardArrowRight />
//             ) : (
//               <KeyboardArrowLeft />
//             )}
//             Back
//           </Button>
//         }
//       />
//     </Box>
//   );
// }

// export default ProjectSlider;

import React from 'react'

const ProjectSlider = () => {
  return (
    <div>ProjectSlider</div>
  )
}

export default ProjectSlider
