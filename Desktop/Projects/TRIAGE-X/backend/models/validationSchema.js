export const registerSchema = {
    username : {
        notEmpty :{
            errorMessage : "Username is required"
        }
    },
    email : {
        notEmpty :{
            errorMessage : "Email is required"
        },
        isEmail : {
            errorMessage : "Email is invalid"
        }
    },
    password : {
        notEmpty :{
            errorMessage : "Password is required"
        },
        isLength : {
            errorMessage : "Password must be at least 6 characters long"
        }
    }

    
}

export const loginSchema = {
    email : {
        notEmpty : {
            errorMessage : "email cannot be empty"
        },
        isEmail : {
            errorMessage : "email is invalid"
        }
    },
    password : {
        notEmpty : {
            errorMessage : "password cannot be empty"
        },
        isLength : {
            errorMessage : "password must be at least 6 characters long"
        }
    }
}