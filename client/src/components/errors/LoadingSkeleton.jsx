import React from "react";
import {
  Paper,
  Grid,
  Box,
  useMediaQuery,
  Skeleton,
  Stack,
  Container,
} from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <Box sx={{ width: "60%", minWidth: "350px", p: 2 }}>
      <Stack spacing={1}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Skeleton
              variant="circular"
              sx={{ width: 60, height: 60, borderRadius: "50%" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Skeleton variant="rectangular" width={100} height={20} />
              <Skeleton variant="rectangular" width={70} height={10} />
            </Box>
          </Box>
          <Skeleton
            variant="rectangular"
            sx={{ width: 30, height: 20, borderRadius: 2 }}
          />
        </Box>
        <Skeleton
          variant="rectangular"
          sx={{ width: "50%", height: 13, borderRadius:2 }}
        />
        <Skeleton variant="rounded" sx={{ height: 250 }} />
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Skeleton
              variant="circular"
              sx={{ width: 30, height: 20, borderRadius: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width={50}
              height={13}
              sx={{ borderRadius: 2 }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Skeleton
              variant="circular"
              sx={{ width: 30, height: 20, borderRadius: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width={50}
              height={13}
              sx={{ borderRadius: 2 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginLeft: "auto",
            }}
          >
            <Skeleton
              variant="circular"
              sx={{ width: 30, height: 20, borderRadius: 2 }}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoadingSkeleton;
