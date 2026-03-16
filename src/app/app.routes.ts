import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { AllApps } from './pages/all-apps/all-apps';
import { NewApps } from './pages/new-apps/new-apps';
import { AppDetails } from './pages/app-details/app-details';

import { Login } from './admin/login/login';
import { Dashboard } from './admin/dashboard/dashboard';
import { AddGame } from './admin/add-game/add-game';
import { ManageGames } from './admin/manage-games/manage-games';

export const routes: Routes = [

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

/* ADMIN */

{
path:'admin/login',
component:Login
},

{
path:'admin/dashboard',
component:Dashboard
},

{
path:'admin/add-game',
component:AddGame
},

{
path:'admin/manage-games',
component:ManageGames
},

{
path:'**',
redirectTo:''
}

];