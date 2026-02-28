import { Component } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart, ApexAxisChartSeries, ApexStroke,
  ApexFill, ApexTooltip, ApexXAxis, ApexYAxis,
  ApexDataLabels, ApexPlotOptions, ApexNonAxisChartSeries,
  ApexLegend, ApexResponsive
} from 'ng-apexcharts';

@Component({
  selector: 'app-widgets',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './widgets.html',
  styleUrl: './widgets.css',
})
export class WidgetsComponent {

  // ── KPI STATS ──
  kpiStats = [
    { title: 'Total Revenue',   value: '$94,320',  change: '+12.5%', up: true,  icon: 'bi bi-currency-dollar', color: 'primary', bg: 'rgba(79,110,247,0.12)',  iconColor: '#4F6EF7' },
    { title: 'Total Orders',    value: '3,842',    change: '+8.2%',  up: true,  icon: 'bi bi-bag-check',       color: 'success', bg: 'rgba(34,197,94,0.12)',   iconColor: '#22c55e' },
    { title: 'New Customers',   value: '1,257',    change: '+5.1%',  up: true,  icon: 'bi bi-people',          color: 'info',    bg: 'rgba(6,182,212,0.12)',   iconColor: '#06b6d4' },
    { title: 'Bounce Rate',     value: '24.8%',    change: '-3.2%',  up: false, icon: 'bi bi-graph-down',      color: 'danger',  bg: 'rgba(239,68,68,0.12)',   iconColor: '#ef4444' },
  ];

  // ── SPARKLINE CHARTS ──
// Fix 1 - Sparkline with proper types
getSparklineOptions(color: string, data: number[]) {
  return {
    series: [{ data }],
    chart: { type: 'line' as const, height: 50, sparkline: { enabled: true }, animations: { enabled: true } },
    stroke: { curve: 'smooth' as const, width: 2 },
    colors: [color],
    tooltip: { fixed: { enabled: false }, x: { show: false }, marker: { show: false } }
  };
}

// Fix 2 - Add computed properties for template
get doneTasksCount(): number {
  return this.tasks.filter(t => t.done).length;
}

get unreadNotificationsCount(): number {
  return this.notifications.filter(n => !n.read).length;
}

  sparklines = [
    { title: 'Revenue',    value: '$48,295', change: '+14.2%', up: true,  color: '#4F6EF7', data: [30,40,35,50,49,60,70,91,85,90,95,100] },
    { title: 'Users',      value: '8,492',   change: '+6.8%',  up: true,  color: '#22c55e', data: [20,25,30,28,35,40,38,45,50,48,55,60] },
    { title: 'Sessions',   value: '24,120',  change: '-2.1%',  up: false, color: '#ef4444', data: [60,55,50,58,52,48,45,50,42,40,38,35] },
    { title: 'Conversion', value: '3.24%',   change: '+1.5%',  up: true,  color: '#06b6d4', data: [10,15,12,18,20,22,19,25,28,30,27,32] },
  ];

