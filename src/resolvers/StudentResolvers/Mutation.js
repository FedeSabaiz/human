const { createStudent, updateStudent, deleteStudent } = require('../../services/StudentService');
const storage = require('../../utils/storage');

const createNewStudent = async (_, { data }, { user }) => {
    data.student = user._id;
    if(data.cover) {
        const { createReadStream } = await data.cover;
        const stream = createReadStream();
        const image = await storage({ stream });
        console.log(stream);
        console.log(image);
        data = {
            ...data,
            cover: image.url,
        };
    }

    const student = await createStudent(data);
    if(!student) throw new Error('Student does not exist');
    return student;
};

const updateOneStudent = async (_, { id, data }, { user } ) => {
    data.student = user._id;
    if(data.cover) {
        const { createReadStream } = await data.cover;
        const stream = createReadStream();
        const image = await storage({ stream });
        console.log(stream);
        console.log(image);
        data = {
            ...data,
            cover: image.url,
        };
    }

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
