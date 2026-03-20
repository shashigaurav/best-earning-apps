import { Routes } from '@angular/router'

import { Home } from './pages/home/home'
import { AllApps } from './pages/all-apps/all-apps'
import { NewApps } from './pages/new-apps/new-apps'
import { AppDetails } from './pages/app-details/app-details'

import { Login } from './admin/login/login'
import { Dashboard } from './admin/dashboard/dashboard'
import { AddGame } from './admin/add-game/add-game'
import { ManageGames } from './admin/manage-games/manage-games'
import { AdminGuard } from './guards/admin-guard'

// 🔥 IMPORT GUARD


export const routes: Routes = [

  // =================
  // PUBLIC ROUTES
  // =================

  {
    path:'',
    component:Home
  },

  {
    path:'all-apps',
    component:AllApps
  },

  {
    path:'new-apps',
    component:NewApps
  },

  {
    path:'app/:id',
    component:AppDetails
  },

  // =================
  // ADMIN ROUTES
  // =================

  {
    path:'admin/login',
    component:Login
  },

  {
    path:'admin/dashboard',
    component:Dashboard,
    canActivate:[AdminGuard]   // 🔐 PROTECTED
  },

  {
    path:'admin/add-game',
    component:AddGame,
    canActivate:[AdminGuard]   // 🔐 PROTECTED
  },

  {
    path:'admin/manage-games',
    component:ManageGames,
    canActivate:[AdminGuard]   // 🔐 PROTECTED
  },

  // =================
  // FALLBACK
  // =================

  {
    path:'**',
    redirectTo:''
  }

]