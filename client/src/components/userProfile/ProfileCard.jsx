import React from "react";
import { Card, Container, Stack, Typography, Avatar } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import useDate from "../../hooks/useDate";
import { useNavigate } from "react-router-dom";
import dummyProfile from "../../assets/profile.png"

const ProfileCard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const userData =
    useSelector((state) => state.user.user) ||
    JSON.parse(localStorage.getItem("userData"));
  const dob = useDate(userData.dateOfBirth);
  const joinDate = useDate(userData.createdAt);
  return (
    <Stack spacing={2}>
      <Card sx={{ px: 0, py: 3 }} backgroundcolor={colors.blueAccent[500]}>
        <Container sx={{ position: "relative", width: "100%" }}>
          <img
            src={
              userData.coverPicture ||
              "https://trusteid.mioa.gov.mk/wp-content/plugins/uix-page-builder/uixpb_templates/images/UixPageBuilderTmpl/default-cover-2.jpg"
            }
            alt=""
            style={{
              width: "100%",
              height: "100px",
              objectFit: "cover",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
          <Avatar
            src={userData?.profilePicture || dummyProfile}
            alt=""
            sx={{
              position: "absolute",
              bottom: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "80px",
              height: "80px",
              border: "3px solid #fff",
              backgroundColor: "#fff",
            }}
          />
        </Container>
        <Typography
          align="center"
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: colors.blueAccent[500],
            mt: 6,
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/profile")}
        >
          {userData.firstName} {userData.lastName}
        </Typography>
        <Typography
          align="center"
          sx={{
            color: "gray",
            fontSize: "14px",
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/profile")}
        >
          {userData.username}
        </Typography>
        <Container
          sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}
        >
          <div>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              {userData.followers.length}
            </Typography>
            <Typography sx={{ color: "gray", textAlign: "center" }}>
              Followers
            </Typography>
          </div>
          <div>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              {userData.following.length}
            </Typography>
            <Typography sx={{ color: "gray", textAlign: "center" }}>
              Following
            </Typography>
          </div>
        </Container>
        <hr style={{ color: "gray" }} />
        <Container sx={{ mt: 2 }}>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Profession:</span>{" "}
            {userData.profession || "N/A"}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Date of Birth:</span>
            {" "}
             {!userData.dateOfBirth?"N/A":dob}
          </Typography>
          <Typography>
            <span style={{ fontWeight: "bold" }}>Joined On:</span> {joinDate}
          </Typography>
        </Container>
      </Card>
    </Stack>
  );
};

export default ProfileCard;
