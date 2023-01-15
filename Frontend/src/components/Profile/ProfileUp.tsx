import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StringLiteral } from "typescript";
import avatar1 from "../../Assets/Ellipse 213.png";
import fireIcon from "../../Assets/fire.png";
import {Usercontext} from "../../context/Usercontext"

const ProfileUp = () => {
  const [User, SetUser] = useState<any>({});
  useEffect(() => {
    axios.get('http://localhost:5000/user/user', {withCredentials: true})
    .then((response) =>{
      try{
        SetUser(response.data);
      } catch(error)
      {
        console.log(error);
      }
      })
  },[])

return (
  <div className="flex items-center justify-center gap-[120px]">

    
    <div>
    <div className="flex items-center gap-[40px]">
      <div>
        <img
          className="w-[140px] h-[140px] object-contain"
          src={User.avatar}
          alt="avatar"
        />
      </div>
      <div>
        <h1 className="text-[24px] font-[500] tracking-wider text-[#F2F2F2]">
          {User.username}
        </h1>
        <h6 className="text-[#828282] text-[20px] tracking-wider">@Zodiac</h6>
      </div>
    </div>
    <div className="h-fit px-[27px] py-[21px] flex items-center gap-[40px] bg-[#262626] rounded-[20px]">
      <h1 className="text-[24px] text-white">
        Current <span className="text-[#ECCC6B]">Score</span> :
      </h1>
      <div className="flex items-center gap-[1rem]">
        <img src='../../Assets/fire.png' alt="fire" />
        <h1 className="text-[22px] text-white">
          5734 <span className="text-[#ECCC6B]">PTS</span>
        </h1>
      </div>
    </div>
    </div>
</div>
);
};

export default ProfileUp;
