import { Global } from "@emotion/react";

export const GlobalStyle = () => {
  return (
    <>
      <Global
        styles={{
          body: {
            margin: 0,
            padding: 0
          },
          fontFamily: "Pretendard"
        }}
      />
    </>
  );
};
