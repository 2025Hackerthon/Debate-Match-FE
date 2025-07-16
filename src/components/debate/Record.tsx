import styled from "@emotion/styled";
import { Text } from "../common/Text";
import { useTheme } from "@emotion/react";
import type { DEBATETheme } from "../../styles/theme";

interface IProps {
  title: string;
  tags: string[];
  agree: number;
  disagree: number;
}

export const Record = ({ title, tags, agree, disagree }: IProps) => {
  const theme = useTheme() as DEBATETheme;

  return (
    <DebateItemWrapper>
      <div>
        <Question>{title}</Question>
        <TagList>
          {tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagList>
      </div>

      <VoteWrapper>
        <Text color={`${theme.colors.blue[500]}`} variant="LabelSmall">
          찬성 : {agree}
        </Text>
        <Text color={`${theme.colors.sub.error[20]}`} variant="LabelSmall">
          반대 : {disagree}
        </Text>
      </VoteWrapper>
    </DebateItemWrapper>
  );
};

const DebateItemWrapper = styled.div`
  padding: 16px 0;
  border-top: ${({ theme }) => `1px solid ${theme.colors.gray[300]}`};
  display: flex;
  justify-content: space-between;
`;

const Question = styled.h3`
  margin: 0 0 8px 0;
  font-size: 16px;
`;

const TagList = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.blue[400]};
  color: ${({ theme }) => theme.colors.sub.normal[10]};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

const VoteWrapper = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
`;
