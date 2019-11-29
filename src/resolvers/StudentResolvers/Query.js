const { getAllStudents, getOneStudent } = require('../../services/StudentService');

const getStudents = async () => {
    const students = await getAllStudents();
    return students;
};

const getSingleStudent = async (_, { id }) => {
    const student = await getOneStudent(id);
    if(!student) throw new Error('Student does not exist');
    return student;
};

module.exports = {
    getStudents,
    getSingleStudent
};