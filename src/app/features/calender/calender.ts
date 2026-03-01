import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../core/services/toast';

type CalendarView = 'month' | 'week' | 'day' | 'agenda';

type EventCategory = 'work' | 'personal' | 'meeting' | 'holiday' | 'reminder';

interface CalendarEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  category: EventCategory;
  description: string;
  allDay: boolean;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calender.html',
  styleUrl: './calender.css',
})
export class CalenderComponent {

 toast = inject(ToastService);

  activeView = signal<CalendarView>('month');
  currentDate = signal(new Date());
  selectedDate = signal<Date | null>(null);

  showEventModal = false;
  showEventDetail = false;
  eventModalMode: 'add' | 'edit' = 'add';
  selectedEvent: CalendarEvent | null = null;

  views = [
    { key: 'month',  label: 'Month',  icon: 'bi bi-calendar3'        },
    { key: 'week',   label: 'Week',   icon: 'bi bi-calendar-week'     },
    { key: 'day',    label: 'Day',    icon: 'bi bi-calendar-day'      },
    { key: 'agenda', label: 'Agenda', icon: 'bi bi-list-ul'           },
  ];

  categories: { key: EventCategory; label: string; color: string }[] = [
    { key: 'work',     label: 'Work',     color: '#4F6EF7' },
    { key: 'personal', label: 'Personal', color: '#22c55e' },
    { key: 'meeting',  label: 'Meeting',  color: '#f59e0b' },
    { key: 'holiday',  label: 'Holiday',  color: '#ef4444' },
    { key: 'reminder', label: 'Reminder', color: '#8b5cf6' },
  ];

  eventForm: Omit<CalendarEvent, 'id'> = {
    title:       '',
    date:        '',
    startTime:   '09:00',
    endTime:     '10:00',
    category:    'work',
    description: '',
    allDay:      false,
  };

  events = signal<CalendarEvent[]>([
    { id: 1,  title: 'Team Standup',          date: this.dateStr(0),   startTime: '09:00', endTime: '09:30', category: 'meeting',  description: 'Daily team sync meeting',             allDay: false },
    { id: 2,  title: 'Project Review',         date: this.dateStr(1),   startTime: '14:00', endTime: '15:00', category: 'work',     description: 'Q4 project review with stakeholders', allDay: false },
    { id: 3,  title: 'Lunch with Client',      date: this.dateStr(1),   startTime: '12:00', endTime: '13:30', category: 'personal', description: 'Lunch at Serena Hotel',               allDay: false },
    { id: 4,  title: 'Board Meeting',          date: this.dateStr(2),   startTime: '10:00', endTime: '12:00', category: 'meeting',  description: 'Quarterly board meeting',             allDay: false },
    { id: 5,  title: 'Public Holiday',         date: this.dateStr(3),   startTime: '00:00', endTime: '23:59', category: 'holiday',  description: 'National public holiday',             allDay: true  },
    { id: 6,  title: 'Code Review',            date: this.dateStr(4),   startTime: '11:00', endTime: '12:00', category: 'work',     description: 'Review PR #142',                      allDay: false },
    { id: 7,  title: 'Doctor Appointment',     date: this.dateStr(5),   startTime: '08:30', endTime: '09:30', category: 'personal', description: 'Annual checkup',                      allDay: false },
    { id: 8,  title: 'Sprint Planning',        date: this.dateStr(7),   startTime: '09:00', endTime: '11:00', category: 'meeting',  description: 'Sprint 24 planning session',          allDay: false },
    { id: 9,  title: 'Submit Report',          date: this.dateStr(8),   startTime: '17:00', endTime: '17:30', category: 'reminder', description: 'Submit monthly report to manager',    allDay: false },
    { id: 10, title: 'Team Building',          date: this.dateStr(10),  startTime: '14:00', endTime: '18:00', category: 'work',     description: 'Outdoor team building activity',      allDay: false },
    { id: 11, title: 'Product Demo',           date: this.dateStr(12),  startTime: '15:00', endTime: '16:00', category: 'meeting',  description: 'Demo new features to client',         allDay: false },
    { id: 12, title: 'Training Session',       date: this.dateStr(14),  startTime: '10:00', endTime: '12:00', category: 'work',     description: 'Angular advanced training',           allDay: false },
    { id: 13, title: 'Birthday Party',         date: this.dateStr(15),  startTime: '18:00', endTime: '21:00', category: 'personal', description: "James's birthday celebration",        allDay: false },
    { id: 14, title: 'Pay Day Reminder',       date: this.dateStr(16),  startTime: '09:00', endTime: '09:15', category: 'reminder', description: 'Process payroll',                     allDay: false },
    { id: 15, title: 'Client Workshop',        date: this.dateStr(18),  startTime: '09:00', endTime: '13:00', category: 'meeting',  description: 'Workshop with Nairobi client',        allDay: false },
  ]);

  // ── HELPERS ──
  private dateStr(offset: number): string {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().split('T')[0];
  }

