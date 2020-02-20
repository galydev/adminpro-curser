import { NgModule } from "@angular/core";
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        Grafica1Component,
        ProgressComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        Grafica1Component,
        ProgressComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ]
})

export class PagesModule { }