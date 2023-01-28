import React from 'react';
import { Image } from "react-bootstrap";

const ProfileImages = ({ img = [], imageVerified = true, unVerifiedImages = [] }) => {
  let ImageArr = unVerifiedImages.length !== 0 && !imageVerified ? unVerifiedImages : img;
  return (
    <div className="userProfileImage">
      {ImageArr.length ?
        ImageArr.map((image) => {
          return <Image src={image} />
        })
        : <Image src={"https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"} />
      }
    </div>
  )
}
export default ProfileImages;