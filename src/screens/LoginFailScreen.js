import React, { useEffect } from "react";

const LoginFailScreen = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Send a message to the main window to trigger a reload
      window.opener.postMessage("reload", window.location.origin);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const timer = setTimeout(() => {
      window.close();
    }, 3000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h2>Login Failed!</h2>
      <p>Sorry, there was an error during the login process.</p>
      <p>Please try again later.</p>
      {/* You can add additional content or messages here */}
    </div>
  );
};

export default LoginFailScreen;
