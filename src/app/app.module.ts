import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './admin/courses/courses.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




   
  
    
 
