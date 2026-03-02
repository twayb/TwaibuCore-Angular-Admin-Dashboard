import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { ToastService } from '../../core/services/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RichTextEditorComponent } from '../../shared/rich-text-editor/rich-text-editor';

type EmailFolder = 'inbox' | 'sent' | 'drafts' | 'trash' | 'starred';

interface Email {
  id: number;
  from: string;
  fromEmail: string;
  fromAvatar: string;
  fromColor: string;
  to: string;
  toEmail: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  time: string;
  read: boolean;
  starred: boolean;
  folder: EmailFolder;
  attachments?: { name: string; size: string; icon: string }[];
  labels?: string[];
}

interface ComposeForm {
  to: string;
  cc: string;
  subject: string;
  body: string;
  showCc: boolean;
}

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [CommonModule, FormsModule, RichTextEditorComponent],
  templateUrl: './email.html',
  styleUrl: './email.css',
})
export class EmailComponent {
  @ViewChild('attachInput') attachInput!: ElementRef;

  toast = inject(ToastService);

  activeFolder  = signal<EmailFolder>('inbox');
  selectedEmail = signal<Email | null>(null);
  searchQuery   = signal('');
  showCompose   = false;
  composeMode: 'compose' | 'reply' | 'forward' = 'compose';
  sidebarCollapsed = false;
  editorBody = '';
 

  composeForm: ComposeForm = {
    to: '', cc: '', subject: '', body: '', showCc: false
  };

  folders = [
    { key: 'inbox',   label: 'Inbox',   icon: 'bi bi-inbox',          color: '#4F6EF7' },
    { key: 'starred', label: 'Starred', icon: 'bi bi-star',            color: '#f59e0b' },
    { key: 'sent',    label: 'Sent',    icon: 'bi bi-send',            color: '#22c55e' },
    { key: 'drafts',  label: 'Drafts',  icon: 'bi bi-file-earmark',    color: '#8b5cf6' },
    { key: 'trash',   label: 'Trash',   icon: 'bi bi-trash',           color: '#ef4444' },
  ];

  labels = [
    { label: 'Work',     color: '#4F6EF7' },
    { label: 'Personal', color: '#22c55e' },
    { label: 'Finance',  color: '#f59e0b' },
    { label: 'Urgent',   color: '#ef4444' },
  ];

