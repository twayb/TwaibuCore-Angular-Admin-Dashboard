import { Component } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: string;
  color: string;
}

interface RecentUser {
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joined: string;
}

interface Activity {
  user: string;
  action: string;
  time: string;
  icon: string;
}

interface SystemLog {
  level: 'info' | 'warning' | 'error';
  message: string;
  time: string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent {

   statCards: StatCard[] = [
    {
      title: 'Total Users',
      value: '24,521',
      change: '+12.5%',
      changeType: 'up',
      icon: 'bi bi-people',
      color: 'primary'
    },
    {
      title: 'Active Sessions',
      value: '1,340',
      change: '+8.2%',
      changeType: 'up',
      icon: 'bi bi-activity',
      color: 'success'
    }
  ];

  recentUsers: RecentUser[] = [
    { name: 'Twaibu Songoro',  email: 'twaibu@live.com',   role: 'Admin',    status: 'active',   joined: 'Feb 20, 2026' },
    { name: 'Jane Mwangi',     email: 'jane@example.com',  role: 'Manager',  status: 'active',   joined: 'Feb 18, 2026' },
    { name: 'Ali Hassan',      email: 'ali@example.com',   role: 'Editor',   status: 'inactive', joined: 'Feb 15, 2026' },
    { name: 'Sara Kimani',     email: 'sara@example.com',  role: 'Viewer',   status: 'active',   joined: 'Feb 10, 2026' },
    { name: 'John Doe',        email: 'john@example.com',  role: 'Editor',   status: 'inactive', joined: 'Feb 05, 2026' },
  ];

  activities: Activity[] = [
    { user: 'Twaibu Songoro', action: 'Created a new user account',     time: '2 mins ago',  icon: 'bi bi-person-plus' },
    { user: 'Jane Mwangi',    action: 'Updated system settings',        time: '15 mins ago', icon: 'bi bi-gear' },
    { user: 'Ali Hassan',     action: 'Exported user report',           time: '1 hr ago',    icon: 'bi bi-file-earmark-arrow-down' },
    { user: 'Sara Kimani',    action: 'Logged in from new device',      time: '2 hrs ago',   icon: 'bi bi-box-arrow-in-right' },
    { user: 'John Doe',       action: 'Deleted 3 inactive accounts',    time: '3 hrs ago',   icon: 'bi bi-trash' },
  ];

  systemLogs: SystemLog[] = [
    { level: 'info',    message: 'System backup completed successfully', time: '12:00 AM' },
    { level: 'warning', message: 'High memory usage detected on server', time: '11:30 PM' },
    { level: 'error',   message: 'Failed login attempt from 192.168.1.1', time: '10:15 PM' },
    { level: 'info',    message: 'New software update available v2.1.0', time: '09:00 PM' },
    { level: 'warning', message: 'SSL certificate expiring in 7 days',   time: '08:45 PM' },
  ];

}
