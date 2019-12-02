const { createTeacher, updateTeacher, deleteTeacher } = require('../../services/TeacherService');
const authenticate = require('../../utils/authenticate');
const storage = require('../../utils/storage');

const createNewTeacher = async (_, { data }, { user }) => {
    data.teacher = user._id;
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

    const teacher = await createTeacher(data);
    console.log(teacher);
    return teacher;
};

const updateOneTeacher = async (_, { id, data }, { user }) => {
    data.teacher = user._id;
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

    // console.log(params);
    if(params.roll === 'T') {
        return {
            token: token,
            message: 'Login successful, wellcome Teacher'
        };
    }
    if (params.roll === 'S') {
        return {
            token: token,
            message: 'Login successful, wellcome Student'
        };
    }

};

module.exports = {
    createNewTeacher,
    updateOneTeacher,
    deleteOneTeacher,
    login
};