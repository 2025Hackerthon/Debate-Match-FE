/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Logo from "../assets/Logo.png";
import { Text } from "../components/common/Text";
import type { DEBATETheme } from "../styles/theme";
import { useState } from "react";
import { TagSelector, Record } from "../components/debate/index";

interface DummyType {
  question: string;
  tags: string[];
  agree: number;
  disagree: number;
}

const debateItems: DummyType[] = [
  {
    question: "고전문학은 현재 교육 과정에 꼭 필요한가?",
    tags: ["국어"],
    agree: 72,
    disagree: 19
  },
  {
    question: "수포자 문제 해결을 위한 수학 교육 개편이 필요한가?",
    tags: ["수학"],
    agree: 58,
    disagree: 31
  },
  {
    question: "기초 영어 회화 수업이 시험보다 중요한가?",
    tags: ["영어"],
    agree: 43,
    disagree: 67
  },
  {
    question: "한국사 필수화는 과도한가?",
    tags: ["한국사"],
    agree: 22,
    disagree: 83
  },
  {
    question: "세계사 교육에서 식민 지배 서술을 확대해야 하는가?",
    tags: ["세계사"],
    agree: 81,
    disagree: 15
  },
  {
    question: "기후위기 대응을 위한 탄소세 도입은 정당한가?",
    tags: ["과학", "사회"],
    agree: 66,
    disagree: 28
  },
  {
    question: "예체능도 대학입시에 더 반영되어야 하는가?",
    tags: ["체육", "음악", "미술"],
    agree: 37,
    disagree: 45
  }
];

export const Records = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const theme = useTheme() as DEBATETheme;

  const filteredItems =
    selectedTags.length === 0
      ? debateItems
      : debateItems.filter(item =>
          item.tags.some(tag => selectedTags.includes(tag))
        );

  return (
    <Wrapper>
      <Banner>
        <LogoSection>
          <img src={Logo} alt="토론 한판 로고" width={350} />
        </LogoSection>
        <Slogan>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Text variant="TitleSmall">같은 주제, 다른 의견!</Text>
            <Text variant="LabelLarge" color={theme.colors.gray[500]}>
              원하는 주제로 각자의 의견으로 <br />
              더욱 더 깊게, 재밌게
            </Text>
          </div>
        </Slogan>
      </Banner>

      <Content>
        <FilterBar>
          <TagSelector selectedTags={selectedTags} onChange={setSelectedTags} />
        </FilterBar>

        <DebateList>
          <TextWrapper>
            <Text variant="LabelMedium">기록 열람</Text>
            <Text variant="LabelMedium">{filteredItems.length}개</Text>
          </TextWrapper>

          <div>
            {filteredItems.map((item, idx) => (
              <Record
                key={idx}
                title={item.question}
                tags={item.tags}
                agree={item.agree}
                disagree={item.disagree}
              />
            ))}
          </div>
        </DebateList>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Banner = styled.div`
  background-color: ${({ theme }) => theme.colors.blue[100]};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 20%;

  @media (max-width: 767px) {
    justify-content: center;
    padding: 24px 16px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    justify-content: center;
    width: 100%;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const Slogan = styled.div`
  text-align: right;
  color: #222;

  strong {
    font-size: 20px;
  }

  p {
    font-size: 14px;
    margin-top: 4px;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const Content = styled.div`
  background-color: white;
  padding: 32px 17%;
  gap: 20px;
`;

const FilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DebateList = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextWrapper = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`;
