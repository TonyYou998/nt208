- config:chứa file config kết nối database.
    + "username": "Tên user dùng trong mysql workbench hoặc docker mặt định là root", "password": "password khi tạo dbs","database": "tên dbs vd:nt208","host": "127.0.0.1","dialect": "mysql"
- controller:chứa code xử lý chính
- middlewares: chứa code validate input,authenticate,authorize...
- migrations: code ánh xạ thành các table
- model: chứa các class model vd: User là 1 model
- playgroud: nơi thử nghiệm code
- router: 
    + nameRouter: chứa router của từng module vd: userRouter,productRouter
    + rootRouter: nơi gom router của tất cả module lại.
- seeder: nơi fake data cho dbs



=> 1.tạo dbs bằng docker hoặc mysql workbench
    2.dùng lệnh npx sequelize db:migrate để ánh xạ các model thành table trong csdl.


