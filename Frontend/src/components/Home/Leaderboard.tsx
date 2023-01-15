import axios from "axios";
import React, { useEffect, useState } from "react";
import avatar1 from "../../Assets/Ellipse 213.png";
import avatar2 from "../../Assets/Ellipse 214.png";
import avatar3 from "../../Assets/Ellipse 215.png";
import avatar4 from "../../Assets/Ellipse 216.png";
import fireIcon from "../../Assets/fire.png";

const fakeData = [
  {
    img: avatar1,
    title: "Souhail Elfchtali",
    subTitle: "@Zodiac",
    pts: "1987 pts",
  },
  {
    img: avatar2,
    title: "Haitam Grissen",
    subTitle: "@Fibo",
    pts: "1120 pts",
  },
  {
    img: avatar3,
    title: "Ayoub ajghogh",
    subTitle: "@l7mar",
    pts: "2 pts",
  },
  {
    img: avatar4,
    title: "nizar aihajar",
    subTitle: "@l3azi",
    pts: "1 pts",
  },
];

const Leaderboard = () => {
  const [Leaderboard, setLeaderboard] = useState(Array<any>)
  useEffect(() => {
    axios.get('http://localhost:5000/user/leaderboard', {withCredentials: true})
    .then((response) =>{
      setLeaderboard(response.data)
    })
  },[])
  return (
    <div className="w-[433px] h-[371px] bg-[#262626] px-[32px] py-[19px] rounded-[20px]">
      <h1 className="text-[24px] mb-[12px] font-[600] text-white tracking-wider">
        Leaderboard
      </h1>
      <div className="flex flex-col gap-[1rem]">
        {Leaderboard.map((item, index) => (
          <div className="flex items-center justify-between">
            {/* ----- left side ---- */}
            <div className="flex items-center gap-[21px]">
              <div>
                <img className="w-[60px] h-[60px] object-contain" src={item.avatar} alt={item.username} />
              </div>
              <div>
                <h1 className="text-[15px] text-[#F2F2F2] font-[500] tracking-wider">{item.username}</h1>
                <h6 className="text-[14px] text-[#828282] tracking-wider">{item.username}</h6>
              </div>
            </div>
            {/* ---- right side ---- */}
            <div>
              <div className="flex items-center gap-[14px]">
                <img src={fireIcon} alt="fire icon" />
                <h6 className="text-[13px] tracking-wider text-[#F2F2F2]">{item.score}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
