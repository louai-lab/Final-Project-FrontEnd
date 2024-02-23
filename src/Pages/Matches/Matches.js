import React from "react";
import StyleMatches from "./Matches.module.css";
import { useMatchesStore } from "../../Zustand/Store";
import { useUserStore } from "../../Zustand/Store";
import logo from "../../Assets/icons/Lebanese_Football_Association_(LFA)_logo.svg";
import StadiumIcon from "@mui/icons-material/Stadium";
import { Reveal } from "../../Frammotion/RevealAnimation";
import FootballLoader from "../FootballLoader/FootballLoader";
import { useNavigate } from "react-router-dom";

function Matches() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { lastMatch } = useMatchesStore();
  const { lastMatchByWatcher } = useMatchesStore();
  const { lastMatchByReferee } = useMatchesStore();
  const { loading, matches } = useMatchesStore();
  const { matchesByWatcher } = useMatchesStore();
  const { matchesByReferee } = useMatchesStore();

  let selectedMatch;
  let selectedMatches;

  if (user.role === "admin") {
    selectedMatch = lastMatch;
    selectedMatches = matches;
  } else if (user.role === "watcher") {
    selectedMatch = lastMatchByWatcher;
    selectedMatches = matchesByWatcher;
  } else if (user.role === "referee") {
    selectedMatch = lastMatchByReferee;
    selectedMatches = matchesByReferee;
  } else {
    selectedMatch = null;
  }

  const handleMatchClick = (match) => {
    // console.log("Match object before navigation:", match);

    if (match && match._id) {
      navigate(`/match`, { state: { match } });
    } else {
      console.error("Match object is undefined or missing properties.");
    }
  };

  return (
    <>
      {loading && (
        <div className="loading">
          <FootballLoader />
        </div>
      )}
      <main className={StyleMatches.matchesContainer}>
        <article className={StyleMatches.matchesHeroSection}>
          <section className={StyleMatches.lastMatch}>
            <img
              src={logo}
              width={80}
              height={60}
              alt="Lebanese Football Association"
            />
            <p>{selectedMatch.title}</p>
          </section>
          <section className={StyleMatches.twoTeams}>
            <img
              src={`${process.env.REACT_APP_IMAGE_PATH}/${selectedMatch.team_a?.team.image}`}
              alt={selectedMatch.team_a?.team.name}
              className={StyleMatches.teamsImage}
            />
            <div className={StyleMatches.teamsName}>
              <p>{selectedMatch.team_a?.team.name}</p>
              <p>{selectedMatch.team_b?.team.name}</p>
            </div>
            <img
              src={`${process.env.REACT_APP_IMAGE_PATH}/${selectedMatch.team_b?.team.image}`}
              alt={selectedMatch.team_b?.team.name}
              className={StyleMatches.teamsImage}
            />
          </section>
          <section className={StyleMatches.stadium}>
            <StadiumIcon />
            <p>{selectedMatch.pitch}</p>
          </section>
        </article>

        {!loading && <p className={StyleMatches.vs}>VS</p>}

        <article className={StyleMatches.middle}>
          <h1>Fixtures & results</h1>
        </article>

        <article className={StyleMatches.cardsContainer}>
          {loading && <p>Loading...</p>}
          {selectedMatches.map((match) => {
            return (
              <Reveal key={match._id}>
                <button
                  className={`${StyleMatches.navigate} ${StyleMatches.buttonReset}`}
                  onClick={() => handleMatchClick(match)}
                >
                  <article key={match._id} className={StyleMatches.cardMatch}>
                    <article className={StyleMatches.aboveHr}>
                      <section className={StyleMatches.cardImages}>
                        <img
                          src={`${process.env.REACT_APP_IMAGE_PATH}/${match.team_a?.team.image}`}
                          alt={match.team_a?.team.name}
                          className={StyleMatches.cardImage}
                        />
                        <span>vs</span>
                        <img
                          src={`${process.env.REACT_APP_IMAGE_PATH}/${match.team_b?.team.image}`}
                          alt={match.team_b?.team.name}
                          className={StyleMatches.cardImage}
                        />
                      </section>

                      <section className={StyleMatches.cardTitle}>
                        {match.title}
                      </section>

                      <section>
                        <section className={StyleMatches.oneTeamScore}>
                          <p
                            style={{
                              fontWeight:
                                match.team_a?.score > match.team_b?.score
                                  ? "bold"
                                  : "normal",

                              color:
                                match.team_a?.score > match.team_b?.score
                                  ? "white"
                                  : "grey",
                            }}
                          >
                            {match.team_a?.team.name}
                          </p>
                          <p
                            style={{
                              fontWeight:
                                match.team_a?.score > match.team_b?.score
                                  ? "bold"
                                  : "normal",
                              color:
                                match.team_a?.score > match.team_b?.score
                                  ? "white"
                                  : "grey",
                            }}
                          >
                            {match.team_a?.score}
                          </p>
                        </section>
                        <section className={StyleMatches.oneTeamScore}>
                          <p
                            style={{
                              fontWeight:
                                match.team_b?.score > match.team_a?.score
                                  ? "bold"
                                  : "normal",
                              color:
                                match.team_b?.score > match.team_a?.score
                                  ? "white"
                                  : "grey",
                            }}
                          >
                            {match.team_b?.team.name}
                          </p>
                          <p
                            style={{
                              fontWeight:
                                match.team_b?.score > match.team_a?.score
                                  ? "bold"
                                  : "normal",

                              color:
                                match.team_b?.score > match.team_a?.score
                                  ? "white"
                                  : "grey",
                            }}
                          >
                            {match.team_b?.score}
                          </p>
                        </section>
                      </section>
                    </article>
                    <hr className={StyleMatches.horizontalLine} />
                    <section className={StyleMatches.employees}>
                      <img
                        src={`${process.env.REACT_APP_IMAGE_PATH}/${match.watcher?.image}`}
                        alt={match.team_b?.team.name}
                        className={StyleMatches.imageEmployees}
                      />
                      <img
                        src={`${process.env.REACT_APP_IMAGE_PATH}/${match.referee?.image}`}
                        alt={match.team_b?.team.name}
                        className={StyleMatches.imageEmployees}
                        style={{ marginLeft: "-5px" }}
                      />
                    </section>
                  </article>
                </button>
              </Reveal>
            );
          })}
        </article>
      </main>
    </>
  );
}

export default Matches;
