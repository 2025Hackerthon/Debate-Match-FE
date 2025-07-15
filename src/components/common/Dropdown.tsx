import styled from "@emotion/styled";
import { useState, useRef, useEffect } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && wrapperRef.current && menuRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const menuHeight = menuRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (wrapperRect.bottom + menuHeight > viewportHeight) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  }, [isOpen]);

  return (
    <Wrapper ref={wrapperRef}>
      <Selected onClick={() => setIsOpen(prev => !prev)}>
        {value || <span className="placeholder">{placeholder}</span>}
        {isOpen ? <IoChevronUp size={16} /> : <IoChevronDown size={16} />}
      </Selected>

      {isOpen && (
        <Menu ref={menuRef} dropUp={dropUp}>
          {options.map(option => (
            <MenuItem key={option} onClick={() => handleSelect(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Selected = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.sub.normal[20]};
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;

  .placeholder {
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue[400]};
  }
`;

const Menu = styled.ul<{ dropUp: boolean }>`
  position: absolute;
  width: 100%;
  border-radius: 8px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  z-index: 10;
  padding: 4px 0;
  user-select: none;

  ${({ dropUp }) =>
    dropUp
      ? `
    bottom: 110%;
    top: auto;
  `
      : `
    top: 110%;
    bottom: auto;
  `}
`;

const MenuItem = styled.li`
  padding: 12px 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.sub.normal[20]};
  cursor: pointer;
  list-style: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;
