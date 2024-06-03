import { DefaultComponent } from './shared/layout/default/default.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',

        component: DefaultComponent,
        children: [
            {
                path: '',
                redirectTo: 'hotels',
                pathMatch:'full'
            },
            {
                path: 'hotels',
                component: HotelsComponent

            }
        ]
    }
];
