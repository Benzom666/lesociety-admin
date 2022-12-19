import React from 'react';
import { Image } from "react-bootstrap";

const ProfileImages = ({img = [], imageVerified = true, unVerifiedImages = []}) => {
  return (
      <div className="userProfileImage">
        {imageVerified && unVerifiedImages.length && unVerifiedImages[0]
        ? <Image src={unVerifiedImages[0]}/>:
        <Image src={!!img && img[0]} />
        ?
        <Image src={!!img && img[0] ? img[0] 
          : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/> : ''}
        
        {imageVerified  && unVerifiedImages != undefined && unVerifiedImages[1]
        ? <Image src={!!unVerifiedImages && unVerifiedImages[1]}/>:
        <Image src={!!img && img[1]} />
        ?
        <Image src={!!img && img[1] ? img[1] 
          : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/> : ''}
          
        {imageVerified && unVerifiedImages != undefined && unVerifiedImages[2]
        ? <Image src={!!unVerifiedImages && unVerifiedImages[2]}/>:
        <Image src={!!img && img[2]} />
        ?
        <Image src={!!img && img[2] ? img[2] 
          : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/> : ''}

        {imageVerified && unVerifiedImages != undefined && unVerifiedImages[3]
        ? <Image src={!!unVerifiedImages && unVerifiedImages[3]}/>:
        <Image src={!!img && img[3]} />
        ?
        <Image src={!!img && img[3] ? img[3] 
          : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/> : ''}

      </div>
  )
}
export default ProfileImages;