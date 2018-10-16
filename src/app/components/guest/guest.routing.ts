import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { DistinctionComponent } from "./distinction/distinction.component";
import { ContactusComponent } from "./contactus/contactus.component";
import { PrivacyPolicyComponent } from "./privacypolicy/privacypolicy.component";
import { TermsConditionComponent } from "./termscondition/termscondition.component";
import { ForAdvisorsComponent } from "./foradvisors/foradvisors.component";
import { CareersComponent } from "./careers/careers.component";
import { LayoutComponent } from "../layout/layout.component";
import { AuthCheck } from "../../services/authcheck.service";
import { RegisterNewOrganizationComponent } from './neworganization/neworganization.component';
import { PageNotFoundComponent } from './404/404.component';

export const GuestRoute: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'about-us',
                component: AboutusComponent
            },
            {
                path: 'the-distinction',
                component: DistinctionComponent
            },
            {
                path: 'contact-us',
                component: ContactusComponent
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent
            },
            {
                path: 'terms-conditions',
                component: TermsConditionComponent
            },
            {
                path: 'for-advisors',
                component: ForAdvisorsComponent
            },
            {
                path: 'ideal-careers',
                component: CareersComponent
            },
            {
                path: 'neworganization',
                component: RegisterNewOrganizationComponent
            },
            {
                path: 'not-found',
                component: PageNotFoundComponent
            }
        ],
        resolve: {
            user: AuthCheck
        }
    }

];
