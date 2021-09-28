import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Redirect = ({ redirectCooldown=1000, title='Redirecting you', stuckText='Stuck? Click here' }) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/register/success"), redirectCooldown);
  }, []);
  return (
    <div className="flex items-center justify-center w-full">
      <div className="space-y-2 text-center w-full px-8" style={{maxWidth: 400}}>
        <h4 className="text-xl font-bold">{title}</h4>
        <div className="h-3 mt-2 relative rounded-full overflow-hidden w-full">
          <div className="w-full h-full bg-gray-200 absolute"></div>
          <div
            className="h-full bg-blue-500 absolute"
            style={{
              animation: `${redirectCooldown}ms forwards 0s 1 expandWidth`
            }}
          />
        </div>
        <div onClick={() => router.push("/register/success")}>
          {stuckText}
        </div>
      </div>
    </div>
  );
};

export default Redirect;