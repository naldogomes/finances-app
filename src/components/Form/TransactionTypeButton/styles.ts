import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  isActive: boolean;
  type: "up" | "down";
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  padding: 16px;
  justify-content: center;

  ${({ isActive, type }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${({ theme }) => theme.colors.sucess_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;

export const Icon = styled(Feather)<IconProps>`
  margin-right: 12px;
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.sucess : theme.colors.attention};
`;
