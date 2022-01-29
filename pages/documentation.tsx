import type { NextPage } from "next";

const Documentation: NextPage = () => {
  return (
    <>
      <h1>Placeholder</h1>
    </>
  );
};

export function getStaticProps() {
  return {
    props: {
      title: "Documentation",
    },
  };
}

export default Documentation;
