// import prisma from "../utils/prisma.js";

// export async function validateUser(input) {
//     const validationErrors = {}

//     if (!('firstName' in input) || input['firstName'].length === 0) {
//        validationErrors['firstName'] = 'First name is required';
//     }
//     if (!input.lastName) {
//         validationErrors['lastName'] = 'Last name is required';
//     }
//     if (!input.email ) {
//         validationErrors['email'] = 'Email is required'
//     }
    
//     if (!input.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
//         validationErrors['email'] = 'Invalid email format'
//     }
    
//     if (!input.password) {
//         validationErrors['password'] = 'Password is required'
//     }
    
//     if (input.password && input.password.length < 8 ) {
//         validationErrors['Password'] = 'Password should be at least 8 characters'
//     }

//     if (input.email) {
//         const existingUser = await prisma.user.findUnique({
//           where: { email: input.email },
//         });
    
//         if (existingUser) {
//           validationErrors['email'] = 'This email is already registered';
//         }
//       }

//     return validationErrors;
// }


export function validateUser(input) {
    const validationErrors = {}
  
    if (!('firstName' in input) || input['firstName'].length == 0) {
      validationErrors['firstName'] = 'First name is required'
    }

    if (!('lastName' in input) || input['lastName'].length == 0) {
        validationErrors['lastName'] = 'Last name is required'
      }

    if (!('email' in input) || input['email'].length == 0) {
      validationErrors['email'] = 'email cannot be blank'
    }
  
    if (!('password' in input) || input['password'].length == 0) {
      validationErrors['password'] = 'Password cannot be blank'
    }
  
    if ('password' in input && input['password'].length < 8) {
      validationErrors['password'] = 'Password should be at least 8 characters'
    }
  
    if ('email' in input && !input['email'].match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      validationErrors['email'] = 'Invalid email format'
    }
  
    return validationErrors
  }

