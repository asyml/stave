BEGIN TRANSACTION;
INSERT INTO "auth_user" ("id","password","last_login","is_superuser","username","last_name","email","is_staff","is_active","date_joined","first_name") VALUES 
 (2,'pbkdf2_sha256$180000$s0JH3mcJOxvY$vfOaYjGRjSsGTQ1br2cyq4BJ4kD7OHXuBnKg1gqOwg0=','2020-12-03 08:14:07.372065',1,'admin','','admin@stave.com',1,1,'2020-12-03 08:13:23.439785',''),
 (3,'pbkdf2_sha256$180000$If72pDVs3GxT$RJPLri7XBHtswSvnvfgeUp0WyMY/7KvbVUfvC6QkFG4=','2020-12-03 08:20:05.805555',0,'normal1','','',0,1,'2020-12-03 08:14:34.947900',''),
 (4,'pbkdf2_sha256$180000$OWJVlQn3xT6q$1AeGLAr46ZhpMjVsJVl+MTOZdXLYMtF/f/kuxRqQ1m0=',NULL,0,'normal2','','',0,1,'2020-12-03 08:14:52.948312','');
COMMIT;
