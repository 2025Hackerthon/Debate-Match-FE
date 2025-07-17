/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useState } from "react";
import { Dropdown } from "../common/Dropdown";
import { useTheme } from "@emotion/react";
import type { Tag } from "../../services/types";

interface IProps {
  selectedTags: Tag[];
  onChange: (tags: Tag[]) => void;
  type?: "filter" | "select";
}

export const TagSelector = ({
  selectedTags,
  onChange,
  type = "filter"
}: IProps) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState("");

  const tags: Tag[] = [
    "국어",
    "수학",
    "영어",
    "한국사",
    "세계사",
    "사회",
    "과학",
    "미술",
    "체육",
    "기술",
    "음악",
    "윤리",
    "제2외국어",
    "교양",
    "IT"
  ];

  const availableTags = tags.filter(tag => !selectedTags.includes(tag));

  const handleSelect = (tag: Tag) => {
    if (selectedTags.includes(tag)) return;

    if (type === "select" && selectedTags.length >= 5) {
      alert("태그는 최대 5개까지 선택할 수 있습니다.");
      return;
    }

    onChange([...selectedTags, tag]);
    setSelectedOption("");
  };

  const handleRemove = (tag: string) => {
    onChange(selectedTags.filter(t => t !== tag));
  };

  return (
    <Wrapper>
      <DropdownWrapper>
        <Dropdown
          options={availableTags}
          value={selectedOption}
          onChange={tag => {
            setSelectedOption(tag);
            handleSelect(tag as Tag);
          }}
          placeholder="태그 선택"
        />
      </DropdownWrapper>

      <SelectedTagList>
        {selectedTags.map(tag => (
          <Tag key={tag} theme={theme} onClick={() => handleRemove(tag)}>
            {tag} <span>×</span>
          </Tag>
        ))}
      </SelectedTagList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DropdownWrapper = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const SelectedTagList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  background-color: ${({ theme }) => theme.colors.blue[800]};
  color: ${({ theme }) => theme.colors.sub.normal[10]};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;

  span {
    margin-left: 6px;
    font-weight: bold;
  }
`;
