import { css } from "../../styled-system/css";
import { Button, buttonVariants } from "@cwm/ui";

export default function Home() {
  return (
    <>
      <h1>Next.Js</h1>
      <div className={css({ fontSize: "8xl", fontWeight: "bold" })}>Hello 🐼!</div>
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <a
        href="http://google.com"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "solid" })}
      >
        Google
      </a>
    </>
  );
}