  formatDateStr(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getEventsForDate(date: Date): CalendarEvent[] {
    const str = this.formatDateStr(date);
    return this.events().filter(e => e.date === str);
  }

  getCategoryColor(cat: EventCategory): string {
    return this.categories.find(c => c.key === cat)?.color ?? '#4F6EF7';
  }

  getCategoryLabel(cat: EventCategory): string {
    return this.categories.find(c => c.key === cat)?.label ?? cat;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  // ── NAVIGATION ──
  get currentMonthLabel(): string {
    return this.currentDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  get currentWeekLabel(): string {
    const start = this.weekDays[0];
    const end   = this.weekDays[6];
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }

  get currentDayLabel(): string {
    return this.currentDate().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  }

  get headerLabel(): string {
    switch (this.activeView()) {
      case 'month':  return this.currentMonthLabel;
      case 'week':   return this.currentWeekLabel;
      case 'day':    return this.currentDayLabel;
      case 'agenda': return this.currentMonthLabel;
    }
  }

  navigate(dir: -1 | 1) {
    const d = new Date(this.currentDate());
    switch (this.activeView()) {
      case 'month':  d.setMonth(d.getMonth() + dir);   break;
      case 'week':   d.setDate(d.getDate() + dir * 7); break;
      case 'day':    d.setDate(d.getDate() + dir);     break;
      case 'agenda': d.setMonth(d.getMonth() + dir);   break;
    }
    this.currentDate.set(d);
  }

  goToday() { this.currentDate.set(new Date()); }

  // ── MONTH VIEW ──
  get calendarDays(): CalendarDay[] {
    const date  = this.currentDate();
    const year  = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay  = new Date(year, month + 1, 0);
    const startDay = new Date(firstDay);
    startDay.setDate(startDay.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const cur = new Date(startDay);

    for (let i = 0; i < 42; i++) {
      const d = new Date(cur);
      days.push({
        date:           d,
        isCurrentMonth: d.getMonth() === month,
        isToday:        this.isToday(d),
        isSelected:     this.selectedDate() ? d.toDateString() === this.selectedDate()!.toDateString() : false,
        events:         this.getEventsForDate(d),
      });
      cur.setDate(cur.getDate() + 1);
    }

    return days;
  }

  weekDayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // ── WEEK VIEW ──
  get weekDays(): Date[] {
    const d     = new Date(this.currentDate());
    const day   = d.getDay();
    const start = new Date(d);
    start.setDate(d.getDate() - day);
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      return day;
    });
  }

  get weekHours(): number[] {
    return Array.from({ length: 24 }, (_, i) => i);
  }

  formatHour(h: number): string {
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour   = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:00 ${suffix}`;
  }

  getEventsForHour(date: Date, hour: number): CalendarEvent[] {
    return this.getEventsForDate(date).filter(e => {
      const start = parseInt(e.startTime.split(':')[0]);
      return start === hour;
    });
  }

  // ── DAY VIEW ──
  get dayHours(): number[] {
    return Array.from({ length: 24 }, (_, i) => i);
  }

  getEventsForDayHour(hour: number): CalendarEvent[] {
    return this.getEventsForDate(this.currentDate()).filter(e => {
      const start = parseInt(e.startTime.split(':')[0]);
      return start === hour;
    });
  }

  getEventCountByCategory(cat: EventCategory): number {
  return this.events().filter(e => e.category === cat).length;
}

  get dayAllDayEvents(): CalendarEvent[] {
    return this.getEventsForDate(this.currentDate()).filter(e => e.allDay);
  }

  // ── AGENDA VIEW ──
  get agendaDays(): { date: Date; events: CalendarEvent[] }[] {
    const result = [];
    const start  = new Date(this.currentDate());
    start.setDate(1);
    const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();

    for (let i = 0; i < daysInMonth; i++) {
      const d      = new Date(start);
      d.setDate(i + 1);
      const events = this.getEventsForDate(d);
      if (events.length > 0) {
        result.push({ date: d, events });
      }
    }
    return result;
  }

  formatAgendaDate(date: Date): string {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' });
  }

  // ── EVENT MODAL ──
  openAddModal(date?: Date) {
    this.eventModalMode = 'add';
    this.eventForm = {
      title:       '',
      date:        date ? this.formatDateStr(date) : this.formatDateStr(new Date()),
      startTime:   '09:00',
      endTime:     '10:00',
      category:    'work',
      description: '',
      allDay:      false,
    };
    this.showEventModal  = true;
    this.showEventDetail = false;
  }

  openEditModal(event: CalendarEvent) {
    this.eventModalMode = 'edit';
    this.eventForm      = { ...event };
    this.showEventModal  = true;
    this.showEventDetail = false;
  }

  openEventDetail(event: CalendarEvent) {
    this.selectedEvent   = event;
    this.showEventDetail = true;
    this.showEventModal  = false;
  }

  saveEvent() {
    if (!this.eventForm.title || !this.eventForm.date) {
      this.toast.error('Title and date are required.');
      return;
    }

    if (this.eventModalMode === 'add') {
      const newEvent: CalendarEvent = {
        ...this.eventForm,
        id: Math.max(0, ...this.events().map(e => e.id)) + 1,
      };
      this.events.update(ev => [...ev, newEvent]);
      this.toast.success('Event added successfully!', 'Event Created');
    } else {
      this.events.update(ev =>
        ev.map(e => e.id === (this.eventForm as any).id ? { ...e, ...this.eventForm } : e)
      );
      this.toast.success('Event updated successfully!', 'Event Updated');
    }

    this.showEventModal = false;
  }

  deleteEvent(id: number) {
    this.events.update(ev => ev.filter(e => e.id !== id));
    this.showEventDetail = false;
    this.toast.warning('Event deleted.', 'Event Removed');
  }

  selectDay(day: CalendarDay) {
    this.selectedDate.set(day.date);
  }

  get totalEventsThisMonth(): number {
    const d = this.currentDate();
    return this.events().filter(e => {
      const ed = new Date(e.date);
      return ed.getMonth() === d.getMonth() && ed.getFullYear() === d.getFullYear();
    }).length;
  }
}
