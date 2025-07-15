import { Global, css } from "@emotion/react";
import Pretendard from "../assets/fonts/PretendardVariable.woff2";
import { theme } from "../styles/theme";

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

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: "Pretendard", sans-serif;
          background-color: white;
        }

        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: ${theme.colors.blue[300]};
          border-radius: 12px;
        }

        ::-webkit-scrollbar-track {
          background-color: transparent;
        }

        * {
          scrollbar-width: 8px;
          scrollbar-color: ${theme.colors.blue[300]} transparent;
        }
      `}
    />
  );
};
