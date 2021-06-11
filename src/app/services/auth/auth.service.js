"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var AuthService = /** @class */ (function () {
    function AuthService(afAuth, afs, router, ngZone) {
        var _this = this;
        this.afAuth = afAuth;
        this.afs = afs;
        this.router = router;
        this.ngZone = ngZone;
        this.afAuth.authState.subscribe(function (user) {
            if (user) {
                _this.userData = user;
                localStorage.setItem('user', JSON.stringify(_this.userData));
                JSON.parse(localStorage.getItem('user'));
            }
            else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        });
    }
    // Sign in with email/password
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(function (result) {
            _this.ngZone.run(function () {
                _this.router.navigate(['home']);
            });
            _this.SetUserData(result.user);
        })["catch"](function (error) {
            window.alert(error.message);
        });
    };
    AuthService.prototype.SetUserData = function (user) {
        var userRef = this.afs.doc("users/" + user.uid);
        var userData = {
            uid: user.uid,
            email: user.email
        };
        return userRef.set(userData, {
            merge: true
        });
    };
    AuthService.prototype.emailSignup = function (email, password) {
        var _this = this;
        this.afAuth.createUserWithEmailAndPassword(email, password)
            .then(function (value) {
            console.log('Sucess', value);
            _this.router.navigateByUrl('home');
        })["catch"](function (error) {
            console.log('Something went wrong: ', error);
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        return this.afAuth.signOut().then(function () {
            localStorage.removeItem('user');
            _this.router.navigate(['login']);
            location.reload();
        });
    };
    Object.defineProperty(AuthService.prototype, "isLoggedIn", {
        get: function () {
            var user = JSON.parse(localStorage.getItem('user'));
            return (user !== null) ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    AuthService.prototype.getAvatars = function () {
        return this.afs.collection('pimage').valueChanges();
    };
    AuthService.prototype.getPassword = function (passwordKey) {
        return this.afs.collection('passwords').doc(passwordKey).snapshotChanges();
    };
    AuthService.prototype.getGamingPasswords = function () {
        return this.afs.collection('passwords', function (ref) { return ref.where('category', '>=', 'gaming')
            .where('category', '<=', 'gaming' + '\uf8ff'); })
            .snapshotChanges();
    };
    AuthService.prototype.getEmailPasswords = function () {
        return this.afs.collection('passwords', function (ref) { return ref.where('category', '>=', 'email')
            .where('category', '<=', 'email' + '\uf8ff'); })
            .snapshotChanges();
    };
    AuthService.prototype.getSocialPasswords = function () {
        return this.afs.collection('passwords', function (ref) { return ref.where('category', '>=', 'social')
            .where('category', '<=', 'social' + '\uf8ff'); })
            .snapshotChanges();
    };
    AuthService.prototype.getGeneralPasswords = function () {
        return this.afs.collection('passwords', function (ref) { return ref.where('category', '>=', 'general')
            .where('category', '<=', 'general' + '\uf8ff'); })
            .snapshotChanges();
    };
    AuthService.prototype.updatePassword = function (passwordKey, value) {
        value.nameToSearch = value.website.toLowerCase();
        return this.afs.collection('passwords').doc(passwordKey).set(value);
    };
    AuthService.prototype.deletePassword = function (passwordKey) {
        return this.afs.collection('passwords').doc(passwordKey)["delete"]();
    };
    AuthService.prototype.getPasswords = function () {
        return this.afs.collection('passwords').snapshotChanges();
    };
    AuthService.prototype.searchUsers = function (searchValue) {
        return this.afs.collection('passwords', function (ref) { return ref.where('nameToSearch', '>=', searchValue)
            .where('nameToSearch', '<=', searchValue + '\uf8ff'); })
            .snapshotChanges();
    };
    AuthService.prototype.searchCategories = function (searchValue) {
        return this.afs.collection('passwords', function (ref) { return ref.where('category', '>=', searchValue)
            .where('category', '<=', searchValue + '\uf8ff'); })
            .snapshotChanges();
    };
    AuthService.prototype.createPassword = function (value, avatar) {
        return this.afs.collection('passwords').add({
            category: value.category,
            nameToSearch: value.website.toLowerCase(),
            website: value.website,
            username: value.username,
            password: value.password,
            avatar: avatar
        });
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map