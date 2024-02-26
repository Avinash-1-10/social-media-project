import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, useTheme, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import SideBar from "./SideBar";
import UserActions from "./UserActions";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";

const UserTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  console.log("users", users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user/allUsers");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const verifyUser = async (id) => {
    console.log("ver");

    const res = await axios.put(
      `http://localhost:8080/api/user/verified/${id}`
    );
  };

  const handleEdit = () => {
    console.log("Edit user:");
  };

  const handleDelete = async () => {
    console.log("delete user");
  };

  const columns = [
    {
      field: "profilePicture",
      headerName: "AVATAR",
      flex: 1,
      renderCell: ({ row: { profilePicture } }) => {
        return (
          <Avatar
            src={profilePicture}
            alt=""
            sx={{
              width: "40px",
              height: "40px",
              border: "2px solid #fff",
              backgroundColor: "#fff",
            }}></Avatar>
        );
      },
    },
    {
      field: "username",
      headerName: "USERNAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "firstName",
      headerName: "FIRSTNAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "LASTNAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    { field: "email", headerName: "EMAIL", flex: 1 },
    // { field: "_id", hide: true },
    {
      field: "role",
      headerName: "ROLE",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box width="60%" borderRadius="4px">
            {role === "admin" && <AdminPanelSettingsIcon />}
            {role === "user" && <PersonIcon />}
          </Box>
        );
      },
    },
    {
      field: "verified",
      headerName: "VERIFIED",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box onClick={() => verifyUser(row._id)}>
            {row.verified ? (
              <ToggleOnIcon
                sx={{ fontSize: 30, color: colors.greenAccent[500] }}
              />
            ) : (
              <ToggleOffIcon sx={{ fontSize: 30 }} />
            )}
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: ({ row }) => <UserActions id={row._id} />,
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      <SideBar />

      <Box m="0 0 20px 20px" sx={{ flex: 1, minWidth: 65 }}>
        <Box
          height="100vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
          }}>
          <DataGrid
            rows={users}
            columns={columns}
            getRowId={(row) => row._id}
            // loading={true}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        </Box>
      </Box>
    </div>
  );
};

export default UserTable;
