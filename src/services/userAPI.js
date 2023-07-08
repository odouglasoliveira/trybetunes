import defaultProfile from '../images/do-utilizador.png';

const USER_KEY = 'user';

const readUser = () => JSON.parse(localStorage.getItem(USER_KEY));
const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

export const getUser = async () => {
  let user = await readUser();
  if (user === null) {
    user = {};
  }
  return user;
};

export const createUser = (user) => {
  const emptyUser = {
    name: '',
    email: 'exemplo@email.com',
    image: defaultProfile,
    description: 'Insira sua descrição',
  };
  saveUser({ ...emptyUser, ...user });
};

export const updateUser = (updatedUser) => {
  saveUser({ ...updatedUser });
};
