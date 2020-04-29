import React, { useState, useEffect, useMemo } from "react";
import { ThemeProvider } from "emotion-theming";
import { theme } from "../theme";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Main } from "./main";
import { Show } from "./show";
import { CrookedTitle } from "./crooked-title";
import { useClickOutside } from "../hooks/use-click-outside";
import { useWindowSize } from "react-hooks-window-size";
import "./layout.css";

type Props = {
  title: string;
  fullWidth?: boolean;
};

export const Layout: React.FC<Props> = ({ children, title, fullWidth }) => {
  const { width } = useWindowSize(1280, 1080);
  const isSmall = useMemo(() => width < 700, [width]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(!isSmall);

  function toggleSidebar() {
    setIsSidebarOpen(o => !o);
  }

  useEffect(
    function toggleSidebarOnWidthChange() {
      setIsSidebarOpen(!isSmall);
    },
    [isSmall]
  );

  const ref = useClickOutside(e => {
    if (isSmall && isSidebarOpen && e.target.id !== "toggle-button") {
      toggleSidebar();
    }
  });

  return (
    <ThemeProvider theme={{ ...theme, isSmall, isSidebarOpen }}>
      <Show when={isSmall}>
        <Header onRequestOpenSidebar={toggleSidebar} />
      </Show>

      <Sidebar forwardRef={ref} />
      <Main fullWidth={fullWidth}>
        <CrookedTitle>{title}</CrookedTitle>
        <div style={{ marginTop: "25px" }}>{children}</div>
      </Main>
    </ThemeProvider>
  );
};
