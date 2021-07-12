import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";

const ListSongs = () => {
  const [songs, setSong] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    loadSongs();
  }, []);

  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };

  const loadSongs = async () => {
    const result = await axios.get("http://localhost:3000/songs");
    setSong(result.data);
  };

  const deleteSong = async (id) => {
    await axios.delete(`http://localhost:3000/songs/${id}`);
    loadSongs();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h3>‎Top 100: South Korea on Apple Music</h3>
        <table class="table table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Cover Image</th>
              <th>Song</th>
              <th>Artist</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id} onClick={() => togglePopup({content : song.id})}>
                <td>{song.id}</td>
                <td>
                  <img src={song.avatar} alt="avatar" width="50%" />
                </td>
                <td>{song.title}</td>
                <td>{song.creator}</td>
                <td>
                  <button type="button" class="btn btn-primary">
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deleteSong(song.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {openPopup && (
              <Popup
                content={
                  <div>
                    <b>Design your Popup</b>
                  </div>
                }
                handleClose={togglePopup}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListSongs;
