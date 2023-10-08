import HeaderComponent from "../components/HeaderComponent";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import "../components/ScrollbarStyles.css";
import TabButton from "../components/TabButton";
import { useState } from "react";
import { useQueries, useQuery } from "react-query";
import shadows from "@mui/material/styles/shadows";
import FetchProfile from "../lib/api/fetchProfile";
import FetchUserInfo from "../lib/api/fetchUserInfo";
import { useStateContext } from "../contexts/Context";




export default function Profile() {
  const { sessionId } = useStateContext();

  const fields = 
  {
    showArrow1: "01. My Profile",
    showArrow2: "02. Set Password",
    showArrow3: "03. Device IDs",
    showArrow4: "04. Personal IDs",
    showArrow5:  "05. References",
    showArrow6: "06. ID Verification",
    showArrow7: "07. My Organisation",
    showArrow8: "08. Geographic Profile",
    showArrow9: "09. Demographic Profile",
    showArrow10: "10. Psychographic Profile",
    showArrow11: "11. Behavioural Profile",
    showArrow12: "12. Usage Profile",
    showArrow13: "13. Section Permissions",
  }

  const [arrows, setaArrows] = useState({
    showArrow1: true,
    showArrow2: false,
    showArrow3: false,
    showArrow4: false,
    showArrow5: false,
    showArrow6: false,
    showArrow7: false,
    showArrow8: false,
    showArrow9: false,
    showArrow10: false,
    showArrow11: false,
    showArrow12: false,
    showArrow13: false,
  });

  const handleArrows = (show, bool) => {
    console.log(show);
    setaArrows({ [show]: bool });
  };

  const { data } = useQuery({
    queryKey: "userInfo",
    queryFn: async () => await FetchUserInfo(sessionId),
  });

 

  const { profile } = useQuery({
    queryKey: "userProfile",
    queryFn: async () => await FetchProfile(data?.data?.userinfo?.username),
  });
  

  {console.log(profile)}

  return (
    <div style={{ marginLeft: 15 }}>
      <HeaderComponent title="Profile" />
      <div style={containerStyles}>
        <div>
        {Object.entries(fields).map(([key, value]) => (
          <div style={{"width": "310px",
          marginTop: "20px",
          marginRight:"10px",
          marginLeft: "10px",
          marginBottom: "26px",
          }} key={key}>
            <div className="rectangle" style={rectangleStyle} onClick={()=>handleArrows(key,!arrows[key])}>
              <div style={textWrapperStyle}>{value}</div>
              {arrows[key]?<IoIosArrowDown 
                size={15}
                color="#005734"
                style={{ marginLeft: "10px", marginRight: "20px" }}/>:
              <IoIosArrowForward
                size={15}
                color="#005734"
                style={{ marginLeft: "10px", marginRight: "20px" }}
              />}
            </div>

           {arrows[key]?
            <div style={contentStyle}>
              {/* <p>{value}</p> */}
              {console.log(profile)}
            </div>
            :null}

            
            
          </div>
          
        ))}
        
            </div>
      </div>
      <TabButton description={"Edit my profile"} />
    </div>
  );
}
const containerStyles = {
  marginTop: "44px",
  height: "70vh",
  overflowY: "scroll",
};
const boxStyle = {
  width: "310px",
  marginTop: "20px",
  marginRight: "10px",
  marginLeft: "10px",
  marginBottom: "26px",
};

const rectangleStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow:
    "0px 0px 0px #0000001a, 0px 1px 3px #0000001a, 2px 5px 5px #00000017, 4px 11px 7px #0000000d, 8px 19px 8px #00000003, 12px 29px 9px transparent",
  height: "37px",
  width: "310px",
  display: "flex",
  flexDirection: "row",
  cursor:"pointer",
  alignItems: "center",
};

const textWrapperStyle = {
  color: "#005734",
  fontSize: "12px",
  fontWeight: 500,
  height: "15px",
  letterSpacing: "0",
  lineHeight: "normal",
  marginRight: "auto",
  marginLeft: "20px",
};

const contentStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "100px",
  boxShadow: "3px 3px 7px 0px #9C9C9C7A inset",
  height: "37px",
  width: "290px",
  fontSize: 10,
  display: "flex",
  marginTop: 10,
  marginLeft:5,
  paddingLeft:10,
  flexDirection: "row",
  alignItems: "center",
}
