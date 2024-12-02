"use client";

import "./home.scss";

import { VideoBG } from "./components/VideoBG/VideoBG";
import MovingText from "@/app/components/Movingtext/movingText";
import dynamic from "next/dynamic";
const Bulletin = dynamic(() => import("@/app/components/Bulletin/Bulletin"), {
  ssr: false,
});

export default function Page() {
  return (
    <div className="main overflow-x-hidden">
      <div>
        <div className="max-h-screen">
          <VideoBG />
          <MovingText />
        </div>
      </div>
      <div>
        {/*<h1 className={"z-10 monlytitle absolute top-60 p-2"}>*/}
        {/*  Violin Guild of America*/}
        {/*</h1>*/}
      </div>

      <div className={`maincontent  mt-0 lg:mt-40}`}>
        <h1 className="bully lg:mt-40">Bulletin</h1>
        <Bulletin />
      </div>
    </div>
  );
}
