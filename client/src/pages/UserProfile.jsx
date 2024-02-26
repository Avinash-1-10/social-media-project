import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Box } from "@mui/material";
import Trending from "../components/Trending/Trending";
import ProfileSection from "../components/userProfile/ProfileSection";
import Profile from "../components/userProfile/Profile";

const UserProfile = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isMedium = useMediaQuery(theme.breakpoints.between("md", "lg"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {isDesktop && (
          <>
            <Grid item xs>
              <Profile />
            </Grid>
            <Grid item xs={6}>
              <ProfileSection />
            </Grid>
            <Grid item xs>
              <Trending />
            </Grid>
          </>
        )}
        {isMedium && (
          <>
            <Grid item xs={4}>
              <Profile />
            </Grid>
            <Grid item xs={8}>
              <ProfileSection />
            </Grid>
          </>
        )}
        {!isDesktop && !isMedium && (
          <Grid item xs={12}>
            <ProfileSection />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default UserProfile;
