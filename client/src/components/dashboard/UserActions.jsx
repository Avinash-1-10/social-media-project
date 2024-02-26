import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

const UserActions = ({ id }) => {
  const [users, setUsers] = useState();

  const deleteUser = async () => {
    const res = await axios.delete(`http://localhost:8080/api/user/${id}`);
    console.log("res", res);
    // setUsers(res.data);
  };

  // deleteUser();

  return (
    <Box>
      <Tooltip title="View user details">
        <IconButton onClick={() => console.log(id)}>
          <Preview />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete this user">
        <IconButton onClick={deleteUser}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UserActions;
