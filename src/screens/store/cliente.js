import { observable, action, makeAutoObservable } from "mobx";

class ClienteStore {
    @observable uid = "";
    @observable hash = "";
    @observable hashCoursesUser = "";
    @observable hashMatricula = "";
    @observable idCourse = "";
    @observable idPerformance = "";
    @observable progress = "";
    @observable name = "";
    @observable nivel = "";
    @observable email = "";
    @observable password = "";
    @observable confirmPassword = "";
    @observable heart = 0;
    @observable coins = 0;
    @observable selos = [];
    @observable characters = [];
    @observable char = "";
    @observable isUserLoggedIn = false;
    @observable score = 0;

    constructor() {
        makeAutoObservable(this);
    }

    @action setName(name = "") {
        this.name = name;
    }
    @action setNivel(nivel = "") {
        this.nivel = nivel;
    }
    @action setEmail(email = "") {
        this.email = email;
    }
    @action setPassword(password = "") {
        this.password = password;
    }
    @action setIdPerformance(idPerformance = "") {
        this.idPerformance = idPerformance;
    }
    @action setIdCourse(idCourse = "") {
        this.idCourse = idCourse;
    }
    @action setConfirmPassword(confirmPassword = "") {
        this.confirmPassword = confirmPassword;
    }
    @action setProgress(progress = "") {
        this.progress = progress;
    }
    @action setHeart(heart = 0) {
        this.heart = heart;
    }
    @action setCoins(coins = 0) {
        this.coins = coins;
    }
    @action setIsUserLoggedIn(isUserLoggedIn = false) {
        this.isUserLoggedIn = isUserLoggedIn;
    }
    @action setUid(uid = "") {
        this.uid = uid;
    }
    @action setHash(hash = "") {
        this.hash = hash;
    }
    @action setHashCoursesUser(hashCoursesUser = "") {
        this.hashCoursesUser = hashCoursesUser;
    }
    @action setHashMatricula(hashMatricula = "") {
        this.hashMatricula = hashMatricula;
    }
    @action setSelos(selos = []) {
        this.selos = selos;
    }
    @action setCharacters(characters = []) {
        this.characters = characters;
    }
    @action setChar(char = "") {
        this.char = char;
    }
    @action setScore(score = 0) {
        this.score = score;
    }

    @action logOff() {
        this.uid = "";
        this.hash = "";
        this.hashCoursesUser = "";
        this.hashMatricula = "";
        this.idCourse = "";
        this.idPerformance = "";
        this.progress = "";
        this.name = "";
        this.nivel = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
        this.heart = 0;
        this.coins = 0;
        this.selos = [];
        this.characters = [];
        this.score = 0;
    }

}




const Client = new ClienteStore(); // Criar uma instância da sua store

export default Client;