import { PropsWithChildren, useEffect, useState } from "react";

type ClientOnlyProps = PropsWithChildren<{}>;

const ClientOnly = ({ children }: ClientOnlyProps) => {
  const [windowReady, setWindowReady] = useState(false);

  useEffect(() => {
    setWindowReady(true);
  }, []);

  return <>{windowReady && { children }}</>;
};

export default ClientOnly;