  emails = signal<Email[]>([
    {
      id: 1, from: 'Amina Hassan', fromEmail: 'amina@twaibu.com', fromAvatar: 'AH', fromColor: '#4F6EF7',
      to: 'James Okafor', toEmail: 'james@twaibu.com', subject: 'Q4 Dashboard Review - Action Required',
      preview: 'Hi James, I wanted to follow up on the Q4 dashboard review we discussed last week...',
      body: `Hi James,\n\nI wanted to follow up on the Q4 dashboard review we discussed last week. The design team has completed their analysis and we need your input on a few key decisions before we can proceed.\n\nSpecifically, we need to finalize:\n1. The KPI metrics to display on the admin dashboard\n2. Chart types for the recruitment module\n3. Color scheme for the transportation dashboard\n\nCan we schedule a call this week? I'm available Thursday and Friday afternoon.\n\nBest regards,\nAmina`,
      date: 'Today', time: '10:23 AM', read: false, starred: true, folder: 'inbox',
      attachments: [{ name: 'Q4_Review.pdf', size: '2.4 MB', icon: 'bi bi-file-earmark-pdf' }],
      labels: ['Work', 'Urgent']
    },
    {
      id: 2, from: 'David Kimani', fromEmail: 'david@company.com', fromAvatar: 'DK', fromColor: '#22c55e',
      to: 'James Okafor', toEmail: 'james@twaibu.com', subject: 'New Feature Request - Map Integration',
      preview: 'Hello, we would like to request a new feature for the map page that allows users to...',
      body: `Hello James,\n\nWe would like to request a new feature for the map page that allows users to filter locations by country and view detailed statistics for each branch.\n\nThe feature should include:\n- Country filter dropdown\n- Statistics panel on hover\n- Export to PDF functionality\n\nPlease let us know if this is feasible within the current sprint.\n\nThanks,\nDavid`,
      date: 'Today', time: '09:15 AM', read: false, starred: false, folder: 'inbox',
      labels: ['Work']
    },
    {
      id: 3, from: 'Sarah Mwangi', fromEmail: 'sarah@gmail.com', fromAvatar: 'SM', fromColor: '#8b5cf6',
      to: 'James Okafor', toEmail: 'james@twaibu.com', subject: 'Weekend Plans 🎉',
      preview: 'Hey! Are you coming to the team building event this Saturday? It starts at 2pm at...',
      body: `Hey James!\n\nAre you coming to the team building event this Saturday? It starts at 2pm at the Slipway Hotel in Masaki. We have some really fun activities planned including:\n\n- Beach volleyball\n- Team quiz competition\n- BBQ dinner\n\nPlease RSVP by Thursday so we can finalize catering numbers.\n\nCan't wait to see you there!\n\nSarah 🎊`,
      date: 'Yesterday', time: '06:45 PM', read: true, starred: false, folder: 'inbox',
      labels: ['Personal']
    },
    {
      id: 4, from: 'Bank of Tanzania', fromEmail: 'noreply@bot.go.tz', fromAvatar: 'BT', fromColor: '#ef4444',
      to: 'James Okafor', toEmail: 'james@twaibu.com', subject: 'Your Monthly Statement - November 2025',
      preview: 'Dear Customer, Your monthly account statement for November 2025 is now available...',
      body: `Dear Customer,\n\nYour monthly account statement for November 2025 is now available for download.\n\nAccount Summary:\n- Opening Balance: TZS 4,500,000\n- Total Credits: TZS 8,200,000\n- Total Debits: TZS 6,100,000\n- Closing Balance: TZS 6,600,000\n\nPlease log in to your online banking portal to view detailed transactions.\n\nThank you for banking with us.\n\nBank of Tanzania`,
      date: 'Mon', time: '08:00 AM', read: true, starred: true, folder: 'inbox',
      attachments: [{ name: 'Statement_Nov2025.pdf', size: '1.1 MB', icon: 'bi bi-file-earmark-pdf' }],
      labels: ['Finance']
    },
    {
      id: 5, from: 'GitHub', fromEmail: 'noreply@github.com', fromAvatar: 'GH', fromColor: '#1e293b',
      to: 'James Okafor', toEmail: 'james@twaibu.com', subject: '[TwaibuCore] PR #143 merged by Amina Hassan',
      preview: 'Pull request #143 "feat: add sticky table headers" has been merged into main...',
      body: `Pull request #143 "feat: add sticky table headers" has been successfully merged into main by Amina Hassan.\n\nChanges:\n- Added sticky header to tables page\n- Fixed overflow issues on mobile\n- Updated table CSS classes\n\nView the merged PR: https://github.com/twaibu/core/pull/143`,
      date: 'Mon', time: '02:30 PM', read: true, starred: false, folder: 'inbox',
      labels: ['Work']
    },
    {
      id: 6, from: 'James Okafor', fromEmail: 'james@twaibu.com', fromAvatar: 'JO', fromColor: '#4F6EF7',
      to: 'Amina Hassan', toEmail: 'amina@twaibu.com', subject: 'Re: Q4 Dashboard Review - Action Required',
      preview: 'Hi Amina, Thanks for the follow-up. I have reviewed the requirements and here are my thoughts...',
      body: `Hi Amina,\n\nThanks for the follow-up. I have reviewed the requirements and here are my thoughts:\n\n1. For KPI metrics, I suggest we include: Total Revenue, Active Users, Tasks Completed, and System Uptime\n2. For charts, bar charts work best for recruitment data\n3. I'll defer to the design team on colors\n\nThursday at 3pm works for me. Let's set up a Google Meet.\n\nBest,\nJames`,
      date: 'Today', time: '11:00 AM', read: true, starred: false, folder: 'sent',
    },
    {
      id: 7, from: 'James Okafor', fromEmail: 'james@twaibu.com', fromAvatar: 'JO', fromColor: '#4F6EF7',
      to: 'David Kimani', toEmail: 'david@company.com', subject: 'Re: New Feature Request - Map Integration',
      preview: 'Hi David, Thanks for the detailed feature request. I have reviewed it with the team...',
      body: `Hi David,\n\nThanks for the detailed feature request. I have reviewed it with the team and we can include the country filter and statistics panel in the next sprint.\n\nHowever, the PDF export will need to be pushed to the following sprint due to time constraints.\n\nI'll create the tickets and assign them today.\n\nRegards,\nJames`,
      date: 'Today', time: '09:45 AM', read: true, starred: false, folder: 'sent',
    },
    {
      id: 8, from: 'James Okafor', fromEmail: 'james@twaibu.com', fromAvatar: 'JO', fromColor: '#4F6EF7',
      to: 'HR Department', toEmail: 'hr@twaibu.com', subject: 'Leave Application - Draft',
      preview: 'Dear HR Team, I would like to apply for annual leave from December 20th to January 3rd...',
      body: `Dear HR Team,\n\nI would like to apply for annual leave from December 20th to January 3rd.\n\nDuration: 10 working days\nReason: End of year family vacation\n\nI have ensured all pending tasks will be completed before my departure.\n\nKindly approve at your earliest convenience.\n\nRegards,\nJames`,
      date: 'Sun', time: '08:30 PM', read: true, starred: false, folder: 'drafts',
    },
    {
      id: 9, from: 'LinkedIn', fromEmail: 'noreply@linkedin.com', fromAvatar: 'LI', fromColor: '#0077b5',
      to: 'James Okafor', toEmail: 'james@twaibu.com', subject: '5 new job opportunities for you',
      preview: 'Based on your profile, here are 5 jobs that match your experience...',
      body: `Based on your profile, here are 5 jobs that match your experience:\n\n1. Senior Angular Developer - Safaricom, Nairobi\n2. Full Stack Engineer - Andela, Remote\n3. Tech Lead - MTN, Lagos\n4. Software Architect - Equity Bank, Nairobi\n5. Frontend Developer - Cellulant, Dar es Salaam\n\nView all opportunities on LinkedIn.`,
      date: 'Sun', time: '10:00 AM', read: true, starred: false, folder: 'trash',
    },
    {
      id: 10, from: 'Newsletter', fromEmail: 'news@techdigest.com', fromAvatar: 'ND', fromColor: '#06b6d4',
      to: 'James Okafor', toEmail: 'james@twaibu.com', subject: 'This week in Tech: AI, Angular 20, and more',
      preview: 'Welcome to this week\'s tech digest. Top stories: Angular 20 released with new signal...',
      body: `Welcome to this week's tech digest.\n\nTop stories this week:\n\n🚀 Angular 20 released with enhanced signals API\n🤖 OpenAI announces GPT-5 with 1M context window\n💻 GitHub Copilot gets multi-file editing support\n📱 Apple announces foldable iPhone for 2026\n\nRead full articles on our website.`,
      date: 'Sat', time: '07:00 AM', read: true, starred: false, folder: 'trash',
    },
  ]);
  emailAttachments: File[]= [];

