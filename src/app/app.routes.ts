import { Route } from '@angular/router';
import { WelcomeComponent } from './shared/welcome/welcome.component';

export const appRoutes: Route[] = [{
    path: '',
    children: [
        {
            path: 'welcome',
            component: WelcomeComponent,
        },
        {
            path: 'characters',
            loadChildren: () => import('./features/characters/characters.routes').then(mod => mod.characterRoutes),
        },
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'welcome'
        },
        {
            path: '**',
            redirectTo: 'welcome'
        }
    ]
}];
