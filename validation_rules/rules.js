module.exports = {
    users: {
        create: {
            name: {
                required: true,
                message: 'Name cannot be empty'
            },
            email: {
                required: true,
                type: 'email',
                message: 'Invalid email'
            },
            phone: {
                required: true,
                len: 11,
                message: 'Invalid Phone'
            },
            password: {
                required: true,
                min: 4,
                message: 'Invalid Password'
            },
            address: {
                required: true,
                message: 'Invalid Address'
            },
            gender: {
                required: true,
                message: 'Must select a gender'
            }
        },
        update: {
            name: {
                required: true,
                message: 'Name cannot be empty'
            },
            email: {
                required: true,
                type: 'email',
                message: 'Invalid email'
            },
            phone: {
                required: true,
                len: 11,
                message: 'Invalid Phone'
            },
            address: {
                required: true,
                message: 'Invalid Address'
            },
            gender: {
                required: true,
                message: 'Must select a gender'
            }
        },
        login: {
            email: {
                required: true,
                type: 'email',
                message: 'Invalid email'
            },
            password: {
                required: true,
                message: 'Password cannot be empty'
            }
        },
        changePassword: {
            oldPassword: {
                required: true,
                min: 4,
                message: 'Invalid old password'
            },
            newPassword: {
                required: true,
                min: 4,
                message: 'Invalid new password'
            },
            confirmPassword: {
                required: true,
                min: 4,
                message: 'Invalid confirm password'
            }
        }
    }
};
