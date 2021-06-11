"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ImageDialogComponent = void 0;
var core_1 = require("@angular/core");
var ImageDialogComponent = /** @class */ (function () {
    function ImageDialogComponent(dialogRef, firebaseService) {
        this.dialogRef = dialogRef;
        this.firebaseService = firebaseService;
        this.avatars = new Array();
    }
    ImageDialogComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    ImageDialogComponent.prototype.getData = function () {
        var _this = this;
        this.firebaseService.getAvatars()
            .subscribe(function (data) { return _this.avatars = data; });
    };
    ImageDialogComponent.prototype.close = function (avatar) {
        this.dialogRef.close(avatar);
    };
    ImageDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-image-dialog',
            templateUrl: './image-dialog.component.html',
            styleUrls: ['./image-dialog.component.scss']
        })
    ], ImageDialogComponent);
    return ImageDialogComponent;
}());
exports.ImageDialogComponent = ImageDialogComponent;
//# sourceMappingURL=image-dialog.component.js.map