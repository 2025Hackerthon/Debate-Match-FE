import styled from "@emotion/styled";
import { Text } from "../common/Text";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../../styles/theme";

interface IProps {
  short: string;
  feedback?: string;
}

export const AiFeedback = ({ short, feedback }: IProps) => {
  const theme = useTheme() as DEBATETheme;

  return (
    <>
      <Container>
        <ShortWrapper>
          <Text variant="LabelMedium" color={`${theme.colors.sub.normal[10]}`}>
            요약
          </Text>
          <Text variant="BodyTiny" color={`${theme.colors.sub.normal[10]}`}>
            {short}
          </Text>
        </ShortWrapper>

        {feedback && (
          <Feedback>
            <Text variant="BodyTiny" color={`${theme.colors.sub.normal[10]}`}>
              {feedback}
            </Text>
          </Feedback>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue[800]};
  border-radius: 8px;
  gap: 20px;
`;

const ShortWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Feedback = styled.div`
  width: 100%;
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue[700]};
  border-radius: 8px;
`;
