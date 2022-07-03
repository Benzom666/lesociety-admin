import React from 'react';
import {Stack,Dropdown, Image } from "react-bootstrap";
import Profile from '../../assets/images/profleIamge.svg'

const ProfileImages = props => {
  const {img} = props
  return (
      <div className="userProfileImage">
        <Image src={!!img && img[0] ? img[0] : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/>
        <Image src={!!img && img[1] ? img[1] : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/>
        <Image src={!!img && img[2] ? img[2] : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/>
        <Image src={!!img && img[3] ? img[3] : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/>
      </div>
  )
}
export default ProfileImages;