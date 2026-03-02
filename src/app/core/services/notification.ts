import { computed, Injectable, signal } from '@angular/core';

export type NotificationType = 'message' | 'system' | 'activity' | 'task' | 'reminder';

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
  avatarColor?: string;
  icon?: string;
  iconColor?: string;
  route?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  notifications = signal<Notification[]>([
    {
      id: 1, type: 'message', title: 'Amina Hassan',
      message: 'Hey! Can you review the Q4 dashboard design before EOD?',
      time: '2 min ago', read: false,
      avatar: 'AH', avatarColor: '#4F6EF7', route: '/features/email'
    },
    {
      id: 2, type: 'message', title: 'David Kimani',
      message: 'The map integration PR is ready for review.',
      time: '15 min ago', read: false,
      avatar: 'DK', avatarColor: '#22c55e', route: '/features/email'
    },
    {
      id: 3, type: 'message', title: 'Sarah Mwangi',
      message: 'Are you coming to the team building event this Saturday?',
      time: '1 hr ago', read: false,
      avatar: 'SM', avatarColor: '#8b5cf6', route: '/features/email'
    },
    {
      id: 4, type: 'message', title: 'James Okafor',
      message: 'I have reviewed the sprint tickets and assigned them.',
      time: '3 hrs ago', read: true,
      avatar: 'JO', avatarColor: '#f59e0b', route: '/features/email'
    },
    {
      id: 5, type: 'message', title: 'Bank of Tanzania',
      message: 'Your monthly statement for November 2025 is ready.',
      time: 'Yesterday', read: true,
      avatar: 'BT', avatarColor: '#ef4444', route: '/features/email'
    },
    {
      id: 6, type: 'message', title: 'GitHub',
      message: 'PR #143 "feat: add sticky table headers" has been merged.',
      time: 'Yesterday', read: true,
      avatar: 'GH', avatarColor: '#1e293b', route: '/features/email'
    },
  ]);

  unreadCount = computed(() =>
    this.notifications().filter(n => !n.read).length
  );

  markAsRead(id: number) {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead() {
    this.notifications.update(list =>
      list.map(n => ({ ...n, read: true }))
    );
  }
  
}
