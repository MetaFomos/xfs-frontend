export enum ERoute {
    DEFAULT = '/',
    DASHBOARD = '/dashboard',
    SIGNIN = '/signin',
    SIGNUP = '/signup',
    GITHUBAUTH = '/githubauth',
    CREATEIDEA = '/createidea',
    PENDING = '/pending',
    APPROVED = '/approved',
    PROPOSED = '/proposed',
    FUNDREQUIRED = '/fundrequired',
    INPROGRESS = '/inprogress',
    COMPLETED = '/completed',
    PROFILE = '/profile',
}

export const categories = [
    { id: 0, label: "Development" }, 
    { id: 1, label: "Marketing" }, 
    { id: 2, label: "Improvement" }, 
  ]

// export const categories = (id: number) => {
//     switch (id) {
//         case 0:
//             return 'Development';
//             break;
//         case 1:
//             return 'Marketing';
//             break;
//         case 2:
//             return 'Improvement';
//             break;
//         default:
//             break;
//     }
// }