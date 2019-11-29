const { createTeacher, updateTeacher, deleteTeacher } = require('../../services/TeacherService');
const authenticate = require('../../utils/authenticate');

const createNewTeacher = async (_, { data }) => {
    const teacher = await createTeacher(data);
    return teacher;
};

const updateOneTeacher = async (_, { id, data }) => {
    const teacher = await updateTeacher(id, data);
    if(!teacher) throw new Error('Teacher does not exist!');
    return teacher;
};

const deleteOneTeacher = async (_, { id }) => {
    const teacher = await deleteTeacher(id);
    if(!teacher) throw new Error('Teacher does not exist!');
    return 'Teacher deleted';
};

const login = async (_, params) => {
    const token = await authenticate(params).catch(e => { throw e;});
    return {
        token: token,
        message: 'Login successful'
    };
};

module.exports = {
    createNewTeacher,
    updateOneTeacher,
    deleteOneTeacher,
    login
};