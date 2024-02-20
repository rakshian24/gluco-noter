import { styled } from "styled-components";
import { colors } from "../constants";

export const ListContainer = styled.fieldset`
  border: none;
  padding: 16px;
  border-radius: 16px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  margin-bottom: 16px;
  background: ${colors.lightGrey};
  color: ${colors.contentSecondary};

  cursor: pointer;
  height: auto;
  &:hover {
    background: ${colors.grey};
  }
`;

export const StyledLegend = styled.legend`
  font-size: 16px;
  margin: auto 16px;
  outline: none;
  background: ${colors.darkGrey};
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 500;

  &:hover {
    background: ${colors.grey};
  }
`;
