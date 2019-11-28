const { createStudent, updateStudent, deleteStudent } = require('../../services/StudentService');

const createNewStudent = async (_, { data }) => {
    const student = await createStudent(data);
    if(!student) throw new Error('Student does not exist');
    return student;
};

const updateOneStudent = async (_, { id, data }) => {
    const student = await updateStudent(id, data);
    if(!student) throw new Error('Student does not exist!');
    return student;
};

const deleteOneStudent = async (_, { id }) => {
    const student = await deleteStudent(id);
    if(!student) throw new Error('Student does not exist!');
    return 'Student deleted';
};

module.exports = {
    createNewStudent,
    updateOneStudent,
    deleteOneStudent
};
