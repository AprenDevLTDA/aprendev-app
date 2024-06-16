import { observable, action, makeAutoObservable } from "mobx";

class CourseProgramminStore {
    @observable cursos = [];
    @observable nivel = 0;

    @observable matriculas = [];
    @observable keysCourse = [];
    @observable dataNivel = {};
    @observable modalVisible = false;
    @observable modalVisibleError = false;


    constructor() {
        makeAutoObservable(this);
    }

    @action setCursos(cursos = []) {
        this.cursos = cursos;
    }
    @action setMatriculas(matriculas = []) {
        this.matriculas = matriculas;
    }
    @action setKeysCourse(keysCourse = []) {
        this.keysCourse = keysCourse;
    }
    @action setDataNivel(dataNivel = {}) {
        this.dataNivel = dataNivel;
    }

    @action setNivel(nivel = 0) {
        this.nivel = nivel;
    }
    @action setModalVisible(modalVisible = false) {
        this.modalVisible = modalVisible;
    }
    @action setModalVisibleError(modalVisibleError = false) {
        this.modalVisibleError = modalVisibleError;
    }

    @action logOff() {
        this.cursos = [];
        this.nivel = 0;

        this.matriculas = [];
        this.keysCourse = [];
        this.dataNivel = {};
        this.modalVisible = false;
    }

}
const CourseProgramming = new CourseProgramminStore(); // Criar uma instância da sua store

export default CourseProgramming;