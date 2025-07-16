import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Logo from "../assets/Logo.png";
import { Text } from "../components/common/Text";
import type { DEBATETheme } from "../styles/theme";
import { useEffect, useState } from "react";
import { DebateItem, TagSelector } from "../components/debate/index";
import { debateService } from "../services";
import { ResultStatus } from "../services/service";
import type { GetWaitResponse } from "../services/types";

export const Home = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [debateItems, setDebateItems] = useState<GetWaitResponse>([]);
  const theme = useTheme() as DEBATETheme;

  const fetchDebateItems = async () => {
    const res = await debateService.getWait();
    if (res.status === ResultStatus.OK) {
      setDebateItems(res.data!);
    } else {
      alert("오류가 발생했습니다");
    }
  };

  useEffect(() => {
    fetchDebateItems();
  }, []);

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
          {filteredItems.map((item, idx) => (
            <DebateItem
              key={idx}
              title={item.title}
              tags={item.tags}
              side={item.side}
            />
          ))}
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
`;

const FilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DebateList = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;
