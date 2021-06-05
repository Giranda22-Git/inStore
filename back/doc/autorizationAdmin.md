POST http://localhost:3000/admin/authorization - авторизация
входные параметры
{
  "Login": "admin",
  "Password": "password"
}
ответ сервера
{
  "result": true/false,
  "message": если result == true, то message это дынные пользователя,
  если result == false, то message == это строка с ошибкой Login is Bad или Password is Bad
}

для авторизации нужно создать пользователя, я создал тестовый аккаунт админа,
его нужно импортировать в коллекцию admins,
файл тестового админа в back/doc/admin.json