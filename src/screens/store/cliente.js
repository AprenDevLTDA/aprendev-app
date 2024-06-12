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
    @observable user = {};

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
    @action setUser(user = {}) {
        this.user = user;
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

    @action logOff() {
        setName("");
        setNivel("");
        setEmail("");

    }

}




const Client = new ClienteStore(); // Criar uma instância da sua store

export default Client;