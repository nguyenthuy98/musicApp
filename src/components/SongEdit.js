import React, { useState, useEffect } from "react";
import axios from "axios";

import "./../assets/style.css";

const SongEdit = (props) => {
  const [song, setSong] = useState({
    avatar: "",
    creator: "",
    music: "",
    title: "",
  });
  const { avatar, creator, music, title } = song;

  useEffect(() => {
    setSong(props.currentSong);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // edit song function
  const onInputChange = (e) => {
    if(e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSong({ ...song, [e.target.name]: reader.result });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
        setSong({ ...song, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/songs/${props.currentSong.id}`,
      song
    );
    props.handleClose(null);
  };
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <div>
          <b>Edit song</b>
          <hr />
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <img 
                id="target" 
                src={avatar} 
                alt="cover-avatar" 
                className="cover-avatar"
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                accept="image/*"
                name="avatar"
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control"
                placeholder="Enter Your Singer"
                name="creator"
                value={creator}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control"
                placeholder="Enter Your Music Link MP3"
                name="music"
                value={music}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control"
                placeholder="Enter Your Name"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button className="btn btn-warning btn-block">Update Song</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SongEdit;
