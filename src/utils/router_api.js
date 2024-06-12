import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { get, ref, remove, set, update, } from 'firebase/database';
import { db } from './firebase_config';
const API_URL = "https://apren-dev-fdb98-default-rtdb.firebaseio.com";


class RouterApi {


    static async post(table, body) {
        set(ref(db, table), body);
    }
    static async get(table) {
        const snapshot = await get(ref(db, table));
        if (snapshot.exists()) {
            return snapshot;
        } else {
            console.log(`Não existem dados em ${table}.`);
            return null; // ou você pode retornar uma estrutura vazia, como {} ou []
        }
    }

    static async patch(table, body) {
        update(ref(db, table), body);
    }
    static async delete(table) {
        remove(ref(db, table));
    }

    static async fetchData(tableFirebase) {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Method": "GET",
                "Content-Type": "application/json",
            }
        };
        try {
            const response = await axios.get(`${API_URL}/${tableFirebase}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            throw error;
        }
    }

    static async postData(seusDados, tableFirebase) {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Method": "POST",
                "Content-Type": "application/json",
            }
        };

        try {
            const response = await axios.post(`${API_URL}${tableFirebase}`, seusDados, config);

            console.log('Resposta do servidor:', response.status);
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    }

    static async updateData(seusDadosAtualizados) {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Method": "PUT",
                "Content-Type": "application/json",
            }
        };
        try {
            const response = await axios.put(`${API_URL}`, seusDadosAtualizados, config);
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
            throw error;
        }
    }

    static async patchData(seusDadosParciais, endPoint) {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Method": "PATCH",
                "Content-Type": "application/json",
            }
        };
        try {
            const response = await axios.patch(`${API_URL}/${endPoint}`, seusDadosParciais, config);
            console.log(response.status);
            return response;
        } catch (error) {
            console.error('Erro ao atualizar dados parciais:', error);
            throw error;
        }
    }

    static async deleteData(idDoItem) {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Method": "DELETE",
                "Content-Type": "application/json",
            }
        };
        try {
            const response = await axios.delete(`${API_URL}/${idDoItem}`, config);
            return response.data;
        } catch (error) {
            console.error('Erro ao excluir dados:', error);
            throw error;
        }
    }
}

export default RouterApi;
