export const initialState = {
  posts: {
    data: [],
    singlePost: {},
    loading: {
      active: false,
      error: false,
    },
  },
  user: {
    status: 'logged-in',
    email: 'Michal@dev.pl',
  },
};
