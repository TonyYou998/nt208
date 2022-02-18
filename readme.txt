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

npx sequelize model:generate --name ten --attributes tenAtt:kieu
npx sequelize model:generate --name sltruycap --attributes idProfile:interger,sl:interger,user:VarChar

=> 1.tạo dbs bằng docker hoặc mysql workbench
    2.dùng lệnh npx sequelize db:migrate để ánh xạ các model thành table trong csdl.


- Cách sử dụng swagger
    + Miêu tả database

    /**
    * @swagger
    * components:
    *   schemas:
    *     Book:
    *       type: object
    *       required:
    *         - title
    *         - author
    *       properties:
    *         id:
    *           type: string
    *           description: The auto-generated id of the book
    *         title:
    *           type: string
    *           description: The book title
    *         author:
    *           type: string
    *           description: The book author
    *       example:
    *         id: d5fE_asz
    *         title: The New Turing Omnibus
    *         author: Alexander K. Dewdney
    */

    + Miêu tả các phương thức
    /**
    * @swagger
    * /books/{id}:
    *   get:
    *     summary: Get the book by id
    *     tags: [Books]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The book id
    *     responses:
    *       200:
    *         description: The book description by id
    *         contens:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/Book'
    *       404:
    *         description: The book was not found
    */


    /**
    * @swagger
    * /books/{id}:
    *  put:
    *    summary: Update the book by the id
    *    tags: [Books]
    *    parameters:
    *      - in: path
    *        name: id
    *        schema:
    *          type: string
    *        required: true
    *        description: The book id
    *    requestBody:
    *      required: true
    *      content:
    *        application/json:
    *          schema:
    *            $ref: '#/components/schemas/Book'
    *    responses:
    *      200:
    *        description: The book was updated
    *        content:
    *          application/json:
    *            schema:
    *              $ref: '#/components/schemas/Book'
    *      404:
    *        description: The book was not found
    *      500:
    *        description: Some error happened
    */

    /**
    * @swagger
    * /books/{id}:
    *   delete:
    *     summary: Remove the book by id
    *     tags: [Books]
    *     parameters:
    *       - in: path
    *         name: id
    *         schema:
    *           type: string
    *         required: true
    *         description: The book id
    * 
    *     responses:
    *       200:
    *         description: The book was deleted
    *       404:
    *         description: The book was not found
    */