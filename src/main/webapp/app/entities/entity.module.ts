import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyAppFilmsModule } from './films/films.module';
import { MyAppGenresModule } from './genres/genres.module';
import { MyAppDirectorModule } from './director/director.module';
import { MyAppActorsModule } from './actors/actors.module';
import { MyAppProductionCompanyModule } from './production-company/production-company.module';
import { MyAppPostsModule } from './posts/posts.module';
import { MyAppProductionCountriesModule } from './production-countries/production-countries.module';
import { MyAppSpokenLanguagesModule } from './spoken-languages/spoken-languages.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MyAppFilmsModule,
        MyAppGenresModule,
        MyAppDirectorModule,
        MyAppActorsModule,
        MyAppProductionCompanyModule,
        MyAppPostsModule,
        MyAppProductionCountriesModule,
        MyAppSpokenLanguagesModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAppEntityModule {}
