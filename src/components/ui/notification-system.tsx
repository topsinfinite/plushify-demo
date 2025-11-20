"use client";

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number; // in ms, 0 for persistent
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

// Convenience hooks for different notification types
export function useToast() {
  const { addNotification } = useNotifications();

  return {
    success: (message: string, options?: Partial<Notification>) =>
      addNotification({ ...options, type: "success", message }),
    error: (message: string, options?: Partial<Notification>) =>
      addNotification({ ...options, type: "error", message, duration: 0 }),
    warning: (message: string, options?: Partial<Notification>) =>
      addNotification({ ...options, type: "warning", message }),
    info: (message: string, options?: Partial<Notification>) =>
      addNotification({ ...options, type: "info", message }),
  };
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>): string => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      ...notification,
      id,
      duration: notification.duration ?? 5000, // Default 5 seconds
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove notification after duration
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onDismiss: () => void;
}

function NotificationItem({ notification, onDismiss }: NotificationItemProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 150); // Wait for animation
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const variants = {
    success: "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
    error: "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
    info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
  };

  const IconComponent = icons[notification.type];

  return (
    <Alert
      className={cn(
        "relative transition-all duration-300 ease-in-out shadow-lg",
        "transform translate-x-full opacity-0",
        isVisible && "translate-x-0 opacity-100",
        variants[notification.type]
      )}
    >
      <IconComponent className="h-4 w-4" />
      <div className="flex-1">
        {notification.title && (
          <AlertTitle className="mb-1">{notification.title}</AlertTitle>
        )}
        <AlertDescription className="text-sm">
          {notification.message}
        </AlertDescription>
        {notification.action && (
          <div className="mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                notification.action!.onClick();
                handleDismiss();
              }}
              className="h-8 text-xs"
            >
              {notification.action.label}
            </Button>
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDismiss}
        className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-black/10"
      >
        <X className="h-3 w-3" />
      </Button>
    </Alert>
  );
}

// Preset notification functions for common use cases
export const notificationPresets = {
  // Generation related
  generationStarted: () => ({
    type: "info" as const,
    title: "Generation Started",
    message: "Your plushie is being generated. This may take a few moments...",
    duration: 3000,
  }),

  generationComplete: (creditsUsed: number) => ({
    type: "success" as const,
    title: "Plushie Generated!",
    message: `Your adorable plushie is ready! Used ${creditsUsed} credit${creditsUsed !== 1 ? 's' : ''}.`,
    duration: 5000,
  }),

  generationFailed: (reason?: string) => ({
    type: "error" as const,
    title: "Generation Failed",
    message: reason || "Something went wrong while generating your plushie. Please try again.",
    duration: 0,
  }),

  // Credit related
  lowCredits: (remainingCredits: number) => ({
    type: "warning" as const,
    title: "Low Credits",
    message: `You have ${remainingCredits} credit${remainingCredits !== 1 ? 's' : ''} remaining. Consider purchasing more credits.`,
    duration: 8000,
    action: {
      label: "Buy Credits",
      onClick: () => window.location.href = "/pricing",
    },
  }),

  noCredits: () => ({
    type: "error" as const,
    title: "No Credits Remaining",
    message: "You need credits to generate plushies. Purchase more credits to continue.",
    duration: 0,
    action: {
      label: "Buy Credits",
      onClick: () => window.location.href = "/pricing",
    },
  }),

  creditsAdded: (amount: number) => ({
    type: "success" as const,
    title: "Credits Added",
    message: `Successfully added ${amount} credit${amount !== 1 ? 's' : ''} to your account!`,
    duration: 4000,
  }),

  // Upload related
  uploadSuccess: () => ({
    type: "success" as const,
    message: "Image uploaded successfully!",
    duration: 3000,
  }),

  uploadError: (reason?: string) => ({
    type: "error" as const,
    title: "Upload Failed",
    message: reason || "Failed to upload image. Please try again.",
    duration: 5000,
  }),

  // General actions
  savedToFavorites: () => ({
    type: "success" as const,
    message: "Added to favorites!",
    duration: 2000,
  }),

  removedFromFavorites: () => ({
    type: "info" as const,
    message: "Removed from favorites.",
    duration: 2000,
  }),

  downloadStarted: () => ({
    type: "info" as const,
    message: "Download started...",
    duration: 2000,
  }),

  copied: () => ({
    type: "success" as const,
    message: "Copied to clipboard!",
    duration: 2000,
  }),

  // Network/System
  networkError: () => ({
    type: "error" as const,
    title: "Network Error",
    message: "Please check your internet connection and try again.",
    duration: 0,
  }),

  maintenanceMode: () => ({
    type: "warning" as const,
    title: "Maintenance",
    message: "The service is temporarily unavailable for maintenance. Please try again later.",
    duration: 0,
  }),
};