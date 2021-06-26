"use strict";
exports.__esModule = true;
exports.rootRouterConfig = void 0;
var home_component_1 = require("./components/home/home.component");
var import_component_1 = require("./components/import/import.component");
var gaming_component_1 = require("./components/gaming/gaming.component");
var email_component_1 = require("./components/email/email.component");
var socialmedia_component_1 = require("./components/socialmedia/socialmedia.component");
var general_component_1 = require("./components/general/general.component");
var register_component_1 = require("./components/register/register.component");
var login_component_1 = require("./components/login/login.component");
var new_password_component_1 = require("./components/new-password/new-password.component");
var edit_password_component_1 = require("./components/edit-password/edit-password.component");
var edit_password_resolver_1 = require("./components/edit-password/edit-password.resolver");
var authguard_service_1 = require("./services/auth/authguard.service");
exports.rootRouterConfig = [
    //{ path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '', component: login_component_1.LoginComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'import', component: import_component_1.ImportComponent },
    { path: 'email', component: email_component_1.EmailComponent, canActivate: [authguard_service_1.AuthguardService] },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [authguard_service_1.AuthguardService] },
    { path: 'gaming', component: gaming_component_1.GamingComponent, canActivate: [authguard_service_1.AuthguardService] },
    { path: 'social', component: socialmedia_component_1.SocialmediaComponent, canActivate: [authguard_service_1.AuthguardService] },
    { path: 'general', component: general_component_1.GeneralComponent, canActivate: [authguard_service_1.AuthguardService] },
    { path: 'new-password', component: new_password_component_1.NewPasswordComponent, canActivate: [authguard_service_1.AuthguardService] },
    { path: 'details/:id', component: edit_password_component_1.EditPasswordComponent, canActivate: [authguard_service_1.AuthguardService], resolve: { data: edit_password_resolver_1.EditPasswordResolver } }
];
//# sourceMappingURL=app.routes.js.map