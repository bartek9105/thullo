import { routes } from "../../config/routes.config";
import styles from "./Logo.module.scss";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={routes.root()}>
      <a>
        <h2 className={styles.logo}>Thullo</h2>
      </a>
    </Link>
  );
};

export default Logo;
