import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './features/dashboards/admin_dashboard/admin-dashboard/admin-dashboard';
import { RecruitmentDashboardComponent } from './features/dashboards/recruitment_dashboard/recruitment-dashboard/recruitment-dashboard';
import { ForgotPasswordComponent } from './pages/authentication/forgot-password/forgot-password';
import { LoginComponent } from './pages/authentication/login/login';
import { RegisterComponent } from './pages/authentication/register/register';
import { LockscreenComponent } from './pages/authentication/lockscreen/lockscreen';
import { TransportationDashboardComponent } from './features/dashboards/transportation-dashboard/transportation-dashboard';
import { ComplaintsDashboardComponent } from './features/dashboards/complaints-dashboard/complaints-dashboard';
import { ComponentsPageComponent } from './pages/general/components-page/components-page';
import { WidgetsComponent } from './shared/widgets/widgets';
import { TablesComponent } from './shared/tables/tables';
import { FormsComponent } from './shared/forms/forms';
import { IconsComponent } from './shared/icons/icons';
import { MapComponent } from './shared/map/map';
import { ProfileComponent } from './pages/profile/profile';
import { ForbiddenComponent } from './pages/erros/forbidden/forbidden';
import { ServerErrorComponent } from './pages/erros/server-error/server-error';
import { NotFoundComponent } from './pages/erros/not-found/not-found';
import { MaintenanceComponent } from './pages/erros/maintenance/maintenance';
import { CalenderComponent } from './features/calender/calender';
import { EmailComponent } from './features/email/email';

export const routes: Routes = [


  

  // ── AUTH PAGES (no sidebar) ──
  { path: 'pages/auth/login',           component: LoginComponent          },
  { path: 'pages/auth/register',        component: RegisterComponent        },
  { path: 'pages/auth/forgot-password', component: ForgotPasswordComponent  },
  { path: 'pages/auth/lockscreen',      component: LockscreenComponent      },

  // ── ERROR PAGES (no sidebar) ──
{ path: 'errors/404', component: NotFoundComponent   },
{ path: 'errors/500', component: ServerErrorComponent },
{ path: 'errors/403', component: ForbiddenComponent  },
{ path: 'errors/maintenance', component: MaintenanceComponent },


  // ── LANDING PAGES (no sidebar) ──
 {
    path: 'landing/online-application',
    loadComponent: () =>
      import('./features/online-application/online-application')
        .then(m => m.OnlineApplicationComponent)
  },
    {
    path: 'landing/complaint-portal',
    loadComponent: () =>
      import('./features/complaint-portal/complaint-portal')
        .then(m => m.ComplaintPortalComponent)
  },

   {
    path: 'landing/transportation',
    loadComponent: () =>
      import('./features/transportation-system/transportation-system')
        .then(m => m.TransportationSystemComponent)
  },

  // Add these two routes to app.routes.ts alongside the existing complaint-portal route:

{
  path: 'landing/register-complaint',
  loadComponent: () =>
    import('./features/registercomplaint/registercomplaint')
      .then(m => m.RegisterComplaintComponent)
},
{
  path: 'landing/track-complaint',
  loadComponent: () =>
    import('./features/trackcomplaint/trackcomplaint')
      .then(m => m.TrackComplaintComponent)
},

  // ── MAIN APP PAGES (with sidebar) ──
  { path: 'dashboard/admin',          component: AdminDashboardComponent          },
  { path: 'dashboard/recruitment',    component: RecruitmentDashboardComponent    },
  { path: 'dashboard/transportation', component: TransportationDashboardComponent },
  { path: 'dashboard/complaints',     component: ComplaintsDashboardComponent     },
  { path: 'general/components',       component: ComponentsPageComponent          },
  { path: 'general/widgets',          component: WidgetsComponent                 },
  { path: 'general/tables',           component: TablesComponent                  },
  { path: 'general/forms',            component: FormsComponent                   },
  { path: 'general/icons',            component: IconsComponent                   },
  { path: 'general/map',              component: MapComponent                     },
  { path: 'profile',                  component: ProfileComponent                 },
  { path: 'features/calendar', component: CalenderComponent },
  { path: 'features/email', component: EmailComponent },

  // ── REDIRECT & CATCH-ALL ──
{ path: '',    redirectTo: 'dashboard/admin', pathMatch: 'full' },
{ path: '**',  redirectTo: 'errors/404' },
];