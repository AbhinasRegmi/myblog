import { PropsWithChildren } from "react";

export function GridBackGround(props: PropsWithChildren) {
  return (
    <div className="w-full bg-white bg-dot-black/[0.2] relative flex items-center justify-center">      
        {props.children}
    </div>
  );
}
