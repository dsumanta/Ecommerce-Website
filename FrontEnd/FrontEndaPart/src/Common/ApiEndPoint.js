const backEndDomain = "http://localhost:8080"
export const SummeryAPI = {
    signUp :{
        URL:`${backEndDomain}/api/signUp`,
        method:"post"
    },
    signIn:{
        URL:`${backEndDomain}/api/signIn`,
        method:"post"
    },
    current_user : {
        URL:`${backEndDomain}/api/user-details`,
        method:"get"
    },
    logout_user : {
        URL:`${backEndDomain}/api/userLogout`,
        method:"get"
    },
    allUser : {
        URL:`${backEndDomain}/api/all-user`,
        method:'get'
    },
    updateUser:{
        URL:`${backEndDomain}/api/update-user`,
        method:"post"
    }
}