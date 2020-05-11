import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { searchForMusic } from "../redux/actions/searchActions";
import SearchTrackList from "./search-track-list";
import styles from "../styles/library.module.css";

const SearchResults = () => {
  const isPlaying = useSelector(state => state.player.isPlaying);
  const currentTrackId = useSelector(state => state.player.currentTrack.id);
  const user = useSelector(state => state.user);
  const results = useSelector(state => state.search);
  const { query } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    dispatch(searchForMusic(query)).catch(e => {
      alert.error("Search Error");
    });
    // eslint-disable-next-line
  }, [query, dispatch]);

  const resultsComponents = [];

  const sources = Object.keys(results);
  sources.forEach(source => {
    if (user[source] && user[source].isConnected) {
      const tracks = results[source].tracks;

      resultsComponents.push(
        <SearchTrackList
          source={source}
          tracks={tracks}
          currentTrackId={currentTrackId}
          isPlaying={isPlaying}
          key={`Search:${source}:${query}`}
        />
      );
    }
  });

  return <div className={styles.pageWrapper}>{resultsComponents}</div>;
};

export default SearchResults;