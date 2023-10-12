/* eslint-disable react/prop-types */
import { BsArrowLeft } from "react-icons/bs";

export default function HeaderComponent({
  title,
  navigation = () => {},
  type = "",
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
      }}
    >
      {type && (
        <BsArrowLeft
          size={30}
          color="#005734"
          onClick={navigation}
          style={{ cursor: "pointer" }}
        />
      )}
      <div
        style={{
          color: "#005734",
          fontSize: 20,
          fontWeight: 600,
          height: 23,
          letterSpacing: 0,
          lineHeight: "normal",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginRight: type ? 45 : null,
        }}
      >
        {title}
      </div>
    </div>
  );
}
