import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../../styles/theme";
import styled from "@emotion/styled";
import { Text } from "../common/Text";

interface IProps {
  title: string;
  content: string;
  index: number;
}

export const Opinion = ({ title, content, index }: IProps) => {
  const theme = useTheme() as DEBATETheme;

  return (
    <>
      <Container
        style={{
          backgroundColor: `${index % 2 ? theme.colors.blue[200] : theme.colors.blue[100]}`
        }}
      >
        <Text variant="LabelLarge">{title}</Text>
        <Text variant="LabelSmall">{content}</Text>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 10px;
`;
