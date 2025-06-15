'use client'

import React, { createContext, useContext, useReducer, useCallback, useMemo } from 'react'

interface AppState {
  isMenuOpen: boolean
  currentSection: string
  theme: 'light' | 'dark'
  isLoading: boolean
  notifications: Notification[]
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
}

type AppAction =
  | { type: 'TOGGLE_MENU' }
  | { type: 'SET_CURRENT_SECTION'; payload: string }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }

const initialState: AppState = {
  isMenuOpen: false,
  currentSection: 'home',
  theme: 'light',
  isLoading: false,
  notifications: [],
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen }
    case 'SET_CURRENT_SECTION':
      return { ...state, currentSection: action.payload }
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      }
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      }
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] }
    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  actions: {
    toggleMenu: () => void
    setCurrentSection: (section: string) => void
    setTheme: (theme: 'light' | 'dark') => void
    setLoading: (loading: boolean) => void
    addNotification: (notification: Omit<Notification, 'id'>) => void
    removeNotification: (id: string) => void
    clearNotifications: () => void
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const actions = useMemo(
    () => ({
      toggleMenu: () => dispatch({ type: 'TOGGLE_MENU' }),
      setCurrentSection: (section: string) =>
        dispatch({ type: 'SET_CURRENT_SECTION', payload: section }),
      setTheme: (theme: 'light' | 'dark') =>
        dispatch({ type: 'SET_THEME', payload: theme }),
      setLoading: (loading: boolean) =>
        dispatch({ type: 'SET_LOADING', payload: loading }),
      addNotification: (notification: Omit<Notification, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9)
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { ...notification, id },
        })
        
        // Auto remove after duration
        if (notification.duration !== 0) {
          setTimeout(() => {
            dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
          }, notification.duration || 5000)
        }
      },
      removeNotification: (id: string) =>
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),
      clearNotifications: () => dispatch({ type: 'CLEAR_NOTIFICATIONS' }),
    }),
    []
  )

  const contextValue = useMemo(
    () => ({ state, actions }),
    [state, actions]
  )

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default AppContext