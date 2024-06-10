import React from "react";
import { GitHub } from "react-feather";

import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

const HomePage: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GitHub size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
