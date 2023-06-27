import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface UserContextType {
  currentUser: any; // 根據需要更換為實際的使用者資料型別
  setCurrentUser: Dispatch<SetStateAction<any>>; // 根據需要更換為實際的狀態設置函式型別
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
