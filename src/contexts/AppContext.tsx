import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  bio: string;
  categories: string[];
  languages: string[];
  feeRange: string;
  location: string;
  experience?: string;
  specialties?: string;
  portfolio?: string;
  profileImage?: File | null;
  isArtist: boolean;
  joinedDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface AppContextType {
  currentUser: User | null;
  artists: User[];
  addUser: (userData: Omit<User, 'id' | 'joinedDate' | 'status'>) => void;
  updateUserStatus: (userId: string, status: 'approved' | 'rejected') => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [artists, setArtists] = useState<User[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addUser = (userData: Omit<User, 'id' | 'joinedDate' | 'status'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString(),
      status: 'pending'
    };
    
    setCurrentUser(newUser);
    setArtists(prev => [...prev, newUser]);
    setIsLoggedIn(true);
  };

  const updateUserStatus = (userId: string, status: 'approved' | 'rejected') => {
    setArtists(prev => 
      prev.map(artist => 
        artist.id === userId ? { ...artist, status } : artist
      )
    );
    
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, status } : null);
    }
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      artists,
      addUser,
      updateUserStatus,
      isLoggedIn,
      setIsLoggedIn
    }}>
      {children}
    </AppContext.Provider>
  );
};