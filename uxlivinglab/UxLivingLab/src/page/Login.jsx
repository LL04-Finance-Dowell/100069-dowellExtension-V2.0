import HeaderComponent from "../components/HeaderComponent";
import TabButton from "../components/TabButton";

export default function Login() {
  return (
    <div style={{marginLeft : 15}}>
      <HeaderComponent title="Login" />
      <div style={iframeContainerStyles}>
      <iframe
                  width="320"
                  height="315"
                  src="https://www.youtube.com/embed/videoseries?list=PLa-BPmUzAKKfVgomvrIsWd9ZGQFTiT0Xb"
                  title="YouTube video player"
                  style={iframeStyle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />

      </div>
      <div>
        <TabButton  description={"Buy Credits"}/>
      </div>
    </div>
  );
}
const iframeStyle = {
  border:0,
  width:"100%",
  height:"100%",
  borderRadius : "26px",
  boxShadow:
    "0px 0px 0px #0000001a, 0px 1px 3px #0000001a, 2px 5px 5px #00000017, 4px 11px 7px #0000000d, 8px 19px 8px #00000003, 12px 29px 9px transparent",

}

const iframeContainerStyles = {
  marginTop :"100px",
  marginLeft:"10px",
  marginRight:"24px",
  // border:"3px",
  // borderRadius : "26px",
  height:"270px",
}