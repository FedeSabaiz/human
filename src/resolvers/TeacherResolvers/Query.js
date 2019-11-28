const { getAllTeachers, getOneTeacher } = require('../../services/TeacherService');

const getTeachers = async () => {
    const teachers = await getAllTeachers();
    return teachers;
};

const getSingleTeacher = async (_, { id }) => {
    const teacher = await getOneTeacher(id);
    if(!teacher) throw new Error('Teacher does not exist!');
    return teacher;
};

module.exports = {
    getTeachers,
    getSingleTeacher
};