  // ── REVENUE CHART ──
  revenueChartSeries: ApexAxisChartSeries = [
    { name: 'Revenue', data: [44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000, 66000, 72000, 68000, 94000] },
    { name: 'Expenses', data: [31000, 40000, 28000, 51000, 42000, 39000, 35000, 48000, 42000, 50000, 45000, 52000] },
  ];
  revenueChartOptions: ApexChart = { type: 'area', height: 280, toolbar: { show: false }, fontFamily: 'inherit' };
  revenueChartXAxis: ApexXAxis = { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], labels: { style: { fontSize: '11px' } } };
  revenueChartStroke: ApexStroke = { curve: 'smooth', width: 2 };
  revenueChartFill: ApexFill = { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 90, 100] } };
  revenueChartColors = ['#4F6EF7', '#22c55e'];

  // ── DONUT CHART ──
  donutSeries: ApexNonAxisChartSeries = [44, 28, 18, 10];
  donutChart: ApexChart = { type: 'donut', height: 260, fontFamily: 'inherit' };
  donutLabels = ['Direct', 'Organic', 'Referral', 'Social'];
  donutColors = ['#4F6EF7', '#22c55e', '#06b6d4', '#f59e0b'];
  donutLegend: ApexLegend = { position: 'bottom', fontSize: '12px' };

  // ── BAR CHART ──
  barSeries: ApexAxisChartSeries = [
    { name: 'This Month', data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 80, 95, 110] },
    { name: 'Last Month', data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 72, 68, 80] },
  ];
  barChart: ApexChart = { type: 'bar', height: 280, toolbar: { show: false }, fontFamily: 'inherit' };
  barXAxis: ApexXAxis = { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], labels: { style: { fontSize: '11px' } } };
  barColors = ['#4F6EF7', '#e2e8f0'];
  barPlotOptions: ApexPlotOptions = { bar: { borderRadius: 4, columnWidth: '60%' } };
  barDataLabels: ApexDataLabels = { enabled: false };

  // ── RADIAL CHART ──
  radialSeries: ApexNonAxisChartSeries = [75, 60, 85, 45];
  radialChart: ApexChart = { type: 'radialBar', height: 280, fontFamily: 'inherit' };
  radialLabels = ['Revenue', 'Orders', 'Customers', 'Growth'];
  radialColors = ['#4F6EF7', '#22c55e', '#06b6d4', '#f59e0b'];
  radialPlotOptions: ApexPlotOptions = {
    radialBar: {
      dataLabels: {
        name: { fontSize: '12px' },
        value: { fontSize: '11px' },
        total: { show: true, label: 'Average', formatter: () => '66%' }
      }
    }
  };

  // ── ACTIVITY FEED ──
  activities = [
    { user: 'James Okafor',   action: 'placed a new order',       time: '2 min ago',   avatar: 'JO', color: '#4F6EF7',  icon: 'bi bi-bag-check',       iconBg: 'rgba(79,110,247,0.12)' },
    { user: 'Amina Hassan',   action: 'signed up as a new user',  time: '15 min ago',  avatar: 'AH', color: '#22c55e',  icon: 'bi bi-person-plus',     iconBg: 'rgba(34,197,94,0.12)' },
    { user: 'Peter Njoroge',  action: 'submitted a complaint',    time: '1 hr ago',    avatar: 'PN', color: '#ef4444',  icon: 'bi bi-exclamation-circle', iconBg: 'rgba(239,68,68,0.12)' },
    { user: 'Grace Mwamba',   action: 'updated her profile',      time: '2 hr ago',    avatar: 'GM', color: '#06b6d4',  icon: 'bi bi-pencil',          iconBg: 'rgba(6,182,212,0.12)' },
    { user: 'Hassan Omar',    action: 'completed onboarding',     time: '3 hr ago',    avatar: 'HO', color: '#f59e0b',  icon: 'bi bi-check-circle',    iconBg: 'rgba(245,158,11,0.12)' },
    { user: 'Sarah Kimani',   action: 'requested a refund',       time: '5 hr ago',    avatar: 'SK', color: '#8b5cf6',  icon: 'bi bi-arrow-return-left', iconBg: 'rgba(139,92,246,0.12)' },
  ];

  // ── RECENT ORDERS ──
  recentOrders = [
    { id: '#ORD-001', customer: 'James Okafor',  product: 'MacBook Pro',    amount: '$2,499', status: 'Delivered', statusType: 'success' },
    { id: '#ORD-002', customer: 'Amina Hassan',  product: 'iPhone 15 Pro',  amount: '$1,199', status: 'Pending',   statusType: 'warning' },
    { id: '#ORD-003', customer: 'Peter Njoroge', product: 'AirPods Pro',    amount: '$249',   status: 'Shipped',   statusType: 'info' },
    { id: '#ORD-004', customer: 'Grace Mwamba',  product: 'iPad Air',       amount: '$799',   status: 'Cancelled', statusType: 'danger' },
    { id: '#ORD-005', customer: 'Hassan Omar',   product: 'Apple Watch',    amount: '$399',   status: 'Delivered', statusType: 'success' },
  ];

  // ── TASKS ──
  tasks = [
    { label: 'Review Q4 financial report',    done: true,  priority: 'high',   due: 'Today' },
    { label: 'Update user onboarding flow',   done: false, priority: 'high',   due: 'Today' },
    { label: 'Fix dashboard chart bug',       done: false, priority: 'medium', due: 'Tomorrow' },
    { label: 'Write API documentation',       done: false, priority: 'medium', due: 'Feb 28' },
    { label: 'Design new landing page',       done: true,  priority: 'low',    due: 'Mar 1' },
    { label: 'Deploy v2.0 to production',     done: false, priority: 'high',   due: 'Mar 2' },
  ];

  toggleTask(task: any) { task.done = !task.done; }

  // ── TEAM MEMBERS ──
  teamMembers = [
    { name: 'James Okafor',  role: 'Lead Developer',   avatar: 'JO', color: '#4F6EF7', online: true  },
    { name: 'Amina Hassan',  role: 'UI/UX Designer',   avatar: 'AH', color: '#22c55e', online: true  },
    { name: 'Peter Njoroge', role: 'Project Manager',  avatar: 'PN', color: '#06b6d4', online: false },
    { name: 'Grace Mwamba',  role: 'Data Analyst',     avatar: 'GM', color: '#f59e0b', online: true  },
    { name: 'Hassan Omar',   role: 'Backend Dev',      avatar: 'HO', color: '#8b5cf6', online: false },
    { name: 'Sarah Kimani',  role: 'QA Engineer',      avatar: 'SK', color: '#ef4444', online: true  },
  ];

  // ── GOAL TRACKER ──
  goals = [
    { label: 'Monthly Revenue',  current: 94320,  target: 100000, unit: '$',  color: '#4F6EF7' },
    { label: 'New Customers',    current: 1257,   target: 2000,   unit: '',   color: '#22c55e' },
    { label: 'Orders Completed', current: 3842,   target: 5000,   unit: '',   color: '#06b6d4' },
    { label: 'Support Tickets',  current: 48,     target: 100,    unit: '',   color: '#f59e0b' },
  ];

  getGoalPercent(goal: any): number {
    return Math.min(Math.round((goal.current / goal.target) * 100), 100);
  }

  formatGoalValue(goal: any): string {
    if (goal.unit === '$') return `$${goal.current.toLocaleString()} / $${goal.target.toLocaleString()}`;
    return `${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}`;
  }

  // ── NOTIFICATIONS ──
  notifications = [
    { title: 'New order received',        message: 'Order #ORD-006 from John Doe',      time: '2 min',  icon: 'bi bi-bag-check',         iconBg: 'rgba(79,110,247,0.12)',  iconColor: '#4F6EF7', read: false },
    { title: 'Payment successful',        message: 'TZS 450,000 received from client',  time: '1 hr',   icon: 'bi bi-credit-card',        iconBg: 'rgba(34,197,94,0.12)',   iconColor: '#22c55e', read: false },
    { title: 'Server alert',              message: 'CPU usage exceeded 90%',            time: '2 hr',   icon: 'bi bi-exclamation-triangle', iconBg: 'rgba(239,68,68,0.12)',  iconColor: '#ef4444', read: false },
    { title: 'New user registered',       message: 'Amina Hassan joined the platform',  time: '3 hr',   icon: 'bi bi-person-plus',        iconBg: 'rgba(6,182,212,0.12)',   iconColor: '#06b6d4', read: true  },
    { title: 'Report ready',              message: 'Q4 financial report is ready',      time: '5 hr',   icon: 'bi bi-file-earmark-text',  iconBg: 'rgba(245,158,11,0.12)', iconColor: '#f59e0b', read: true  },
  ];

  // ── QUICK ACTIONS ──
  quickActions = [
    { label: 'New Order',     icon: 'bi bi-bag-plus',        color: '#4F6EF7', bg: 'rgba(79,110,247,0.12)'  },
    { label: 'Add Customer',  icon: 'bi bi-person-plus',     color: '#22c55e', bg: 'rgba(34,197,94,0.12)'   },
    { label: 'New Invoice',   icon: 'bi bi-receipt',         color: '#06b6d4', bg: 'rgba(6,182,212,0.12)'   },
    { label: 'Add Product',   icon: 'bi bi-box-seam',        color: '#f59e0b', bg: 'rgba(245,158,11,0.12)'  },
    { label: 'Run Report',    icon: 'bi bi-bar-chart-line',  color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)'  },
    { label: 'Send Message',  icon: 'bi bi-chat-dots',       color: '#ef4444', bg: 'rgba(239,68,68,0.12)'   },
  ];

  // ── PROFILE CARD ──
  profile = {
    name: 'Twaibu Songoro',
    role: 'Front End Developer',
    avatar: 'TS',
    color: '#4F6EF7',
    followers: '2.4k',
    following: '184',
    projects: '48',
    location: 'Dar es Salaam, TZ',
    email: 'twaibu@live.com',
    joined: 'Jan 2023',
  };

  // ── WEATHER ──
  weather = {
    city: 'Dar es Salaam',
    temp: '29°C',
    condition: 'Partly Cloudy',
    humidity: '78%',
    wind: '12 km/h',
    icon: 'bi bi-cloud-sun',
    forecast: [
      { day: 'Mon', icon: 'bi bi-sun',        temp: '31°C' },
      { day: 'Tue', icon: 'bi bi-cloud-sun',  temp: '29°C' },
      { day: 'Wed', icon: 'bi bi-cloud-rain', temp: '26°C' },
      { day: 'Thu', icon: 'bi bi-sun',        temp: '32°C' },
      { day: 'Fri', icon: 'bi bi-cloud',      temp: '28°C' },
    ]
  };

  // ── CALENDAR ──
  calendarDays: number[] = [];
  currentMonth = new Date();
  selectedDate: number | null = null;
  events: { [key: number]: string } = { 5: 'Team meeting', 12: 'Product launch', 18: 'Board review', 25: 'Sprint demo' };

  ngOnInit() { this.buildCalendar(); }

  buildCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.calendarDays = Array(firstDay).fill(0).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));
  }

  get monthLabel(): string {
    return this.currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  prevMonth() { this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1); this.buildCalendar(); }
  nextMonth() { this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1); this.buildCalendar(); }

  isToday(day: number): boolean {
    const today = new Date();
    return day === today.getDate() &&
      this.currentMonth.getMonth() === today.getMonth() &&
      this.currentMonth.getFullYear() === today.getFullYear();
  }
}