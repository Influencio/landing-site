import React, { useEffect } from "react";
import { useRouter } from "next/router";


import tw, { css } from 'twin.macro'

const Redirect = () => {
  const redirectCooldown = 1000;
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/register/success"), redirectCooldown);
  });
  return (
    <div className="flex items-center justify-center w-full">
      <div tw="space-y-2 text-center w-full max-w-sm">
        <h4 className="text-xl font-bold">Redirecting you</h4>
        <div className="h-3 mt-2 relative w-12 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gray-200 absolute"></div>
          <div
            className="h-full bg-blue-500 absolute"
            css={css`
              @keyframes expandWidth {
                0% {
                  width: 0;
                }
                50% {
                  width: 10%;
                }
                75% {
                  width: 85%;
                }
                100% {
                  width: 100%;
                }
              }
              animation: ${redirectCooldown}ms forwards 0s 1 expandWidth;
            `}
          />
        </div>
        <div onClick={() => router.push("/register/success")}>
          Stuck? Click here
        </div>
      </div>
    </div>
  );
};

export default Redirect;