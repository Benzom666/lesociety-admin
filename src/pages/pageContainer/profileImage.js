import React from 'react';
import { Image } from "react-bootstrap";

const ProfileImages = props => {
  const {img, image_verified, un_verified_images} = props
  console.log("image_verified === true && un_verified_images != undefined", image_verified ,  un_verified_images )
  return (
      <div className="userProfileImage">
        {image_verified === true && un_verified_images != undefined && un_verified_images[0]
        ? <Image src={!!un_verified_images && un_verified_images[0]}/>:
        <Image src={!!img && img[0]} />
        ?
        <Image src={!!img && img[0] ? img[0] 
          : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/> : ''}
        
        {image_verified === true && un_verified_images != undefined && un_verified_images[1]
        ? <Image src={!!un_verified_images && un_verified_images[1]}/>:
        <Image src={!!img && img[1]} />
        ?
        <Image src={!!img && img[1] ? img[1] 
          : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/> : ''}
          
        {image_verified === true && un_verified_images != undefined && un_verified_images[2]
        ? <Image src={!!un_verified_images && un_verified_images[2]}/>:
        <Image src={!!img && img[2]} />
        ?
        <Image src={!!img && img[2] ? img[2] 
          : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/> : ''}

        {image_verified === true && un_verified_images != undefined && un_verified_images[3]
        ? <Image src={!!un_verified_images && un_verified_images[3]}/>:
        <Image src={!!img && img[3]} />
        ?
        <Image src={!!img && img[3] ? img[3] 
          : "https://lenstax.com/auth/app-assets/images/profile/user-uploads/user-04.jpg"}/> : ''}

      </div>
  )
}
export default ProfileImages;