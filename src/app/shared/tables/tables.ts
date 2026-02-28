import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  name: string;
  avatar: string;
  avatarColor: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended';
  salary: number;
  joined: string;
  country: string;
  selected?: boolean;
}

interface TableNav {
  label: string;
  icon: string;
  key: string;
}

@Component({
  selector: 'app-tables',
  imports: [CommonModule, FormsModule],
  templateUrl: './tables.html',
  styleUrl: './tables.css',
})
export class TablesComponent {
   activeTable = 'basic';

  tableNavItems: TableNav[] = [
    { label: 'Basic Table',         icon: 'bi bi-table',              key: 'basic' },
    { label: 'With Filter',         icon: 'bi bi-funnel',             key: 'filter' },
    { label: 'Sort & Paginate',     icon: 'bi bi-sort-down',          key: 'sortpage' },
    { label: 'Avatar & Badges',     icon: 'bi bi-person-badge',       key: 'avatarbadge' },
    { label: 'Row Selection',       icon: 'bi bi-check-square',       key: 'selection' },
    { label: 'Sticky Columns',      icon: 'bi bi-layout-three-columns', key: 'sticky' },
    { label: 'Sticky Header',       icon: 'bi bi-pin-angle',          key: 'stickyheader' },
  ];

  // ── MOCK DATA ──
  employees: Employee[] = [
    { id: 1,  name: 'James Okafor',   avatar: 'JO', avatarColor: '#4F6EF7', email: 'james@twaibu.com',   role: 'Lead Developer',   department: 'Engineering',  status: 'Active',    salary: 4500000, joined: 'Jan 12, 2023', country: 'Tanzania'     },
    { id: 2,  name: 'Amina Hassan',   avatar: 'AH', avatarColor: '#22c55e', email: 'amina@twaibu.com',   role: 'UI/UX Designer',   department: 'Design',       status: 'Active',    salary: 3800000, joined: 'Mar 5, 2023',  country: 'Kenya'        },
    { id: 3,  name: 'Peter Njoroge',  avatar: 'PN', avatarColor: '#06b6d4', email: 'peter@twaibu.com',   role: 'Project Manager',  department: 'Management',   status: 'Inactive',  salary: 5200000, joined: 'Feb 18, 2022', country: 'Uganda'       },
    { id: 4,  name: 'Grace Mwamba',   avatar: 'GM', avatarColor: '#f59e0b', email: 'grace@twaibu.com',   role: 'Data Analyst',     department: 'Analytics',    status: 'Active',    salary: 3200000, joined: 'Jul 22, 2023', country: 'Zambia'       },
    { id: 5,  name: 'Hassan Omar',    avatar: 'HO', avatarColor: '#8b5cf6', email: 'hassan@twaibu.com',  role: 'Backend Dev',      department: 'Engineering',  status: 'Pending',   salary: 4100000, joined: 'Sep 3, 2023',  country: 'Tanzania'     },
    { id: 6,  name: 'Sarah Kimani',   avatar: 'SK', avatarColor: '#ef4444', email: 'sarah@twaibu.com',   role: 'QA Engineer',      department: 'Engineering',  status: 'Active',    salary: 3500000, joined: 'Nov 14, 2022', country: 'Kenya'        },
    { id: 7,  name: 'David Mutua',    avatar: 'DM', avatarColor: '#14b8a6', email: 'david@twaibu.com',   role: 'DevOps Engineer',  department: 'Engineering',  status: 'Active',    salary: 4800000, joined: 'Apr 7, 2023',  country: 'Tanzania'     },
    { id: 8,  name: 'Fatuma Ali',     avatar: 'FA', avatarColor: '#f97316', email: 'fatuma@twaibu.com',  role: 'HR Manager',       department: 'HR',           status: 'Suspended', salary: 3900000, joined: 'Jun 19, 2022', country: 'Tanzania'     },
    { id: 9,  name: 'John Kamau',     avatar: 'JK', avatarColor: '#ec4899', email: 'john@twaibu.com',    role: 'Sales Manager',    department: 'Sales',        status: 'Active',    salary: 4200000, joined: 'Aug 30, 2023', country: 'Kenya'        },
    { id: 10, name: 'Zara Ahmed',     avatar: 'ZA', avatarColor: '#6366f1', email: 'zara@twaibu.com',    role: 'Finance Officer',  department: 'Finance',      status: 'Inactive',  salary: 3600000, joined: 'Dec 1, 2022',  country: 'Ethiopia'     },
    { id: 11, name: 'Moses Banda',    avatar: 'MB', avatarColor: '#84cc16', email: 'moses@twaibu.com',   role: 'Network Admin',    department: 'IT',           status: 'Active',    salary: 3300000, joined: 'Feb 14, 2023', country: 'Malawi'       },
    { id: 12, name: 'Lucia Ferreira', avatar: 'LF', avatarColor: '#f43f5e', email: 'lucia@twaibu.com',   role: 'Marketing Lead',   department: 'Marketing',    status: 'Pending',   salary: 4000000, joined: 'May 28, 2023', country: 'Mozambique'   },
  ];

