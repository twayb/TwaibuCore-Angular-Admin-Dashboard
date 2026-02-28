import { Component, OnDestroy, AfterViewInit, signal, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, TitleCasePipe, isPlatformBrowser } from '@angular/common';
import type * as LeafletType from 'leaflet';

interface Branch {
  id: number;
  name: string;
  type: 'headquarters' | 'branch' | 'warehouse' | 'service';
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  employees: number;
  status: 'open' | 'closed' | 'coming-soon';
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class MapComponent implements AfterViewInit, OnDestroy {

  private platformId = inject(PLATFORM_ID);
  private L!: typeof LeafletType;
  private map!: LeafletType.Map;
  private markers: LeafletType.Marker[] = [];

  selectedBranch = signal<Branch | null>(null);
  activeFilter = signal<string>('all');

  branches: Branch[] = [
    { id: 1,  name: 'Twaibu HQ',           type: 'headquarters', address: 'Msasani Peninsula, Plot 45', city: 'Dar es Salaam', country: 'Tanzania', phone: '+255 22 123 4567', email: 'hq@twaibu.com',        employees: 120, status: 'open',        lat: -6.7924,  lng: 39.2083 },
    { id: 2,  name: 'Arusha Branch',        type: 'branch',       address: 'Sokoine Road, Suite 12',    city: 'Arusha',        country: 'Tanzania', phone: '+255 27 234 5678', email: 'arusha@twaibu.com',    employees: 35,  status: 'open',        lat: -3.3869,  lng: 36.6830 },
    { id: 3,  name: 'Mwanza Office',        type: 'branch',       address: 'Kenyatta Road, Block B',    city: 'Mwanza',        country: 'Tanzania', phone: '+255 28 345 6789', email: 'mwanza@twaibu.com',    employees: 28,  status: 'open',        lat: -2.5164,  lng: 32.9175 },
    { id: 4,  name: 'Dodoma Branch',        type: 'branch',       address: 'Jakaya Kikwete Road',       city: 'Dodoma',        country: 'Tanzania', phone: '+255 26 456 7890', email: 'dodoma@twaibu.com',    employees: 22,  status: 'open',        lat: -6.1630,  lng: 35.7516 },
    { id: 5,  name: 'Zanzibar Office',      type: 'branch',       address: 'Stone Town, Hurumzi St',    city: 'Zanzibar',      country: 'Tanzania', phone: '+255 24 567 8901', email: 'znz@twaibu.com',       employees: 18,  status: 'open',        lat: -6.1659,  lng: 39.1989 },
    { id: 6,  name: 'Nairobi Branch',       type: 'branch',       address: 'Westlands, Waiyaki Way',    city: 'Nairobi',       country: 'Kenya',    phone: '+254 20 678 9012', email: 'nairobi@twaibu.com',   employees: 45,  status: 'open',        lat: -1.2921,  lng: 36.8219 },
    { id: 7,  name: 'Mombasa Office',       type: 'branch',       address: 'Nyali Bridge Road',         city: 'Mombasa',       country: 'Kenya',    phone: '+254 41 789 0123', email: 'mombasa@twaibu.com',   employees: 20,  status: 'open',        lat: -4.0435,  lng: 39.6682 },
    { id: 8,  name: 'Kampala Branch',       type: 'branch',       address: 'Kololo Hill Drive',         city: 'Kampala',       country: 'Uganda',   phone: '+256 41 890 1234', email: 'kampala@twaibu.com',   employees: 30,  status: 'open',        lat: 0.3476,   lng: 32.5825 },
    { id: 9,  name: 'Kigali Office',        type: 'branch',       address: 'KG 9 Ave, Kicukiro',        city: 'Kigali',        country: 'Rwanda',   phone: '+250 78 901 2345', email: 'kigali@twaibu.com',    employees: 15,  status: 'open',        lat: -1.9441,  lng: 30.0619 },
    { id: 10, name: 'Dar Warehouse',        type: 'warehouse',    address: 'Ubungo Industrial Area',    city: 'Dar es Salaam', country: 'Tanzania', phone: '+255 22 012 3456', email: 'warehouse@twaibu.com', employees: 40,  status: 'open',        lat: -6.8010,  lng: 39.1956 },
    { id: 11, name: 'Mombasa Warehouse',    type: 'warehouse',    address: 'Kilindini Port Area',       city: 'Mombasa',       country: 'Kenya',    phone: '+254 41 123 4560', email: 'wh-msa@twaibu.com',    employees: 25,  status: 'open',        lat: -4.0620,  lng: 39.6600 },
    { id: 12, name: 'Arusha Service Ctr',   type: 'service',      address: 'Njiro Complex, Block C',    city: 'Arusha',        country: 'Tanzania', phone: '+255 27 234 5670', email: 'svc-aru@twaibu.com',   employees: 12,  status: 'open',        lat: -3.4000,  lng: 36.6700 },
    { id: 13, name: 'Lusaka Branch',        type: 'branch',       address: 'Cairo Road, Fairview',      city: 'Lusaka',        country: 'Zambia',   phone: '+260 21 234 5678', email: 'lusaka@twaibu.com',    employees: 18,  status: 'coming-soon', lat: -15.4167, lng: 28.2833 },
    { id: 14, name: 'Addis Ababa Office',   type: 'branch',       address: 'Bole Road, Kirkos',         city: 'Addis Ababa',   country: 'Ethiopia', phone: '+251 11 345 6789', email: 'addis@twaibu.com',     employees: 22,  status: 'coming-soon', lat: 9.0320,   lng: 38.7469 },
    { id: 15, name: 'Mbeya Branch',         type: 'branch',       address: 'Sisimba Road',              city: 'Mbeya',         country: 'Tanzania', phone: '+255 25 456 7891', email: 'mbeya@twaibu.com',     employees: 16,  status: 'open',        lat: -8.9000,  lng: 33.4500 },
  ];

  get filteredBranches(): Branch[] {
    const f = this.activeFilter();
    if (f === 'all') return this.branches;
    return this.branches.filter(b => b.type === f || b.status === f);
  }

  get stats() {
    return {
      total:      this.branches.length,
      open:       this.branches.filter(b => b.status === 'open').length,
      comingSoon: this.branches.filter(b => b.status === 'coming-soon').length,
      employees:  this.branches.reduce((sum, b) => sum + b.employees, 0),
      countries:  [...new Set(this.branches.map(b => b.country))].length,
    };
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(L => {
        this.L = L;
        this.fixLeafletIcons(L);
        this.initMap(L);
        this.addMarkers(L);
      });
    }
  }

