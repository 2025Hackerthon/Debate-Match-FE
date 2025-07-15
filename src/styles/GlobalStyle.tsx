import { Global, css } from "@emotion/react";
import Pretendard from "../assets/fonts/PretendardVariable.woff2";

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: "Pretendard";
          src: url(${Pretendard}) format("woff2");
          font-weight: 45 920;
          font-style: normal;
          font-display: swap;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: "Pretendard", sans-serif;
        }
      `}
    />
  );
};
