import React, { useState } from "react";
import StyleEditPopUp from "./EditPopUpTeams.module.css";
import { FormControl, TextField, Stack } from "@mui/material";
import Box from "@mui/material/Box";
// import { InputLabel, Select, Chip, MenuItem } from "@mui/material";
// import { usePlayersStore } from "../../../Zustand/Store";

function EditPopUpTeams({ selectedRowData, handleCancelEdit, handleSave }) {
  const [formData, setFormData] = useState({
    name: selectedRowData.name,
    image: selectedRowData.image,
  });

  // console.log(formData.playerIds);
  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          image: file,
        });
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : e.target.value,
      }));
    }
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    handleSave(formData);
  };

  return (
    <>
      <Box
        className={StyleEditPopUp.addPopUp}
        sx={{
          "& .MuiOutlinedInput-notchedOutline ": {
            border: "1.5px solid  gray !important",
            borderRadius: "20px",
          },
          "& .Mui-focused > .MuiOutlinedInput-notchedOutline ": {
            border: "2px solid var(--primary-clr) !important",
            borderRadius: "20px",
          },
          "& .Mui-focused.MuiFormLabel-root ": {
            color: "var(--primary-clr) !important",
          },
        }}
      >
        <h1
          style={{
            //   width: "100%",
            marginBottom: "1.5rem",
            color: "var(--primary-clr)",
          }}
        >
          Edit Team
        </h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            rowGap: "1rem",
          }}
        >
          <Stack rowGap="2rem">
            <FormControl fullWidth>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl fullWidth>
              <input
                className={StyleEditPopUp.input}
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
              />
            </FormControl>

            <button className={StyleEditPopUp.save} onClick={handleSaveClick}>
              Save
            </button>
            <button
              className={StyleEditPopUp.cancel}
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </Stack>
        </form>
      </Box>
    </>
  );
}

export default EditPopUpTeams;
