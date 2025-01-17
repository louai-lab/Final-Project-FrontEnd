import React, { useState } from "react";
import {
  FormControl,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import Box from "@mui/material/Box";
import StyleAddPopUp from "./AddPopUpPlayer.module.css";
import { useTeamsStore } from "../../../Zustand/Store";

function AddPopUp({ handleCancelAdd, handleFormSubmitPlayer }) {
  // const [isAddPopUp, setIsAddPopUp] = useState(false);
  const { teams } = useTeamsStore();
  const [formData, setFormData] = useState({
    name: "",
    tShirtNumber: "",
    team: "",
    idCard: "",
    dateOfBirth: "",
    image: "",
    motherName: "",
  });

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    // Check if the input type is file for handling images
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleFormSubmitPlayer(formData);
  };
  return (
    <>
      <div>
        <Box
          className={StyleAddPopUp.addPopUp}
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
              color:"var(--primary-clr)"
            }}
          >
            Add Player
          </h1>
          <form
            onSubmit={handleSubmit}
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
                <TextField
                  label="T-Shirt Number"
                  name="tShirtNumber"
                  value={formData.tShirtNumber}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Id Card"
                  name="idCard"
                  value={formData.idCard}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel htmlFor="team">Choose the team</InputLabel>
                <Select
                  label="Team"
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  required
                >
                  {teams.map((team) => (
                    <MenuItem
                      key={team._id}
                      value={team._id}
                      style={{ display: "flex", gap: "20px" }}
                    >
                      <img
                        src={`${process.env.REACT_APP_IMAGE_PATH}/${team.image}`}
                        alt={team.name}
                        style={{
                          width: "20px",
                          height: "20px",
                          marginLeft: "5px",
                        }}
                      />
                      {team.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Date Of Birth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="DD/MM/YYYY"
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  label="Mother Name"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <FormControl fullWidth>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleChange}
                />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "var(--primary-clr)",
                  // transition: "background-color 0.3s ease, color 0.3s ease",
                  opacity: "1",
                  transition: "opacity 0.3s ease",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  "&:hover": {
                    bgcolor: "var(--primary-clr)",
                    opacity: "0.7",
                    cursor: "pointer",
                  },
                }}
              >
                Submit
              </Button>
              <button
                className={StyleAddPopUp.cancel}
                type="button"
                onClick={handleCancelAdd}
              >
                Cancel
              </button>
            </Stack>
          </form>
        </Box>
      </div>
    </>
  );
}

export default AddPopUp;
