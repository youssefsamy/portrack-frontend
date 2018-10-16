/**
 * Created by ApolloYr on 5/10/2018.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { DistinctionComponent } from "./distinction/distinction.component";
import { ContactusComponent } from "./contactus/contactus.component";
import { PrivacyPolicyComponent } from "./privacypolicy/privacypolicy.component";
import { TermsConditionComponent } from "./termscondition/termscondition.component";
import { ForAdvisorsComponent } from "./foradvisors/foradvisors.component";
import { CareersComponent } from "./careers/careers.component";
import { GuestRoute } from "./guest.routing";
import { RegisterNewOrganizationComponent } from './neworganization/neworganization.component';
import { PageNotFoundComponent } from './404/404.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(GuestRoute),
        SharedModule
    ],
    entryComponents: [

    ],
    declarations: [
        HomeComponent,
        AboutusComponent,
        DistinctionComponent,
        ContactusComponent,
        PrivacyPolicyComponent,
        TermsConditionComponent,
        ForAdvisorsComponent,
        CareersComponent,
        RegisterNewOrganizationComponent,
        PageNotFoundComponent
    ],
    exports: [
        HomeComponent,
        AboutusComponent,
        DistinctionComponent,
        ContactusComponent,
        PrivacyPolicyComponent,
        TermsConditionComponent,
        ForAdvisorsComponent,
        CareersComponent,
        RegisterNewOrganizationComponent,
        PageNotFoundComponent
    ],
    providers: [],
})
export class GuestModule {

}