  // ── COMPUTED ──
  get filteredEmails(): Email[] {
    const folder = this.activeFolder();
    const query  = this.searchQuery().toLowerCase();

    let list = folder === 'starred'
      ? this.emails().filter(e => e.starred && e.folder !== 'trash')
      : this.emails().filter(e => e.folder === folder);

    if (query) {
      list = list.filter(e =>
        e.subject.toLowerCase().includes(query) ||
        e.from.toLowerCase().includes(query) ||
        e.preview.toLowerCase().includes(query)
      );
    }

    return list;
  }

  // ── HELPER METHODS FOR TEMPLATE ──
getFolderLabel(): string {
  return this.folders.find(f => f.key === this.activeFolder())?.label ?? '';
}

getLabelColor(labelName: string): string {
  return this.labels.find(l => l.label === labelName)?.color ?? '#4F6EF7';
}

getLabelBg(labelName: string): string {
  return (this.labels.find(l => l.label === labelName)?.color ?? '#4F6EF7') + '20';
}

  getUnreadCount(folder: EmailFolder): number {
    if (folder === 'starred') return 0;
    return this.emails().filter(e => e.folder === folder && !e.read).length;
  }

  get totalUnread(): number {
    return this.emails().filter(e => e.folder === 'inbox' && !e.read).length;
  }

  // ── ACTIONS ──
  selectEmail(email: Email) {
    this.selectedEmail.set(email);
    if (!email.read) {
      this.emails.update(list =>
        list.map(e => e.id === email.id ? { ...e, read: true } : e)
      );
    }
  }

  toggleStar(email: Email, event?: Event) {
    event?.stopPropagation();
    this.emails.update(list =>
      list.map(e => e.id === email.id ? { ...e, starred: !e.starred } : e)
    );
    const updated = this.emails().find(e => e.id === email.id);
    this.toast.info(updated?.starred ? 'Email starred' : 'Star removed');
  }

