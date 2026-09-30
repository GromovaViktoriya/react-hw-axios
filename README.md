# Взаимодействие с API и Сетевые запросы

В данном разделе задокументирована архитектура взаимодействия клиентской части приложения с сервером, а также описаны основные методы работы с данными.

## 1. Используемый API
В качестве backend-сервиса используется готовый REST API: [https://todo-redev.onrender.com/docs](https://todo-redev.onrender.com/docs).

## 2. Как устроен Axios Instance
Для централизованной настройки сетевых запросов в проекте создан выделенный экземпляр `axiosInstance` с помощью метода `axios.create()`. Он конфигурируется один раз при инициализации, что избавляет от дублирования настроек в каждом отдельном запросе:

* **`baseURL`**: Базовый URL сервера берется из переменных окружения (`import.meta.env.VITE_API_BASE_URL`). Это позволяет приложению легко переключаться между локальным сервером для разработки и реальным адресом на продакшене без изменения кода.
* **`headers`**: По умолчанию для всех запросов устанавливается заголовок `'Content-Type': 'application/json'`, который сообщает серверу, что тело запроса передается в формате JSON.

## 3. Зачем нужны Interceptors (Перехватчики)
Интерсепторы работают как middleware (промежуточное ПО) для сетевых запросов. Они позволяют вмешиваться в процесс отправки запроса или получения ответа глобально.

* **Request Interceptor (Перехватчик запросов):** Используется для управления авторизацией. Перед каждой отправкой запроса скрипт автоматически ищет `access_token` в куках. Если токен найден, он прикрепляется к заголовкам в формате `Authorization: Bearer <token>`. Благодаря этому не нужно вручную прокидывать токен в каждую функцию.
* **Response Interceptor (Перехватчик ответов):** Предназначен для глобальной обработки серверных ошибок. Отслеживает ошибку `401 Unauthorized` (когда токен истек или отсутствует). В этой точке реализован перехват для последующей логики принудительного выхода из системы.

## 4. Примеры запросов из проекта

Проект реализует все основные методы для CRUD-операций.

### GET (Получение данных)
Используется для запроса информации с сервера без её изменения.
```javascript
export const fetchData = async () => {
    try {
        const response = await axiosInstance.get('/api/todos')
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
```

### POST (Создание записи)
Отправляет объект с данными новой задачи. Сервер сам генерирует ID и возвращает готовый элемент.

```javascript
export const createItem = async (value) => {
    try {
        const response = await axiosInstance.post(`/api/todos`, value);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
```
### PATCH (Обновление записи)
Обновляет существующую задачу по ID. Используется PATCH, так как передаются только измененные поля (например, только title), а не весь объект целиком.

```javascript
export const updateItem = async (taskId, values) => {
    try {
        await axiosInstance.patch(`/api/todos/${taskId}`, values);
    } catch (error) {
        return Promise.reject(error);
    }
}
```
### DELETE (Удаление записи)
Удаляет конкретную задачу по её идентификатору.

```javascript
export const deleteItem = async (taskId) => {
    try {
        await axiosInstance.delete(`/api/todos/${taskId}`);
    } catch (error) {
        return Promise.reject(error);
    }
}
```