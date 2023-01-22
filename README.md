# ecommerce-marketplace

### Schema (table creation code present in schema.txt file)
* user -> `id`, `username`, `password`,`type`

* products -> `id`,`seller_id`,`name`,`price`

* order -> `order_id`,`seller_id`,`user_id`,`product_id`

### How to run
1. Run npm install
2. No need to replace the mysql config as it's using freemysqlhosting. If not working use your mysql config.

#### API POST MAN COLLECTION IS INCLUDED IN REPO

#### Steps to use
* Register user with register API. 
* Login with the same username, password, and type.
* Use the other api's with auth token received from login api.(add this token in header with key auth-token)
