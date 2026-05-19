import { Routes } from '@angular/router'

/* ========================= */
/* PUBLIC PAGES */
/* ========================= */

import { Home } from './pages/home/home'
import { AllApps } from './pages/all-apps/all-apps'
import { NewApps } from './pages/new-apps/new-apps'
import { AppDetails } from './pages/app-details/app-details'

/* ========================= */
/* ADMIN PAGES */
/* ========================= */

import { Login } from './admin/login/login'
import { Dashboard } from './admin/dashboard/dashboard'
import { AddGame } from './admin/add-game/add-game'
import { ManageGames } from './admin/manage-games/manage-games'

/* ========================= */
/* GUARDS */
/* ========================= */

import { AdminGuard } from './guards/admin-guard'

/* ========================= */
/* ROUTES */
/* ========================= */

export const routes: Routes = [

  /* ========================= */
  /* PUBLIC ROUTES */
  /* ========================= */

  {
    path: '',
    component: Home,
    title: 'Top Earning Apps in India 2026'
  },

  {
    path: 'all-apps',
    component: AllApps,
    title: 'All Earning Apps'
  },

  {
    path: 'new-apps',
    component: NewApps,
    title: 'New Earning Apps 2026'
  },

  {
    path: 'app/:id',
    component: AppDetails
  },

  /* ========================= */
  /* ADMIN ROUTES */
  /* ========================= */

  {
    path: 'admin/login',
    component: Login,
    title: 'Admin Login'
  },

  {
    path: 'admin/dashboard',
    component: Dashboard,

    canActivate: [
      AdminGuard
    ],

    title: 'Admin Dashboard'
  },

  {
    path: 'admin/add-game',
    component: AddGame,

    canActivate: [
      AdminGuard
    ],

    title: 'Add Game'
  },

  {
    path: 'admin/manage-games',
    component: ManageGames,

    canActivate: [
      AdminGuard
    ],

    title: 'Manage Games'
  },

  /* ========================= */
  /* FALLBACK */
  /* ========================= */

  {
    path: '**',
    redirectTo: ''
  }

]