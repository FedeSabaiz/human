const { createTeacher, updateTeacher, deleteTeacher } = require('../../services/TeacherService');

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

module.exports = {
    createNewTeacher,
    updateOneTeacher,
    deleteOneTeacher
};