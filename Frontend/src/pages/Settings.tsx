import avatar1 from "../Assets/Ellipse 213.png";
import DisplayName from "../components/Settings/DisplayName";
import TwoFactor from "../components/Settings/TwoFactor";
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Modal from "react-modal";
import Checkbox from "./Checkbox";
import { Usercontext } from "../context/Usercontext";


type DataType = {
  isTwoFactor: false;
};

const Settings = ({ state }: { state: boolean }) => {
  const [isChecked, setIsChecked] = useState<boolean>(state);
  const [twoFactorModal, setModal] = useState<boolean>(false);

    const [User, GetUser] = useState("")
    const [avatar, NewAvatar] = useState('');
    const handleModal = async () => {
      console.log("sanfrasisco : " + isChecked);
      if (!isChecked) {
        console.log("wash true or fals : " + twoFactorModal);
        setModal(true);
        return;}
      }
    axios.get('http://localhost:5000/user/user', {withCredentials: true})
    .then(res => {
      GetUser(res.data.username);
      NewAvatar(res.data.avatar);
    }).catch(err=> {
      console.log(err)
    })
  return (
    <div className="w-[1021px] min-h-screen">
      <h1 className="text-[77px] text-[#F2F2F2] text-center font-[700] tracking-wider">
        Settings
      </h1>
      <div className="mt-[46px]">
        {/* -------- profile info --------- */}
        <div>
          {/* ------ left side ----- */}
          <div className="flex items-center gap-[40px]">
            <div>
                <img
                className="w-[140px] h-[140px] object-contain"
                src={avatar}
                alt="avatar"
              />
            </div>
            <div>
              <h1 className="text-[24px] font-[500] tracking-wider text-[#F2F2F2]">
                {User}
              </h1>
              <h6 className="text-[#828282] text-[20px] tracking-wider">
                @Poma3
              </h6>
            </div>
          </div>
        </div>
        {/* ------ top part ------- */}
        <div className="mt-[108px]">
          <DisplayName setUser={GetUser} setAvatar={NewAvatar}/>
        </div>
        {/* ------ bottom part ------ */}
        <div className="mt-[144px] flex items-center gap-[44px]">
        <Checkbox onClick={handleModal} name="isTwoFactor" id="two-factor" checked={isChecked}>
          Two Factor Authentication
        </Checkbox>
        <TwoFactor
          isOpen={twoFactorModal}
          setIsOpen={setModal}
          contentLabel="SCAN QR CODE"
          setTwoFactor={setIsChecked}
          />
        </div>
      </div>
    </div>
);
  
};

export default Settings;
