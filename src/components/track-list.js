import React from "react";
import PropTypes from "prop-types";
import { forceCheck } from "react-lazyload";

import TrackItem from "./track-item";
import styles from "../styles/library.module.css";

class TrackList extends React.Component {
  componentDidUpdate(prevProps) {
    const { library: currentLibrary } = this.props;
    const { library: prevLibrary } = prevProps;

    if (currentLibrary !== prevLibrary) {
      forceCheck();
    }
  }

  render() {
    const {
      search,
      library,
      handlePlay,
      addToLibrary,
      loadMoreTracks
    } = this.props;

    return (
      <div className={styles.libraryWrapper}>
        {library &&
          library.map(track => (
            <TrackItem
              search={search}
              key={track.id}
              img={track.img}
              title={track.title}
              artist={track.artist.name}
              id={track.id}
              ms={track.duration}
              handlePlay={() => handlePlay(track)}
              addToLibrary={event => addToLibrary(event, track)}
            />
          ))}
        {search && library.length > 0 && (
          <button type="button" onClick={loadMoreTracks}>
            Load More
          </button>
        )}
      </div>
    );
  }
}

TrackList.propTypes = {
  search: PropTypes.bool,
  library: PropTypes.arrayOf(PropTypes.object),
  handlePlay: PropTypes.func,
  addToLibrary: PropTypes.func,
  loadMoreTracks: PropTypes.func
};

TrackList.defaultProps = {
  search: false,
  library: [],
  handlePlay: () => {},
  addToLibrary: () => {},
  loadMoreTracks: () => {}
};

export default TrackList;