  // ── FILTER TABLE ──
  filterQuery = '';
  filterDepartment = '';
  filterStatus = '';

  get departments(): string[] {
    return [...new Set(this.employees.map(e => e.department))];
  }

  get filteredEmployees(): Employee[] {
    return this.employees.filter(e => {
      const matchQuery = !this.filterQuery ||
        e.name.toLowerCase().includes(this.filterQuery.toLowerCase()) ||
        e.email.toLowerCase().includes(this.filterQuery.toLowerCase()) ||
        e.role.toLowerCase().includes(this.filterQuery.toLowerCase());
      const matchDept = !this.filterDepartment || e.department === this.filterDepartment;
      const matchStatus = !this.filterStatus || e.status === this.filterStatus;
      return matchQuery && matchDept && matchStatus;
    });
  }

  clearFilters() {
    this.filterQuery = '';
    this.filterDepartment = '';
    this.filterStatus = '';
  }

  // ── SORT & PAGINATE ──
  sortField: keyof Employee = 'name';
  sortDir: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 5;

  sortBy(field: keyof Employee) {
    if (this.sortField === field) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDir = 'asc';
    }
    this.currentPage = 1;
  }

  get sortedEmployees(): Employee[] {
    return [...this.employees].sort((a, b) => {
      const av = a[this.sortField];
      const bv = b[this.sortField];
      if (av === undefined || bv === undefined) return 0;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return this.sortDir === 'asc' ? cmp : -cmp;
    });
  }

  get pagedEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.sortedEmployees.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.employees.length / this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }

  getSortIcon(field: keyof Employee): string {
    if (this.sortField !== field) return 'bi bi-arrow-down-up text-[var(--color-muted)] opacity-30';
    return this.sortDir === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
  }

  formatSalary(val: number): string {
    return 'TZS ' + val.toLocaleString();
  }

  // ── ROW SELECTION ──
  get allSelected(): boolean {
    return this.employees.every(e => e.selected);
  }

  get someSelected(): boolean {
    return this.employees.some(e => e.selected) && !this.allSelected;
  }

  get selectedCount(): number {
    return this.employees.filter(e => e.selected).length;
  }

  toggleAll() {
    const val = !this.allSelected;
    this.employees.forEach(e => e.selected = val);
  }

  toggleRow(emp: Employee) {
    emp.selected = !emp.selected;
  }

  deleteSelected() {
    this.employees = this.employees.filter(e => !e.selected);
  }

  // ── STATUS BADGE ──
  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      Active: 'tbl-badge-success',
      Inactive: 'tbl-badge-default',
      Pending: 'tbl-badge-warning',
      Suspended: 'tbl-badge-danger',
    };
    return 'tbl-badge ' + (map[status] || 'tbl-badge-default');
  }

  getDeptClass(dept: string): string {
    const map: Record<string, string> = {
      Engineering: 'tbl-badge-primary',
      Design: 'tbl-badge-info',
      Management: 'tbl-badge-dark',
      Analytics: 'tbl-badge-warning',
      HR: 'tbl-badge-success',
      Sales: 'tbl-badge-danger',
      Finance: 'tbl-badge-default',
      IT: 'tbl-badge-primary',
      Marketing: 'tbl-badge-info',
    };
    return 'tbl-badge ' + (map[dept] || 'tbl-badge-default');
  }

}
