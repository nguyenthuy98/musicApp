/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import SongDetail from "./SongDetail";
import SongEdit from "./SongEdit";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import "./../assets/style.css";

const ListSongs = () => {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [isEdit, setEdit] = useState([]);

  useEffect(() => {
    loadSongs();
  }, []);

  const togglePopup = (id) => {
    setOpenPopup(!openPopup);
    let currentSong = {};
    // eslint-disable-next-line array-callback-return
    if (id !== null) {
      songs.filter((el) => {
        if (el.id === id) {
          currentSong = el;
        }
        return currentSong;
      });
      setSong(currentSong);
    } else {
      loadSongs();
    }
  };

  const viewDetail = (id) => {
    setEdit(false);
    togglePopup(id);
  }

  const loadSongs = async () => {
    const result = await axios.get("http://localhost:3000/songs");
    setSongs(result.data);
  };

  const deleteSong = async (id) => {
    await axios.delete(`http://localhost:3000/songs/${id}`);
    loadSongs();
  };

  const editSong = (id) => {
    setEdit(true);
    togglePopup(id);
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
                    className="avatar-item"
                    onClick={() => viewDetail(song.id)}
                  />
                </td>
                <td onClick={() => viewDetail(song.id)}>{song.title}</td>
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
        {openPopup && !isEdit && (
          <SongDetail
            currentSong={song}
            handleClose={togglePopup}
          />
        )}
        {
          openPopup && isEdit && (
            <SongEdit
              currentSong={song}
              handleClose={togglePopup}
            />
          )
        }
      </div>
    </div>
  );
};
export default ListSongs;
