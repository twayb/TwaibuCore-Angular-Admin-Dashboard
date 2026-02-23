import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './features/dashboards/admin_dashboard/admin-dashboard/admin-dashboard';
import { RecruitmentDashboardComponent } from './features/dashboards/recruitment_dashboard/recruitment-dashboard/recruitment-dashboard';
import { ForgotPasswordComponent } from './pages/authentication/forgot-password/forgot-password';
import { LoginComponent } from './pages/authentication/login/login';
import { RegisterComponent } from './pages/authentication/register/register';

export const routes: Routes = [
    { path: 'pages/auth/login', component: LoginComponent },
    { path: 'pages/auth/register', component: RegisterComponent },
    { path: 'pages/auth/forgot-password', component: ForgotPasswordComponent },
    { path: 'dashboard/admin', component: AdminDashboardComponent },
    { path: 'dashboard/recruitment', component: RecruitmentDashboardComponent },
    { path: '', redirectTo: '/dashboard/admin', pathMatch: 'full' },
];
