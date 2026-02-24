import { Component } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: string;
  color: string;
}

interface CaseStage {
  stage: string;
  count: number;
  color: string;
  icon: string;
}

interface Complaint {
  id: string;
  subject: string;
  category: string;
  source: string;
  stage: 'assessment' | 'investigation' | 'inquiry' | 'decision' | 'closed';
  priority: 'high' | 'medium' | 'low';
  date: string;
  assignee: string;
}

interface CategoryData {
  category: string;
  count: number;
  percent: number;
  color: string;
}

interface SourceData {
  source: string;
  count: number;
  percent: number;
  color: string;
}

@Component({
  selector: 'app-complaints-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './complaints-dashboard.html',
  styleUrl: './complaints-dashboard.css'
})
export class ComplaintsDashboardComponent {

  statCards: StatCard[] = [
    { title: 'Total Complaints', value: '1,842', change: '+124', changeType: 'up',   icon: 'bi bi-chat-left-text', color: 'primary' },
    { title: 'Resolved',         value: '1,204', change: '+86',  changeType: 'up',   icon: 'bi bi-check-circle',   color: 'success' },
    { title: 'Pending',          value: '428',   change: '+38',  changeType: 'up',   icon: 'bi bi-hourglass-split', color: 'warning' },
  ];

  caseStages: CaseStage[] = [
    { stage: 'Assessment',   count: 124, color: 'primary', icon: 'bi bi-clipboard-check' },
    { stage: 'Investigation', count: 98,  color: 'info',    icon: 'bi bi-search' },
    { stage: 'Inquiry',      count: 76,  color: 'warning', icon: 'bi bi-question-circle' },
    { stage: 'Decision',     count: 54,  color: 'accent',  icon: 'bi bi-gavel' },
    { stage: 'Closed',       count: 210, color: 'success', icon: 'bi bi-lock' },
  ];

  categoryData: CategoryData[] = [
    { category: 'Service Delivery',  count: 542, percent: 29, color: 'primary' },
    { category: 'Corruption',        count: 428, percent: 23, color: 'danger' },
    { category: 'Misconduct',        count: 386, percent: 21, color: 'warning' },
    { category: 'Human Rights',      count: 312, percent: 17, color: 'accent' },
    { category: 'Other',             count: 174, percent: 10, color: 'info' },
  ];

  sourceData: SourceData[] = [
    { source: 'Public',          count: 920, percent: 50, color: 'primary' },
    { source: 'State Attorney',  count: 460, percent: 25, color: 'accent' },
    { source: 'Organization',    count: 322, percent: 17, color: 'success' },
    { source: 'Other',           count: 140, percent: 8,  color: 'warning' },
  ];

  recentComplaints: Complaint[] = [
    { id: 'CMP-001', subject: 'Delayed service at regional office',     category: 'Service Delivery', source: 'Public',         stage: 'assessment',   priority: 'high',   date: 'Feb 23, 2026', assignee: 'James O.' },
    { id: 'CMP-002', subject: 'Alleged bribery by public officer',      category: 'Corruption',       source: 'State Attorney', stage: 'investigation', priority: 'high',   date: 'Feb 22, 2026', assignee: 'Amina H.' },
    { id: 'CMP-003', subject: 'Unfair dismissal of employee',           category: 'Misconduct',       source: 'Organization',   stage: 'inquiry',      priority: 'medium', date: 'Feb 21, 2026', assignee: 'Peter N.' },
    { id: 'CMP-004', subject: 'Violation of workers rights',            category: 'Human Rights',     source: 'Public',         stage: 'decision',     priority: 'high',   date: 'Feb 20, 2026', assignee: 'Grace M.' },
    { id: 'CMP-005', subject: 'Poor waste management in district',      category: 'Service Delivery', source: 'Public',         stage: 'closed',       priority: 'low',    date: 'Feb 19, 2026', assignee: 'Hassan O.' },
    { id: 'CMP-006', subject: 'Misuse of government funds',             category: 'Corruption',       source: 'Organization',   stage: 'investigation', priority: 'high',  date: 'Feb 18, 2026', assignee: 'Sara K.' },
    { id: 'CMP-007', subject: 'Harassment by law enforcement officer',  category: 'Misconduct',       source: 'State Attorney', stage: 'inquiry',      priority: 'medium', date: 'Feb 17, 2026', assignee: 'John M.' },
  ];
}