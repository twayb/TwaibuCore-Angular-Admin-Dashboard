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

export const routes: Routes = [
    { path: 'pages/auth/login', component: LoginComponent },
    { path: 'pages/auth/register', component: RegisterComponent },
    { path: 'pages/auth/forgot-password', component: ForgotPasswordComponent },
    { path: 'pages/auth/lockscreen', component: LockscreenComponent },
    { path: 'dashboard/admin', component: AdminDashboardComponent },
    { path: 'dashboard/recruitment', component: RecruitmentDashboardComponent },
    { path: 'dashboard/transportation', component: TransportationDashboardComponent },
    { path: 'dashboard/complaints', component: ComplaintsDashboardComponent },
    { path: 'general/components', component: ComponentsPageComponent },
    {path: 'general/widgets', component: WidgetsComponent},
    { path: 'general/tables', component: TablesComponent },
    { path: 'general/forms', component: FormsComponent },
    { path: 'general/icons', component: IconsComponent },
    { path: '', redirectTo: '/dashboard/admin', pathMatch: 'full' },
];
