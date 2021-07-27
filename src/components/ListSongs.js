import React, { useState, useEffect } from "react";
import axios from "axios";
import SongDetail from "./SongDetail";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import "./../assets/style.css";

const ListSongs = () => {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    loadSongs();
  }, []);

  const togglePopup = (id) => {
    setOpenPopup(!openPopup);
    let currentSong = {};
    // eslint-disable-next-line array-callback-return
    songs.filter((el) => {
      if (el.id === id) {
        currentSong = el;
      }
    });
    setSong(currentSong);
  };

  const loadSongs = async () => {
    const result = await axios.get("http://localhost:3000/songs");
    setSongs(result.data);
  };

  const deleteSong = async (id) => {
    await axios.delete(`http://localhost:3000/songs/${id}`);
    loadSongs();
  };

  let isEdit = false;
  const editSong = (id) => {
    isEdit = true;
  };
  return (
    <div className="container">
      <div className="py-4">
        <h3>‎Top 100: South Korea on Apple Music</h3>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <td>#</td>
              <td>Cover Image</td>
              <td>Song</td>
              <td>Artist</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td>{song.id}</td>
                <td>
                  <img
                    src={song.avatar}
                    alt="avatar"
                    width="50%"
                    onClick={() => togglePopup(song.id)}
                  />
                </td>
                <td onClick={() => togglePopup(song.id)}>{song.title}</td>
                <td>{song.creator}</td>
                <td>
                  <AiTwotoneEdit
                    className="action-button"
                    onClick={() => editSong(song.id)}
                  />
                  <RiDeleteBin6Fill
                    className="action-button"
                    onClick={() => deleteSong(song.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {openPopup && (
          <SongDetail
            isEdit={isEdit}
            currentSong={song}
            handleClose={togglePopup}
          />
        )}
      </div>
    </div>
  );
};
export default ListSongs;
