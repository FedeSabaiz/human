/* eslint-disable no-undef */
const { graphql } = require('graphql');
const { schema } = require('../../index');

const { createTeacher } = require('../services/TeacherService');

const setupTest = require('./helpers');

const MUTATION_TEACHER = `

    mutation addTeacher($data: TeacherInput!){
        createNewTeacher(data:$data){
            _id
            email
        }
    }

`;


describe('Test Mutation Create Teacher', () => {

    beforeEach(async () => await setupTest());

    it('Should create Teacher', () => {
        
        const makeTest = async () => {
            const data = {
                first_name: 'Isaac',
                last_name: 'Velez',
                email: 'isaac@velez.com',
                password: '12345',
                roll: 'T'
            };

            graphql(schema, MUTATION_TEACHER, null, {}, { data })
                .then( response => {
                    expect(response.data.createNewTeacher).toHaveProperty('email', data.email);
                    expect(response.data.createNewTeacher).toHaveProperty('_id');
                });
        };

        makeTest();
    });

    it('Should not Create an Teacher', () => {
        const makeTest = async () => {
            const data = {
                first_name: 'Juan',
                last_name: 'Kuri',
                email: 'juan@kuri.com',
                password: '12345'
            };

            await createTeacher(data);

            graphql(schema, MUTATION_TEACHER, null, {}, {
                data
            })
                .then(response => {
                    expect(response).toHaveProperty('errors');
                });
        };

        makeTest();
    });

});