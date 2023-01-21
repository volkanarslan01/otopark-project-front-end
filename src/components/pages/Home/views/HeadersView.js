import React from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
function HeadersView() {
  return (
    <>
      <Player
        autoplay
        loop
        src="https://assets9.lottiefiles.com/packages/lf20_dyXaL5.json"
        style={{ height: "300px", width: "500px" }}
      >
        <Controls />
      </Player>
    </>
  );
}

export default HeadersView;
