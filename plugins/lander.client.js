import { createPinia } from 'pinia';
import { useLanderStore } from '~/store/lander';

const pinia = createPinia();
const landerStore = useLanderStore(pinia);

// let formName = '';
landerStore.getLanderInfo();

export default defineNuxtPlugin(() => {
  // const metrika = useNuxtApp().$metrika;

  // Объект набора валидаторов
  const typesValid = {
    email(value) {
      return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value?.toLowerCase());
    },
  };

  // Функции для получения и установки кук
  const cookie = {
    get(name) {
      const results = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
      if (results) return decodeURIComponent(results[2]);
      return null;
    },
    set(name, valueData, optionsData) {
      const options = optionsData || {};
      let { expires } = options;
      if (typeof expires === 'number' && expires) {
        const d = new Date();
        d.setTime(expires);
        expires = d;
        options.expires = d;
      }
      if (expires && expires.toUTCString) {
        options.expires = expires.toGMTString();
      }
      const value = encodeURIComponent(valueData);
      let updatedCookie = `${name}=${value}`;

      const optionsKeys = Object.keys(options);
      for (let i = 0; i < optionsKeys.length; i += 1) {
        updatedCookie += `; ${optionsKeys[i]}`;
        const propValue = options[optionsKeys[i]];
        if (propValue !== true) {
          updatedCookie += `=${propValue}`;
        }
      }
      document.cookie = updatedCookie;
    },
  };

  // Сохранение и загрузка данных форм из хранилища
  const storage = {
    save(name, data) {
      formName = name;
      localStorage.setItem(name, JSON.stringify(data));
    },

    load(name) {
      const value = localStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    },
  };

  // Валидатор для формы
  // formData - массив
  // [ { value: "", type: ""} ]
  function valid(formData) {
    for (let i = 0; i < formData.length; i += 1) {
      if (!('value' in formData[i])) return false; // Проверка на наличие value в объекте данных
      if (formData[i].value === '') return false; // Проверка на пустую строку в value
      if ('type' in formData[i]) {
        // Проверка на наличие type в объекте данных
        if (!(formData[i].type in typesValid)) return false; // Проверка на наличие валидатора из type
        if (!typesValid[formData[i].type](formData[i].value)) return false; // Вызов валидатора, конструкция для eslint
      }
    }
    return true;
  }

  // Функция оправки данных на сервер
  // formData - объект из данных формы
  // settings = объект переопределения настроек

  function getConfig(unit, type, land, partner, version, utms) {
    let url = '';
    // Код для отбивочного письма
    // let enkod = config.public.enkod;

    if (landerStore.landerSettings) {
      // Письмо отправляется со всех форм кроме формы для партнеров
      // eslint-disable-next-line max-len
      // if (formName !== 'partnersform') {
      //   url = `https://syn.su/lander.php?r=land/index&unit=${unit}&partner=${partner}&version=${version}${
      //     type ? `&type=${type}` : ''
      //   }&land=${land}&ignore-thanksall=1`;
      // } else {
      url = `https://syn.su/lander.php?r=land/index&unit=${unit}&partner=${partner}&version=${version}${
        type ? `&type=${type}` : ''
      }&land=${land}&ignore-thanksall=1`;
      // }

      // Если есть utm метки, то передаем их в урл
      if (Object.keys(utms).length) {
        Object.entries(utms).forEach(([key, value]) => {
          url += `&${key}=${value}`;
        });
      }
    }
    return url;
  }

  function send(formData, settingsData, route) {
    let { unit, type } = landerStore.landerSettings;
    const { land, partner, version, redirectUrl } = landerStore.landerSettings;
    const utms = useCookie('utms');
    const { noRedirect } = settingsData;

    if (route) {
      unit = 'edu_platform';
      type = undefined;
    }

    const url = getConfig(unit, type, land, partner, version, utms.value);

    const settingSend = {
      redirectUrl: route ? `${route}thanks` : redirectUrl,
    };

    return new Promise((resolve, reject) => {
      //let data = new FormData();
      let data = {};

      // Получение и переназначение настроект
      const settings = settingsData || {};
      const settingsSendData = settingSend;
      const settingsKeys = Object.keys(settingsSendData);
      for (let i = 0; i < settingsKeys.length; i += 1) {
        let value;
        if (settingsKeys[i] in settings) value = settings[settingsKeys[i]];
        else value = settingsSendData[settingsKeys[i]];

        //data.append(settingsKeys[i], value);
        data[settingsKeys[i]] = value;
      }

      // Обработка и подготовка данных для отправки

      if (Object.keys(utms.value).length) {
        if (formData.comments) {
          // eslint-disable-next-line no-param-reassign
          formData.comments = `${formData.comments}. Utm-метки получены по ссылке: ${landerStore.followedLink}`;
        } else {
          // eslint-disable-next-line no-param-reassign
          formData.comments = `Utm-метки получены по ссылке: ${landerStore.followedLink}`;
        }
      }

      const formDataKeys = Object.keys(formData);

      for (let i = 0; i < formDataKeys.length; i += 1) {
        //data.append(formDataKeys[i], formData[formDataKeys[i]]);

        data[formDataKeys[i]] = formData[formDataKeys[i]];
      }

      data.personalDataAgree = 'on';
      data.mergelead = `id_${Math.random().toString(36).substr(2, 9)}${Math.round(new Date().getTime() / 1000)}`;
      data.url_location = document.location.href;
      data.entry_point = document.location.host;
      data.analytics_id = cookie.get('_ga');

      // data.append('personalDataAgree', 'on');
      // data.append(
      //   'mergelead',
      //   `id_${Math.random().toString(36).substr(2, 9)}${Math.round(new Date().getTime() / 1000)}`,
      // );
      // data.append('url_location', document.location.href);
      // data.append('entry_point', document.location.host);
      // data.append('analytics_id', cookie.get('_ga'));
      // Отправка данных

      const opts = {
        // headers: {
        //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        //   'Accept': '*/*',
        // },
      };

      useRequest(url, 'post', opts, data)
        .then(async (response) => {
          resolve({
            formData: data,
            response,
          });

          if (!noRedirect) {
            navigateTo({ path: settingSend.redirectUrl });
          }
        })
        .catch((error) => {
          reject(error);
          console.error(error);
        });
    });
  }

  if (process.client) {
    // Системная информация лендера
    window.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.code === 'KeyI' && landerStore.settings) {
        event.preventDefault();
        let modal = document.querySelector('.lander-message');

        if (!modal) {
          modal = document.createElement('div');
          const modalClose = document.createElement('div');

          modalClose.classList.add('lander-message-close');
          modal.classList.add('lander-message');
          modal.append(modalClose);

          Object.entries(landerStore.settings).forEach(([key, value]) => {
            const item = document.createElement('div');
            item.innerHTML = `<strong>${key}</strong>: <span>${value}</span>`;
            item.classList.add('lander-message-item');
            modal.append(item);
          });
          document.body.append(modal);
        }
      }
    });

    // Скрытие системной информации лендера по клику на X
    window.addEventListener('click', (event) => {
      if (event.target.className === 'lander-message-close') {
        const landerMessage = document.querySelector('.lander-message');

        landerMessage.parentNode.removeChild(landerMessage);
      }
    });
  }

  // Скрытие системной информации лендера при переходе на другую страницу
  const closeLanderInfo = () => {
    const landerMessage = document.querySelector('.lander-message');
    if (landerMessage) landerMessage.parentNode.removeChild(landerMessage);
  };

  const lander = {
    send,
    valid,
    closeLanderInfo,
    cookie,
    storage,
  };

  return {
    provide: {
      lander,
    },
  };
});
