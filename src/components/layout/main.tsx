import React from "react";
import styled from "styled-components";

const StyledMain = styled.main`
  background-color: ${p => p.theme.colors.blueDarkest};
  position: absolute;
  top: 0;
  left: ${p => p.theme.sidebarWidth + "px"};
  right: 0;
  transition: left 300ms, top 300ms;
  min-height: 100vh;
  padding: 30px 5%;
  ${p => p.theme.small} {
    top: ${p => p.theme.headerHeight}px;
    left: 0;
  }
`;

const Container = styled.div<{ fullWidth: boolean }>`
  max-width: ${p => (p.fullWidth ? "100%" : "700px")};
`;

type Props = {
  children: React.ReactNode;
  fullWidth: boolean;
  id: string;
};
export const Main = ({ children, fullWidth, id }: Props) => {
  return (
    <StyledMain id={id}>
      <Container fullWidth={fullWidth}>{children}</Container>
    </StyledMain>
  );
};
