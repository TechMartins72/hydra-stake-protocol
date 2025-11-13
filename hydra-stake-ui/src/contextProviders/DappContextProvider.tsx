import {
  createContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import type { NotificationType } from "../lib/types";

export const DappContext = createContext<DappConfigType | null>(null);

type routes = "dashboard" | "history" | "stakedetails";

interface DappConfigType {
  notification: {
    type: NotificationType;
    message: string;
  } | null;
  setNotification: Dispatch<
    SetStateAction<{
      type: NotificationType;
      message: string;
    } | null>
  >;
  route: routes;
  setRoute: Dispatch<SetStateAction<routes>>;
}

const DappContextProvider: React.FC<Readonly<PropsWithChildren>> = ({
  children,
}) => {
  const [route, setRoute] = useState<routes>("dashboard");
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
  } | null>(null);

  const value: DappConfigType = {
    notification,
    setNotification,
    route,
    setRoute,
  };

  return <DappContext.Provider value={value}>{children}</DappContext.Provider>;
};

export default DappContextProvider;
