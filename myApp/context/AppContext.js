import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';

const AppContext = createContext();

const initialNotes = [
  {
    id: '1',
    title: 'Data Structures Complete Notes',
    subject: 'Computer Science',
    author: 'Alex Kumar',
    authorId: 'user1',
    uploadDate: '2026-04-18',
    likes: 234,
    downloads: 1200,
    pages: 45,
    thumbnail: '#4F46E5',
    status: 'approved',
  },
  {
    id: '2',
    title: 'Organic Chemistry Chapter 5-8',
    subject: 'Chemistry',
    author: 'Sarah Chen',
    authorId: 'user2',
    uploadDate: '2026-04-17',
    likes: 189,
    downloads: 856,
    pages: 32,
    thumbnail: '#10B981',
    status: 'approved',
  },
  {
    id: '3',
    title: 'Calculus II - Integration Techniques',
    subject: 'Mathematics',
    author: 'Michael Brown',
    authorId: 'user3',
    uploadDate: '2026-04-15',
    likes: 312,
    downloads: 1450,
    pages: 28,
    thumbnail: '#F59E0B',
    status: 'approved',
  },
  {
    id: '4',
    title: 'World History - Renaissance Period',
    subject: 'History',
    author: 'Emma Wilson',
    authorId: 'user4',
    uploadDate: '2026-04-14',
    likes: 145,
    downloads: 620,
    pages: 38,
    thumbnail: '#EF4444',
    status: 'approved',
  },
];

const initialUsers = [
  { id: 'user1', name: 'Alex Kumar', email: 'alex.kumar@email.com', role: 'user' },
  { id: 'user2', name: 'Sarah Chen', email: 'sarah.chen@email.com', role: 'user' },
  { id: 'user3', name: 'Michael Brown', email: 'michael.brown@email.com', role: 'user' },
  { id: 'user4', name: 'Emma Wilson', email: 'emma.wilson@email.com', role: 'user' },
  { id: 'admin1', name: 'Admin User', email: 'admin@notehub.com', role: 'admin' },
];

const mockCredentials = {
  admin: { email: 'admin@notehub.com', password: 'admin123' },
  users: [{ email: 'user@notehub.com', password: 'user123', name: 'Demo User' }],
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState(initialNotes);
  const [users, setUsers] = useState(initialUsers);
  const [darkMode, setDarkMode] = useState(false);
  const [likedNotes, setLikedNotes] = useState(new Set());
  const [downloadedNotes, setDownloadedNotes] = useState(new Set());
  const [userActivity, setUserActivity] = useState({ uploads: 0, likes: 0, downloads: 0 });

  useEffect(() => {
    if (user && user.role !== 'guest') {
      calculateUserActivity();
    } else {
      setUserActivity({ uploads: 0, likes: 0, downloads: 0 });
    }
  }, [user, notes, likedNotes, downloadedNotes]);

  const calculateUserActivity = () => {
    if (!user || user.role === 'guest') return;
    const uploads = notes.filter((note) => note.authorId === user.id).length;
    const likes = likedNotes.size;
    const downloads = downloadedNotes.size;
    setUserActivity({ uploads, likes, downloads });
  };

  const login = async (email, password) => {
    if (email === mockCredentials.admin.email && password === mockCredentials.admin.password) {
      const adminUser = initialUsers.find((u) => u.role === 'admin');
      if (adminUser) {
        setUser(adminUser);
        return true;
      }
    }

    const mockUser = mockCredentials.users.find((u) => u.email === email && u.password === password);
    if (mockUser) {
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        setUser(existingUser);
      } else {
        const newUser = { id: 'user_' + Date.now(), name: mockUser.name, email: mockUser.email, role: 'user' };
        setUsers([...users, newUser]);
        setUser(newUser);
      }
      return true;
    }

    Alert.alert('Login Failed', 'Invalid email or password');
    return false;
  };

  const register = async (name, email, password, role) => {
    if (users.find((u) => u.email === email)) {
      Alert.alert('Error', 'Email already registered');
      return false;
    }

    const newUser = {
      id: role === 'admin' ? 'admin_' + Date.now() : 'user_' + Date.now(),
      name,
      email,
      role,
    };

    setUsers([...users, newUser]);
    setUser(newUser);
    return true;
  };

  const addNote = async (note) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
      uploadDate: new Date().toISOString().split('T')[0],
      likes: 0,
      downloads: 0,
      status: 'pending',
    };
    setNotes([newNote, ...notes]);
    Alert.alert('Success', 'Note uploaded successfully!');
  };

  const updateNoteStatus = async (noteId, status) => {
    setNotes(notes.map((note) => (note.id === noteId ? { ...note, status } : note)));
  };

  const likeNote = async (noteId) => {
    if (user?.role === 'guest') return;

    const isLiked = likedNotes.has(noteId);

    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          return { ...note, likes: isLiked ? note.likes - 1 : note.likes + 1 };
        }
        return note;
      })
    );

    if (isLiked) {
      setLikedNotes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(noteId);
        return newSet;
      });
    } else {
      setLikedNotes((prev) => new Set(prev).add(noteId));
    }
  };

  const downloadNote = async (noteId) => {
    if (user?.role === 'guest') return;

    setNotes(notes.map((note) => (note.id === noteId ? { ...note, downloads: note.downloads + 1 } : note)));
    setDownloadedNotes((prev) => new Set(prev).add(noteId));
  };

  const addUser = async (userData) => {
    const newUser = { ...userData, id: Date.now().toString() };
    setUsers([...users, newUser]);
  };

  const updateUser = async (userId, updates) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, ...updates } : u)));
    if (user?.id === userId) {
      setUser({ ...user, ...updates });
    }
    Alert.alert('Success', 'Profile updated');
  };

  const deleteUser = async (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getUserUploads = () => {
    if (!user || user.role === 'guest') return [];
    return notes.filter((note) => note.authorId === user.id);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        notes,
        addNote,
        updateNoteStatus,
        likeNote,
        downloadNote,
        users,
        addUser,
        updateUser,
        deleteUser,
        darkMode,
        toggleDarkMode,
        likedNotes,
        userActivity,
        getUserUploads,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}