import React from "react";
import { Reveal, Timeline, Tween } from "react-gsap";

export const Emerge = ({ children }) => (
  <Reveal>
    <Tween
      from={{ opacity: 0, y: "50px" }}
      stagger={3}
      duration={(children.length / 3) * 2}
    >
      {children}
    </Tween>
  </Reveal>
);

export const FadeIn = ({ children }) => (
  <Tween from={{ opacity: 0 }} stagger={7} duration={children.length}>
    {children}
  </Tween>
);

export const Floating = ({ children }) => (
  <Timeline target={children} repeat={-1}>
    <Tween from={{ y: "10px" }} duration={2} ease="power1.inOut" />
    <Tween to={{ y: "10px" }} duration={2} ease="power1.inOut" />
  </Timeline>
);
