# User Guide

An example database is provided for users to get familiar with Stave. [Go to example](#example-database)

## Permission System

This chapter is to familiarize users with the permission system in Stave.

With permission system, the user will be able to assign permission **per project**, **per project**. For example, user Joe could be allowed to edit project A but not project B. 



### Preparation (will be moved into README when merged)

  ```
pip install django-guardian
  ```

### Permission Design

#### 6 Per Object Permissions: 
- read_project -- view **a certain project** and its documents
- edit_annotation -- add, edit and delete annotations in documents of **a certain project**
- edit_text -- edit text pack and other metadata of documents, of **a certain project**
- edit_project -- edit metadata of **a certain project**
- remove_project -- remove documents in **a certain project**
- new_project -- create new documents in **a certain project**

#### 2 Default Django Permissions:
- add_project -- create new project
- view_project -- access all projects

Besides, a staff user and the owner (default the creator) of the project has all access on this project (with documents inside).

### How to assign permissions

Firstly, log in as a staff member through Django admin site, which is http://localhost:8000/admin/



#### To assign permission per object:

1. click the project
   

![1602340639614](https://user-images.githubusercontent.com/38875181/95658510-7f3ca400-0b4d-11eb-88b4-0dd9babbf928.png)


2. click "Object Permissions" in the upper-right corner
![1602340701593](https://user-images.githubusercontent.com/38875181/95658512-85cb1b80-0b4d-11eb-99cc-67d22a6e0ec4.png)


3. Enter exact user name to find or edit users already modified before

![1602340789060](https://user-images.githubusercontent.com/38875181/95658522-9b404580-0b4d-11eb-8a8c-bf95872a392f.png)

4. Assign permissions.

   Reminder: Only assign permissions mentioned in Permission Design, others are not yet configurated.

![1602340885885](https://user-images.githubusercontent.com/38875181/95658517-8e235680-0b4d-11eb-8bf0-cc28965a9435.png)

## Example Database

**Users:**

- *normal1*
  - password: *example1*
- *normal2*
  - password: *example2*

**Projects:**

- *example-project*-1
  - owner is user *normal1*
- *example-project-2*
  - owner is *normal2*

