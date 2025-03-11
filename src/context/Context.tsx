import  { createContext, useState, useContext } from "react";

// Context oluştur
const SearchContext = createContext();

// Context Provider component'i
export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Modal'ı açıp kapatan fonksiyon
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <SearchContext.Provider value={{ isSearchOpen, toggleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

// Context'i kullanmak için özel bir hook
export const useSearch = () => {
  return useContext(SearchContext);
};