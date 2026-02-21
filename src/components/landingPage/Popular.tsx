import { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import Filter from "../../assets/icons/filter.svg";

type SortType = "인기순" | "이름순";

const Popular = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<SortType>("인기순");

  const handleSortClick = (sortType: SortType) => {
    setSelectedSort(sortType);
    setIsOpen(false);
    console.log(`${sortType}으로 정렬 실행`);
  };

  return (
    <Container>
      <ActionGroup onClick={() => setIsOpen(!isOpen)}>
        <Icon src={Filter} alt="필터" />
        {selectedSort}
      </ActionGroup>

      {isOpen && (
        <DropdownMenu>
          <MenuItem onClick={() => handleSortClick("인기순")}>
            인기순
            {selectedSort === "인기순" && <CheckMark>✓</CheckMark>}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleSortClick("이름순")}>
            이름순
            {selectedSort === "이름순" && <CheckMark>✓</CheckMark>}
          </MenuItem>
        </DropdownMenu>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative; /* 드롭다운 메뉴의 기준점 */
  display: inline-block;
`;

const ActionGroup = styled.div`
  ${theme.typography.button02}
  color: ${theme.colors.black};
  cursor: pointer;
  gap: 4px;
  align-items: center;
  display: flex;
  /* width와 height에 단위를 추가했습니다 */
  width: fit-content;
  height: 24px;
`;

const Icon = styled.img`
  filter: brightness(0);
  width: 24px;
  height: 24px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 32px; /* 버튼 아래 적당한 위치 */
  right: 0;
  width: 140px;
  background-color: ${theme.colors.white};
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid ${theme.colors.primary100};
  z-index: 100;
  overflow: hidden;
  padding: 8px 0;
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  color: ${theme.colors.black};

  &:hover {
    background-color: ${theme.colors.primary50 || "#f8f9fa"};
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${theme.colors.primary100};
  margin: 0 12px;
`;

const CheckMark = styled.span`
  font-weight: bold;
  color: ${theme.colors.black};
`;

export default Popular;