  deleteEmail(email: Email, event?: Event) {
    event?.stopPropagation();
    if (email.folder === 'trash') {
      this.emails.update(list => list.filter(e => e.id !== email.id));
      this.toast.warning('Email permanently deleted');
    } else {
      this.emails.update(list =>
        list.map(e => e.id === email.id ? { ...e, folder: 'trash' } : e)
      );
      this.toast.info('Email moved to trash');
    }
    if (this.selectedEmail()?.id === email.id) this.selectedEmail.set(null);
  }

  markRead(email: Email, event?: Event) {
    event?.stopPropagation();
    this.emails.update(list =>
      list.map(e => e.id === email.id ? { ...e, read: !e.read } : e)
    );
  }

  restoreEmail(email: Email) {
    this.emails.update(list =>
      list.map(e => e.id === email.id ? { ...e, folder: 'inbox' } : e)
    );
    this.toast.success('Email restored to inbox');
    this.selectedEmail.set(null);
  }

  // ── COMPOSE ──
  openCompose() {
    this.composeMode  = 'compose';
    this.composeForm  = { to: '', cc: '', subject: '', body: '', showCc: false };
    this.showCompose  = true;
  }

  replyEmail(email: Email) {
    this.composeMode  = 'reply';
    this.composeForm  = {
      to:      email.fromEmail,
      cc:      '',
      subject: `Re: ${email.subject}`,
      body:    `\n\n--- Original Message ---\nFrom: ${email.from}\n\n${email.body}`,
      showCc:  false,
    };
    this.showCompose = true;
  }

  forwardEmail(email: Email) {
    this.composeMode  = 'forward';
    this.composeForm  = {
      to:      '',
      cc:      '',
      subject: `Fwd: ${email.subject}`,
      body:    `\n\n--- Forwarded Message ---\nFrom: ${email.from}\n\n${email.body}`,
      showCc:  false,
    };
    this.showCompose = true;
  }

  sendEmail() {
    if (!this.composeForm.to || !this.composeForm.subject) {
      this.toast.error('To and Subject are required.');
      return;
    }

    const newEmail: Email = {
      id:          Math.max(...this.emails().map(e => e.id)) + 1,
      from:        'James Okafor',
      fromEmail:   'james@twaibu.com',
      fromAvatar:  'JO',
      fromColor:   '#4F6EF7',
      to:          this.composeForm.to,
      toEmail:     this.composeForm.to,
      subject:     this.composeForm.subject,
      preview:     this.composeForm.body.substring(0, 80) + '...',
      body:        this.composeForm.body,
      date:        'Just now',
      time:        new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read:        true,
      starred:     false,
      folder:      'sent',
    };

    this.emails.update(list => [newEmail, ...list]);
    this.showCompose = false;
    this.toast.success('Email sent successfully!', 'Sent');
  }

  saveDraft() {
    const draft: Email = {
      id:         Math.max(...this.emails().map(e => e.id)) + 1,
      from:       'James Okafor',
      fromEmail:  'james@twaibu.com',
      fromAvatar: 'JO',
      fromColor:  '#4F6EF7',
      to:         this.composeForm.to,
      toEmail:    this.composeForm.to,
      subject:    this.composeForm.subject || '(No Subject)',
      preview:    this.composeForm.body.substring(0, 80),
      body:       this.composeForm.body,
      date:       'Just now',
      time:       new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      read:       true,
      starred:    false,
      folder:     'drafts',
    };

    this.emails.update(list => [draft, ...list]);
    this.showCompose = false;
    this.toast.info('Draft saved.');
  }

  setFolder(folder: EmailFolder) {
    this.activeFolder.set(folder);
    this.selectedEmail.set(null);
    this.searchQuery.set('');
  }

  formatBody(body: string): string {
    return body.replace(/\n/g, '<br>');
  }

  triggerAttachment() {
  this.attachInput.nativeElement.click();
}

onFooterAttach(event: Event) {
  const input = event.target as HTMLInputElement;
  const file  = input.files?.[0];
  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {
    this.toast.error('File size must be less than 10MB');
    return;
  }

  this.emailAttachments = [...this.emailAttachments, file];
  input.value = '';
}

removeAttachment(file: File) {
  this.emailAttachments = this.emailAttachments.filter(f => f !== file);
}

}
