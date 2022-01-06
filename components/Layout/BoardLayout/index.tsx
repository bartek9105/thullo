import Navbar from "../../Navbar";
import styles from "./BoardLayout.module.scss";
import { PropsWithChildren } from "react";

type BoardLayoutProps = PropsWithChildren<{}>;

const BoardLayout = ({ children }: BoardLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default BoardLayout;
