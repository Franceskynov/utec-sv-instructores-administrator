import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { MateriasComponent } from './materias/materias.component';
import { routes, routing } from './configuraciones.routing';
import { UtilModule } from 'app/modules/util/util.module';
import { CicloComponent } from './ciclo/ciclo.component';
import { FacultadComponent } from './facultad/facultad.component';
import { HorarioComponent } from './horario/horario.component';
import { AulaComponent } from './aula/aula.component';
import { EspecialidadesComponent } from './especialidades/especialidades.component';
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { EscuelaComponent } from './escuela/escuela.component';
import { EdificioComponent } from './edificio/edificio.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    UtilModule
  ],
  declarations: [
    IndexComponent,
    MateriasComponent,
    CicloComponent,
    FacultadComponent,
    HorarioComponent,
    AulaComponent,
    EspecialidadesComponent,
    CapacitacionComponent,
    UsuariosComponent,
    PreferenciasComponent,
    EscuelaComponent,
    EdificioComponent,
  ]
})
export class ConfiguracionesModule { }
