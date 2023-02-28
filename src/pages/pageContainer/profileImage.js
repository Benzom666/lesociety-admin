import React from 'react';
import { Image } from "react-bootstrap";
import ProfileImage from "../../assets/images/profleIamge.svg";

const ProfileImages = ({ img = [], imageVerified = true, unVerifiedImages = [] }) => {
  let ImageArr = unVerifiedImages.length !== 0 && !imageVerified ? unVerifiedImages : img;
  return (
    <div className="userProfileImage">
      {ImageArr.length ?
        ImageArr.map((image) => {
          return <Image src={image} />
        })
        : <Image src={ProfileImage} />
      }
    </div>
  )
}
export default ProfileImages;