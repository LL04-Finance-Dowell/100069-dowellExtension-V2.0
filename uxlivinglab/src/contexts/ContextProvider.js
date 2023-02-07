/* global chrome */
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [show, setShow] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const [data, setData] = useState();

  const handleShow = (show) => {
    setShow(show);
  };

  useEffect(() => {
    function logCookies(cookies) {
      for (const cookie of cookies) {
        if (cookie.domain === "100014.pythonanywhere.com") {
          setSessionId(cookie.value);
        }
      }
    }
    chrome.cookies
      .getAll({
        name: "sessionid",
      })
      .then((cookies) => logCookies(cookies));
  }, []);

  useEffect(() => {
    if (sessionId.length > 0) {
      async function getUserInfo() {
        const response = await axios.post(
          "https://100014.pythonanywhere.com/api/userinfo/",
          {
            session_id: sessionId,
          }
        );
        setData(response.data.other_org);
      }
      getUserInfo();
    }
  }, [sessionId]);

  return (
    <StateContext.Provider value={{ show, handleShow, sessionId, data }}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);