import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home/Home.js";
import Login from "../Pages/Login/Login.js";
import Matches from "../Pages/Matches/Matches.js";
import SingleMatch from "../Pages/SingleMatch/SingleMatch.js";
import NetworkError from "../Pages/NetworkError/NetworkError.js";
import ProtectedRoute from "./ProtectedRoutes.js";
import { useUserStore } from "../Zustand/Store.js";
import DashOutlet from "./DashOutlet.js";
import DashPlayers from "../Pages/DashPlayers/DashPlayers.js";
import DashTeams from "../Pages/DashTeams/DashTeams.js";
import NotFound from "../Pages/NotFound/NotFound.js";
import DashUsers from "../Pages/DashUsers/DashUsers.js";
import Profile from "../Pages/Profile/Profile.js";
import WebOutlet from "./WebOutlet.js";
import DashMatches from "../Pages/DashMatches/DashMatches.js";
import DashTitles from "../Pages/DashTitles/DashTitles.js";
import DashSeasons from "../Pages/DashSeasons/DashSeasons.js";
import DashPitches from "../Pages/DashPitches/DashPitches.js";
import DashAdministrator from "../Pages/DashAdministrator/DashAdministrator.js";
import DashOverview from "../Pages/DashOverview/DashOverview.js";
import DashAboutUs from "../Pages/DashAboutUs/DashAboutUs.js";

function AppRoutes() {
  const { user } = useUserStore();
  return (
    <Routes>
      {/* <Route path="/network_error" element={<NetworkError />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
      <Route element={<ProtectedRoute isAllowed={user} />}>
        <Route path="/" element={<WebOutlet />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/match" element={<SingleMatch />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route> */}

      <Route path="/network_error" element={<NetworkError />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<WebOutlet />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/match" element={<SingleMatch />} />
        <Route path="/match/:id" element={<SingleMatch />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          user && user.role === "admin" ? (
            <ProtectedRoute isAllowed={true}>
              <DashOutlet />
            </ProtectedRoute>
          ) : (
            <Navigate to="/" />
          )
        }
      >
        <Route path="/dashboard/overview" exact element={<DashOverview />} />
        <Route path="/dashboard/users" exact element={<DashUsers />} />
        <Route path="/dashboard/players" exact element={<DashPlayers />} />
        <Route path="/dashboard/teams" exact element={<DashTeams />} />
        <Route path="/dashboard/matches" exact element={<DashMatches />} />
        <Route path="/dashboard/titles" exact element={<DashTitles />} />
        <Route path="/dashboard/seasons" exact element={<DashSeasons />} />
        <Route path="/dashboard/pitches" exact element={<DashPitches />} />
        <Route path="/dashboard/aboutus" exact element={<DashAboutUs />} />

        <Route
          path="/dashboard/administrators"
          exact
          element={<DashAdministrator />}
        />
      </Route>
      <Route path="/*" exact element={<NotFound />} />
      <Route path="/dashboard/*" exact element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
