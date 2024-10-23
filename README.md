## POS сервер  

Промежуточное  ПО  для  подключения  принтеров  и торгового оборудования  к  учетным  программам, работающим  в онлайн режиме (через браузер). 
Разработано для проекта <https://github.com/leon-mbs/zstore> но может использоватся  и с другми системами.  
Сервер  реализует  API к которому учетная програма  обращается  с браузера с  помощью javascript запроса как  к  обычному  веб серверу. 
Для обмена  данными используется  формат json.

Готовой реадизацией является  режим  принт-сервера для работы  с  чековыми  принтерами  и принтерами этикеток подключаемыми  по  USB. 
Остальные  режимы реадлизуются  кастомно  в  зависимлсти от типа  оборудования  

Адрес сервера задается  в  конфигурационных файлах.  По умолчанию http://127.0.0.1:8080  
Проверка  сервера с  браузера  http://127.0.0.1:8080/check  

### Работа с  принтером  (режим принт сервера)
Проверка  принтера с  браузера  http://127.0.0.1:8080/testprint  
На принтере должна распечатася тестовая  строка    

POST /print  - точка  входа для печати.  Учетная програма должна  отправить массив  байтов типа  [34,456,54]  которые  принт сервер 
перенаправит на принтер.  Если все  в  порядке  функция возвращает пустую строку иначе  сообщение об ошибке  


### Работа с весами
POST /weight  
content-type: application/json  
 {  
    "posid":1   //id pos терминала  или кассового места   
 } 
 
 ответ  
 {  
    "success":true,  
    "weight":1.6    //вес     
 } 


 ### Банковский  терминал  
 TODO    


 ### Клиент-банк
 TODO   
 
