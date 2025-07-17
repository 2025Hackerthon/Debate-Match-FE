import styled from "@emotion/styled";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";
import { tagMap, type Tag, type TagEnum } from "../../services/types";

interface IProps {
  id: string;
  title: string;
  tags: TagEnum[];
  side: "PRO" | "CON";
}

export const DebateItem = ({ id, title, tags, side }: IProps) => {
  const sideLabel = {
    PRO: "찬성",
    CON: "반대"
  }[side];
  const navigate = useNavigate();

  return (
    <DebateItemWrapper
      onClick={() =>
        navigate(`/debate/${encodeURIComponent(id)}`, {
          state: { id, title, side }
        })
      }
    >
      <div>
        <Question>{title}</Question>
        <TagList>
          {tags.map(tag => (
            <Tag key={tag}>
              {Object.entries(tagMap).find(([, value]) => value === tag)?.[0]}
            </Tag>
          ))}
        </TagList>
      </div>

      <ButtonWrapper>
        <Button>{sideLabel}</Button>
      </ButtonWrapper>
    </DebateItemWrapper>
  );
};

const DebateItemWrapper = styled.div`
  cursor: pointer;
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

const ButtonWrapper = styled.div`
  width: 80px;
`;
