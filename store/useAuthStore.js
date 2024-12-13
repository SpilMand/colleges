import { defineStore } from 'pinia';
import login from '~/api/auth/login';
import logout from '~/api/auth/logout';
import refresh from '~/api/auth/refresh';
import register from '~/api/auth/register';
import resend from '~/api/auth/resend';
import change from '~/api/auth/change';
import forgotPassword from '~/api/auth/forgot';
import resetPassword from '~/api/auth/reset';
import me from '~/api/auth/me';
import getUser from '~/api/users/getUser';

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: () => ({
    access_token: Date.now() < localStorage.getItem('expires_time') ? localStorage.getItem('access_token') : null,
    reg_token: null,
    tokenRefreshTimer: null,
    user: { id: localStorage.getItem('user_id'), first_name: localStorage.getItem('first_name') || null },
    popupAuthShow: false,
    // eslint-disable-next-line max-len
    questionLikesId: localStorage.getItem('question_likes')
      ? Object.values(JSON.parse(localStorage.getItem('question_likes')))
      : [],
    // eslint-disable-next-line max-len
    questionDislikesId: localStorage.getItem('question_dislikes')
      ? Object.values(JSON.parse(localStorage.getItem('question_dislikes')))
      : [],
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.access_token;
    },
  },

  actions: {
    setPopupAuthShow(state) {
      this.popupAuthShow = state;
    },

    setAccessToken(token) {
      this.access_token = token;
      localStorage.setItem('access_token', token);
    },

    setRegToken(token) {
      this.reg_token = token;
    },

    reset() {
      this.access_token = null;
      this.user.first_name = null;
      this.user.id = null;
      localStorage.removeItem('first_name');
      localStorage.removeItem('user_id');
      localStorage.removeItem('access_token');
      if (this.tokenRefreshTimer) {
        clearTimeout(this.tokenRefreshTimer);
        this.tokenRefreshTimer = null;
      }
    },

    // setLoading(loading) {
    //   this.loading = loading;
    // },

    setFirstName(firstName) {
      this.user.first_name = firstName;
      localStorage.setItem('first_name', firstName);
    },

    setUserId(id) {
      this.user.id = id;
      localStorage.setItem('user_id', id);
    },

    setUser(userData) {
      this.user = userData;
      this.setFirstName(userData.first_name);
      this.setUserId(userData.id);
    },

    getQuestionLikesId(userData) {
      this.questionLikesId = Object.values(userData.included).map((element) => element.id);
      localStorage.setItem('question_likes', JSON.stringify(this.questionLikesId));
    },
    getQuestionDislikesId(userData) {
      this.questionDislikesId = Object.values(userData.included).map((element) => element.id);
      localStorage.setItem('question_dislikes', JSON.stringify(this.questionDislikesId));
    },

    switchQuestionLike(id) {
      const index = this.questionLikesId.indexOf(id);
      if (index !== -1) {
        this.questionLikesId.splice(index);
      } else {
        this.questionLikesId.push(id);
      }
      localStorage.setItem('question_likes', JSON.stringify(this.questionLikesId));
    },
    switchQuestionDislike(id) {
      const index = this.questionDislikesId.indexOf(id);
      if (index !== -1) {
        this.questionDislikesId.splice(index);
      } else {
        this.questionDislikesId.push(id);
      }
      localStorage.setItem('question_dislikes', JSON.stringify(this.questionDislikesId));
    },

    async login(opts) {
      try {
        const response = await login(opts);
        if (response && response.access_token) {
          this.setAccessToken(response.access_token);
          localStorage.setItem('expires_time', Date.now() + response.expires_in * 1000);
          const userData = await me(response.access_token);
          const userDataWithLikes = await getUser(userData.id, response.access_token, { include: 'likeQuestions' });
          if (userDataWithLikes.included) {
            this.getQuestionLikesId(userDataWithLikes);
          }
          const userDataWithDislikes = await getUser(userData.id, response.access_token, {
            include: 'dislikeQuestions',
          });
          if (userDataWithDislikes.included) {
            this.getQuestionDislikesId(userDataWithDislikes);
          }

          this.setUser(userData);
          if (response.expires_in > 0) {
            this.startTokenRefreshTimer(response.expires_in);
          }
        } else {
          throw new Error('No access token received');
        }
      } catch (error) {
        this.reset();
        throw new Error('Неверная почта или пароль');
      }
    },

    async register(opts) {
      try {
        const response = await register(opts);
        if (response && response.access_token) {
          this.setRegToken(response.access_token);
        } else {
          throw new Error('No access token received');
        }
      } catch (error) {
        throw new Error('С таким email уже зарегистрирован пользователь');
      }
    },

    async forgotPassword(opts) {
      try {
        await forgotPassword(opts);
      } catch (error) {
        throw new Error('Неверная почта');
      }
    },

    async resend(opts) {
      try {
        await resend(opts, this.reg_token);
      } catch (error) {
        throw new Error('Почта уже верифицирована');
      }
    },

    async change(opts) {
      try {
        await change(opts, this.reg_token);
      } catch (error) {
        throw new Error('Такая почта уже существует');
      }
    },

    async resetPassword(opts) {
      try {
        const response = await resetPassword(opts, this.reg_token);
        if (response && response.access_token) {
          this.setRegToken(response.access_token);
        } else {
          throw new Error('No access token received');
        }
      } catch (error) {
        console.error(error);
      }
    },

    async logout() {
      try {
        if (this.access_token) {
          await logout(this.access_token);
          this.questionLikesId = [];
          localStorage.setItem('question_likes', JSON.stringify(this.questionLikesId));
          this.questionDislikesId = [];
          localStorage.setItem('question_dislikes', JSON.stringify(this.questionDislikesId));
          this.reset();
        } else {
          throw new Error('No access token to logout');
        }
      } catch (error) {
        console.error(error);
      }
    },

    startTokenRefreshTimer(expiresIn) {
      // Очистка существующего таймера перед установкой нового
      if (this.tokenRefreshTimer) {
        clearTimeout(this.tokenRefreshTimer);
        this.tokenRefreshTimer = null;
      }
      // Устанавливаем таймер на 10 секунд до истечения срока действия токена, если expiresIn меньше 600
      const refreshTime = expiresIn > 600 ? (expiresIn - 600) * 1000 : 0;
      if (refreshTime > 0) {
        this.tokenRefreshTimer = setTimeout(() => {
          this.refresh();
        }, refreshTime);
      } else {
        console.error(`Получено некорректное значение expiresIn: ${expiresIn}`);
      }
    },

    async refresh() {
      try {
        if (this.tokenRefreshTimer) {
          clearTimeout(this.tokenRefreshTimer);
          this.tokenRefreshTimer = null;
        }
        // this.setLoading(true);
        const response = await refresh(this.access_token);
        if (response && response.access_token) {
          this.setAccessToken(response.access_token);
          this.startTokenRefreshTimer(response.expires_in);
        } else {
          throw new Error('No access token received on refresh');
        }
      } catch (error) {
        console.error('Refresh token error:', error);
        this.reset();
      } finally {
        // this.setLoading(false);
      }
    },
  },
});
