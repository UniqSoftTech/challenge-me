import React from "react";
import { UsersFour, House, UserCircle } from "@phosphor-icons/react";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  const useFooter =
    router.pathname === "/club" ||
    router.pathname === "/challenges" ||
    router.pathname === "/profile";

  const routes = [
    {
      icon: (
        <UsersFour
          size={26}
          className={`opacity-62 text-black hover:text-green-500 ${
            router.pathname === "/club" && "text-green-500"
          }`}
        />
      ),
      route: "/club",
    },
    {
      icon: (
        <House
          size={26}
          className={`opacity-62 text-black hover:text-green-500 ${
            router.pathname === "/challenges" && "text-green-500"
          }`}
        />
      ),
      route: "/challenges",
    },
    {
      icon: (
        <UserCircle
          size={26}
          className={`opacity-62 text-black hover:text-green-500 ${
            router.pathname === "/profile" && "text-green-500"
          }`}
        />
      ),
      route: "/profile",
    },
  ];
  return (
    <footer
      className={`fixed bottom-0 w-full bg-white border-t text-white ${
        useFooter ? "" : "hidden"
      }`}
    >
      <div className="flex justify-between items-center px-4 py-2">
        {routes.map((route, index) => {
          return (
            <div key={index} className="flex flex-col w-1/3 items-center">
              <button
                onClick={() => router.push(route?.route || "/")}
                className="focus:outline-none"
              >
                {route.icon}
              </button>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