  ngOnDestroy() {
    if (this.map) this.map.remove();
  }

  private fixLeafletIcons(L: typeof LeafletType) {
    const iconDefault = L.icon({
      iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize:   [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  private initMap(L: typeof LeafletType) {
    this.map = L.map('map', {
      center: [-4.5, 34.5],
      zoom: 5,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(this.map);

    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
  }

  private getMarkerIcon(L: typeof LeafletType, branch: Branch): LeafletType.DivIcon {
    const colorMap: Record<string, string> = {
      headquarters: '#4F6EF7',
      branch:       '#22c55e',
      warehouse:    '#f59e0b',
      service:      '#06b6d4',
    };

    const iconMap: Record<string, string> = {
      headquarters: '★',
      branch:       '●',
      warehouse:    '▲',
      service:      '◆',
    };

    const color   = colorMap[branch.type] ?? '#4F6EF7';
    const icon    = iconMap[branch.type]  ?? '●';
    const opacity = branch.status === 'coming-soon' ? '0.5' : '1';

    return L.divIcon({
      className: '',
      html: `
        <div style="
          width: 36px; height: 36px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          background: ${color};
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          opacity: ${opacity};
          display: flex; align-items: center; justify-content: center;
        ">
          <span style="
            transform: rotate(45deg);
            color: white;
            font-size: 13px;
            font-weight: 700;
            line-height: 1;
          ">${icon}</span>
        </div>
      `,
      iconSize:    [36, 36],
      iconAnchor:  [18, 36],
      popupAnchor: [0, -40],
    });
  }

  private addMarkers(L: typeof LeafletType) {
    this.markers.forEach(m => m.remove());
    this.markers = [];

    this.filteredBranches.forEach(branch => {
      const marker = L.marker([branch.lat, branch.lng], {
        icon: this.getMarkerIcon(L, branch)
      });

      const statusColor: Record<string, string> = {
        open:          '#22c55e',
        closed:        '#ef4444',
        'coming-soon': '#f59e0b',
      };

      const typeLabel: Record<string, string> = {
        headquarters: 'Headquarters',
        branch:       'Branch Office',
        warehouse:    'Warehouse',
        service:      'Service Center',
      };

      marker.bindPopup(`
        <div style="min-width:220px; font-family: inherit;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
            <div style="width:10px; height:10px; border-radius:50%; background:${statusColor[branch.status]}; flex-shrink:0;"></div>
            <strong style="font-size:14px; color:#1e293b;">${branch.name}</strong>
          </div>
          <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#64748b; margin-bottom:8px;">
            ${typeLabel[branch.type]}
          </div>
          <div style="font-size:12px; color:#475569; display:flex; flex-direction:column; gap:5px;">
            <div>📍 ${branch.address}, ${branch.city}</div>
            <div>🌍 ${branch.country}</div>
            <div>📞 ${branch.phone}</div>
            <div>✉️ ${branch.email}</div>
            <div>👥 ${branch.employees} employees</div>
          </div>
          <div style="
            margin-top:10px; padding:4px 10px; border-radius:999px;
            background:${statusColor[branch.status]}20;
            color:${statusColor[branch.status]};
            font-size:11px; font-weight:700;
            display:inline-block; text-transform:capitalize;
          ">${branch.status.replace('-', ' ')}</div>
        </div>
      `, {
        maxWidth: 280,
        className: 'map-custom-popup'
      });

      marker.on('click', () => this.selectedBranch.set(branch));
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
    if (this.L) this.addMarkers(this.L);
    this.selectedBranch.set(null);
  }

  focusBranch(branch: Branch) {
    this.selectedBranch.set(branch);
    this.map.flyTo([branch.lat, branch.lng], 12, { duration: 1 });
    const marker = this.markers[this.filteredBranches.indexOf(branch)];
    if (marker) marker.openPopup();
  }

  resetView() {
    this.map.flyTo([-4.5, 34.5], 5, { duration: 1 });
    this.selectedBranch.set(null);
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      open:          'map-status-open',
      closed:        'map-status-closed',
      'coming-soon': 'map-status-soon',
    };
    return 'map-status ' + (map[status] ?? '');
  }

  getTypeIcon(type: string): string {
    const map: Record<string, string> = {
      headquarters: 'bi bi-building',
      branch:       'bi bi-geo-alt',
      warehouse:    'bi bi-box-seam',
      service:      'bi bi-tools',
    };
    return map[type] ?? 'bi bi-geo-alt';
  }

  getTypeColor(type: string): string {
    const map: Record<string, string> = {
      headquarters: '#4F6EF7',
      branch:       '#22c55e',
      warehouse:    '#f59e0b',
      service:      '#06b6d4',
    };
    return map[type] ?? '#4F6EF7';
  }
}