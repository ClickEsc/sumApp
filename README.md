## 🚀 Your SUMmer App | Приложение для сложения чисел

1. **Запуск приложения**

    :one: Клонировать репозиторий
      ```
      git clone https://github.com/ClickEsc/sumApp.git
      ```
    :two: Установить gatsby-cli для работы с gatsby через командную строку
      ```
      npm install -g gatsby-cli
      ```
    :three: Установить зависимости 
      ```
      npm install
      ```
    :four: Запустить проект локально на localhost:8000/
      ```
      gatsby develop || npm run start
      ```

2.  **Структура проекта**

```

    ├── .cache
    ├── node_modules           # Зависимости проекта
    ├── public                 # Скомпилированные файлы
    ├── src
      ├── assets               # Шрифты
      ├── components           # Компоненты приложения по папкам (jsx + scss)
      ├── helpers              # Для вспомогательных инструментов / общих функций
      ├── images               # Картинки
      ├── pages                # Страницы приложения
      ├── store                # Стор
      ├── index.css
    ├── .gitignore
    ├── gatsby-config.js
    ├── package-lock.json
    ├── package.json
    └── README.md
    
 ```