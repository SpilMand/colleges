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

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: () => ({
    access_token: localStorage.getItem('access_token') || null,
    reg_token: null,
    tokenRefreshTimer: null,
    user: { first_name: localStorage.getItem('first_name') || null },
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.access_token;
    },
  },

  actions: {
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
      localStorage.removeItem('first_name');
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

    setUser(userData) {
      this.user = userData;
      this.setFirstName(userData.first_name);
    },

    async login(opts) {
      try {
        const response = await login(opts);
        if (response && response.access_token) {
          this.setAccessToken(response.access_token);
          const userData = await me(response.access_token);
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
        console.log('opts', opts);
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
        console.log(`Установка таймера обновления токена на ${refreshTime} миллисекунд`);
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
