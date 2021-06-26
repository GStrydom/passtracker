"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShowpasswordComponent = void 0;
var core_1 = require("@angular/core");
var ShowpasswordComponent = /** @class */ (function () {
    function ShowpasswordComponent(router, dialogRef, firebaseService, transferService) {
        this.router = router;
        this.dialogRef = dialogRef;
        this.firebaseService = firebaseService;
        this.transferService = transferService;
        this.item = this.transferService.getData();
    }
    ShowpasswordComponent.prototype.ngOnInit = function () {
    };
    ShowpasswordComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    ShowpasswordComponent.prototype.edit = function (item) {
        this.close();
        this.router.navigate(['/details/' + item.payload.doc.id]);
    };
    ShowpasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-showpassword',
            templateUrl: './showpassword.component.html',
            styleUrls: ['./showpassword.component.scss']
        })
    ], ShowpasswordComponent);
    return ShowpasswordComponent;
}());
exports.ShowpasswordComponent = ShowpasswordComponent;
//# sourceMappingURL=showpassword.component.js.map