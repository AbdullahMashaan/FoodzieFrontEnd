import React, { useEffect, useState } from "react";
import user from "../assets/images/user.png";
import { updateProfileImage, getProfile } from "../api/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Profile = () => {
  const [userInfo, setUserInfo] = useState(0);
  const [fileName, setFileName] = useState("No file chosen");
  const [file, setFile] = useState();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(event.target.files[0]);
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("No file chosen");
    }
  };

  const fetchUserData = async () => {
    try {
      const profile = await getProfile();
      setUserInfo(profile);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const submitImg = () => {
    console.log(file);
    updateProfileImage({ image: file });
  };

  return (
    <>
      <Header />
      <main>
        <div className="profile my-5">
          <div className="container d-flex justify-content-center align-items-center">
            <div className="profileCard p-5 d-flex flex-column justify-content-center align-items-center">
              <div className="profileImg">
                <img src={user} alt="username" />
              </div>
              <h2>{userInfo?.username}</h2>
              <div className="balance">Balance: {userInfo?.balance}</div>
              <span className="mt-3 uploadTitle">upload a profile picture</span>
              <div className="uploadImg d-flex justify-content-center align-items-center">
                <label className="file-label">
                  CHOOSE FILE
                  <input
                    type="file"
                    className="file-input"
                    onChange={handleFileChange}
                  />
                </label>
                <span className="file-chosen">{fileName}</span>
              </div>
              <button
                type="submit"
                onClick={submitImg}
                className="btn butt mt-4"
              >
                save
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
