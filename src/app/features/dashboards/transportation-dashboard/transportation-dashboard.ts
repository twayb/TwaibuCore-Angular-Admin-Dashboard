import { Component } from '@angular/core';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'up' | 'down';
  icon: string;
  color: string;
}

interface Vehicle {
  id: string;
  plate: string;
  type: string;
  driver: string;
  status: 'active' | 'idle' | 'maintenance';
  route: string;
  fuel: number;
}

interface Driver {
  name: string;
  id: string;
  vehicle: string;
  status: 'on-duty' | 'off-duty' | 'on-leave';
  trips: number;
  rating: number;
}

interface Trip {
  id: string;
  driver: string;
  from: string;
  to: string;
  status: 'in-progress' | 'completed' | 'delayed';
  departure: string;
  eta: string;
}

interface Maintenance {
  vehicle: string;
  plate: string;
  type: string;
  date: string;
  status: 'scheduled' | 'overdue' | 'completed';
  cost: string;
}

@Component({
  selector: 'app-transportation-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './transportation-dashboard.html',
  styleUrl: './transportation-dashboard.css'
})
export class TransportationDashboardComponent {

  statCards: StatCard[] = [
    { title: 'Total Vehicles',   value: '48',   change: '+2',    changeType: 'up',   icon: 'bi bi-truck',         color: 'primary' },
    { title: 'Active Routes',    value: '12',   change: '+3',    changeType: 'up',   icon: 'bi bi-signpost-split', color: 'success' },
    { title: 'Drivers On Duty',  value: '31',   change: '-2',    changeType: 'down', icon: 'bi bi-person-badge',  color: 'warning' },
  ];

  vehicleStatusData = [
    { status: 'Active',      count: 28, color: 'success',  percent: 58 },
    { status: 'Idle',        count: 12, color: 'warning',  percent: 25 },
    { status: 'Maintenance', count: 8,  color: 'danger',   percent: 17 },
  ];

  routeData = [
    { route: 'Dar es Salaam → Dodoma', trips: 24, status: 'active',  distance: '454 km' },
    { route: 'Dodoma → Arusha',        trips: 18, status: 'active',  distance: '332 km' },
    { route: 'Mwanza → Dar es Salaam', trips: 15, status: 'active',  distance: '1142 km' },
    { route: 'Arusha → Moshi',         trips: 12, status: 'active',  distance: '82 km' },
    { route: 'Dodoma → Morogoro',      trips: 9,  status: 'delayed', distance: '262 km' },
    { route: 'Dodoma → Tanga',      trips: 7,  status: 'delayed', distance: '362 km' },
  ];

  vehicles: Vehicle[] = [
    { id: 'V001', plate: 'T 123 ABC', type: 'Bus',    driver: 'James Okafor',  status: 'active',      route: 'Dar → Dodoma',  fuel: 75 },
    { id: 'V002', plate: 'T 456 DEF', type: 'Truck',  driver: 'Amina Hassan',  status: 'active',      route: 'Dodoma → Arusha', fuel: 60 },
    { id: 'V003', plate: 'T 789 GHI', type: 'Van',    driver: 'Peter Njoroge', status: 'idle',        route: '—',             fuel: 90 },
    { id: 'V004', plate: 'T 321 JKL', type: 'Bus',    driver: 'Grace Mwamba',  status: 'maintenance', route: '—',             fuel: 30 },
    { id: 'V005', plate: 'T 654 MNO', type: 'Truck',  driver: 'Hassan Omar',   status: 'active',      route: 'Mwanza → Dar',  fuel: 55 },
  ];

  drivers: Driver[] = [
    { name: 'James Okafor',  id: 'D001', vehicle: 'T 123 ABC', status: 'on-duty',  trips: 142, rating: 4.8 },
    { name: 'Amina Hassan',  id: 'D002', vehicle: 'T 456 DEF', status: 'on-duty',  trips: 98,  rating: 4.6 },
    { name: 'Peter Njoroge', id: 'D003', vehicle: 'T 789 GHI', status: 'off-duty', trips: 210, rating: 4.9 },
    { name: 'Grace Mwamba',  id: 'D004', vehicle: '—',         status: 'on-leave', trips: 76,  rating: 4.5 },
    { name: 'Hassan Omar',   id: 'D005', vehicle: 'T 654 MNO', status: 'on-duty',  trips: 185, rating: 4.7 },
  ];

  activeTrips: Trip[] = [
    { id: 'TR001', driver: 'James Okafor',  from: 'Dar es Salaam', to: 'Dodoma',       status: 'in-progress', departure: '08:00 AM', eta: '02:00 PM' },
    { id: 'TR002', driver: 'Amina Hassan',  from: 'Dodoma',        to: 'Arusha',       status: 'in-progress', departure: '09:30 AM', eta: '03:30 PM' },
    { id: 'TR003', driver: 'Hassan Omar',   from: 'Mwanza',        to: 'Dar es Salaam', status: 'delayed',    departure: '06:00 AM', eta: '08:00 PM' },
    { id: 'TR004', driver: 'Sara Kimani',   from: 'Arusha',        to: 'Moshi',        status: 'completed',   departure: '07:00 AM', eta: '08:30 AM' },
  ];

  maintenance: Maintenance[] = [
    { vehicle: 'Bus V004',   plate: 'T 321 JKL', type: 'Engine Overhaul',  date: 'Feb 23, 2026', status: 'scheduled', cost: 'TZS 850,000' },
    { vehicle: 'Truck V007', plate: 'T 987 PQR', type: 'Tire Replacement', date: 'Feb 20, 2026', status: 'overdue',   cost: 'TZS 320,000' },
    { vehicle: 'Van V003',   plate: 'T 789 GHI', type: 'Oil Change',       date: 'Feb 25, 2026', status: 'scheduled', cost: 'TZS 120,000' },
    { vehicle: 'Bus V001',   plate: 'T 123 ABC', type: 'Brake Service',    date: 'Feb 18, 2026', status: 'completed', cost: 'TZS 450,000' },
  ];

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
}