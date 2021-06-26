"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
var image_dialog_component_1 = require("./components/image-dialog/image-dialog.component");
var edit_password_component_1 = require("./components/edit-password/edit-password.component");
var edit_password_resolver_1 = require("./components/edit-password/edit-password.resolver");
var new_password_component_1 = require("./components/new-password/new-password.component");
var home_component_1 = require("./components/home/home.component");
var auth_service_1 = require("./services/auth/auth.service");
var transfer_service_1 = require("./services/transfer.service");
var fire_1 = require("@angular/fire");
var firestore_1 = require("@angular/fire/firestore");
var environment_1 = require("../environments/environment");
var auth_1 = require("@angular/fire/auth");
var animations_1 = require("@angular/platform-browser/animations");
var button_1 = require("@angular/material/button");
var input_1 = require("@angular/material/input");
var slider_1 = require("@angular/material/slider");
var dialog_1 = require("@angular/material/dialog");
var tooltip_1 = require("@angular/material/tooltip");
var toolbar_1 = require("@angular/material/toolbar");
var select_1 = require("@angular/material/select");
var card_1 = require("@angular/material/card");
var expansion_1 = require("@angular/material/expansion");
var icon_1 = require("@angular/material/icon");
require("hammerjs");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var gaming_component_1 = require("./components/gaming/gaming.component");
var socialmedia_component_1 = require("./components/socialmedia/socialmedia.component");
var general_component_1 = require("./components/general/general.component");
var logout_component_1 = require("./components/logout/logout.component");
var email_component_1 = require("./components/email/email.component");
var showpassword_component_1 = require("./components/showpassword/showpassword.component");
var import_component_1 = require("./components/import/import.component");
var categorytemplate_component_1 = require("./components/categorytemplate/categorytemplate.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                image_dialog_component_1.ImageDialogComponent,
                edit_password_component_1.EditPasswordComponent,
                new_password_component_1.NewPasswordComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                gaming_component_1.GamingComponent,
                socialmedia_component_1.SocialmediaComponent,
                general_component_1.GeneralComponent,
                logout_component_1.LogoutComponent,
                email_component_1.EmailComponent,
                showpassword_component_1.ShowpasswordComponent,
                import_component_1.ImportComponent,
                categorytemplate_component_1.CategorytemplateComponent,
            ],
            entryComponents: [image_dialog_component_1.ImageDialogComponent, showpassword_component_1.ShowpasswordComponent],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                router_1.RouterModule.forRoot(app_routes_1.rootRouterConfig, { useHash: true }),
                fire_1.AngularFireModule.initializeApp(environment_1.environment.firebase),
                firestore_1.AngularFirestoreModule,
                animations_1.BrowserAnimationsModule,
                button_1.MatButtonModule,
                input_1.MatInputModule,
                slider_1.MatSliderModule,
                dialog_1.MatDialogModule,
                tooltip_1.MatTooltipModule,
                toolbar_1.MatToolbarModule,
                select_1.MatSelectModule,
                icon_1.MatIconModule,
                card_1.MatCardModule,
                expansion_1.MatExpansionModule,
                auth_1.AngularFireAuthModule,
            ],
            providers: [edit_password_resolver_1.EditPasswordResolver, auth_service_1.AuthService, transfer_service_1.TransferService],
            bootstrap: [app_component_1.AppComponent],
            schemas: [
                core_1.CUSTOM_ELEMENTS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map