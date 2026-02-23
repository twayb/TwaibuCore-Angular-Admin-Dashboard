import { Component } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: string;
  color: string;
}

interface JobOpening {
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  status: 'open' | 'closed' | 'paused';
}

interface Interview {
  candidate: string;
  position: string;
  date: string;
  time: string;
  type: 'onsite' | 'remote' | 'phone';
  interviewer: string;
}

interface Application {
  candidate: string;
  position: string;
  applied: string;
  stage: 'applied' | 'screening' | 'interview' | 'offer' | 'hired';
  source: string;
}

@Component({
  selector: 'app-recruitment-dashboard',
  imports: [],
  templateUrl: './recruitment-dashboard.html',
  styleUrl: './recruitment-dashboard.css',
})
export class RecruitmentDashboardComponent {

   statCards: StatCard[] = [
    { title: 'Total Applications', value: '1,284',  change: '+18.3%', changeType: 'up',   icon: 'bi bi-file-earmark-person', color: 'primary' },
    { title: 'Open Positions',     value: '34',     change: '+4',     changeType: 'up',   icon: 'bi bi-briefcase',           color: 'accent' },
    { title: 'Hired This Month',   value: '12',     change: '+3',     changeType: 'up',   icon: 'bi bi-person-check',        color: 'success' },
    { title: 'Interviews Scheduled', value: '28',   change: '-2',     changeType: 'down', icon: 'bi bi-calendar-check',      color: 'warning' },
  ];

  pipelineStages = [
    { stage: 'Applied',    count: 1284, color: 'primary',  percent: 100 },
    { stage: 'Shortlisted',  count: 540,  color: 'accent',   percent: 42 },
    { stage: 'Interview',  count: 210,  color: 'warning',  percent: 16 },
    { stage: 'Offer',      count: 45,   color: 'info',     percent: 4 },
    { stage: 'Hired',      count: 40,   color: 'success',  percent: 1 },
  ];

  applicationTrends = [70, 45, 90, 110, 70, 620, 340];
  months = ['2020','2021','2022','2023','2024','2025','2026'];

  jobOpenings: JobOpening[] = [
    { title: 'Civil Engineer',  department: 'Engineering',  location: 'Dar es Salaam', type: 'Full-time', applicants: 45,  status: 'open' },
    { title: 'HR Manager',               department: 'Human Resources', location: 'Mwanza',      type: 'Full-time', applicants: 32,  status: 'open' },
    { title: 'System Analyst',              department: 'ITs',        location: 'Dodoma',       type: 'Contract',  applicants: 28,  status: 'open' },
    { title: 'Accounts',          department: 'Finance',       location: 'Dodoma',        type: 'Full-time', applicants: 19,  status: 'paused' },
    { title: 'Software Engineer',    department: 'IT',            location: 'Dar es Salaam', type: 'Part-time', applicants: 14,  status: 'open' },
  ];

  upcomingInterviews: Interview[] = [
    { candidate: 'James Okafor',   position: 'Senior Angular Developer', date: 'Feb 23, 2026', time: '10:00 AM', type: 'remote',  interviewer: 'Twaibu S.' },
    { candidate: 'Amina Hassan',   position: 'HR Manager',               date: 'Feb 23, 2026', time: '02:00 PM', type: 'onsite',  interviewer: 'Jane M.' },
    { candidate: 'Peter Njoroge',  position: 'UX Designer',              date: 'Feb 24, 2026', time: '11:00 AM', type: 'remote',  interviewer: 'Ali H.' },
    { candidate: 'Grace Mwamba',   position: 'Finance Analyst',          date: 'Feb 25, 2026', time: '09:30 AM', type: 'phone',   interviewer: 'Sara K.' },
  ];

  recentApplications: Application[] = [
    { candidate: 'John Mutua',    position: 'Senior Angular Developer', applied: '2 hrs ago',  stage: 'applied',    source: 'LinkedIn' },
    { candidate: 'Fatma Said',    position: 'HR Manager',               applied: '5 hrs ago',  stage: 'screening',  source: 'Website' },
    { candidate: 'David Otieno',  position: 'UX Designer',              applied: '1 day ago',  stage: 'interview',  source: 'Referral' },
    { candidate: 'Lucy Wanjiku',  position: 'IT Support Specialist',    applied: '2 days ago', stage: 'offer',      source: 'Indeed' },
    { candidate: 'Hassan Omar',   position: 'Finance Analyst',          applied: '3 days ago', stage: 'hired',      source: 'LinkedIn' },
  ];


}
