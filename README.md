# 🛡️ NestJS Dynamic RBAC Example

This is an example project demonstrating how to implement **Dynamic Role-Based Access Control (RBAC)** in a [NestJS](https://nestjs.com/) backend application using TypeORM and PostgreSQL.

---

## 🎯 Project Purpose

The goal of this project is to **demonstrate how to build a flexible and scalable permission system using dynamic RBAC** in NestJS. Instead of hardcoding roles and permissions, this project allows you to define them in the database and assign them to users dynamically.

This approach is commonly used in large-scale applications where:

- Permissions need to be easily configurable without code changes.
- Users can have different roles in different contexts (e.g., per project, per organization).
- Fine-grained access control is required.

---

## 🔐 What is RBAC?

**Role-Based Access Control (RBAC)** is an approach to restricting system access based on the roles of individual users within an organization. Users are assigned to roles, and roles are assigned permissions.

In this project:

- Users are dynamically assigned to roles.
- Roles are linked to multiple permissions.
- Access to endpoints is granted or denied based on the user's roles and their associated permissions.

---

## 🧱 Tech Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Database**: PostgreSQL
- **Authorization**: Custom RBAC Guard

---

## 🗄️ Database Design

Below is the database schema used for the RBAC system.

![NestJs_DynamicRbacDbDiagram](https://github.com/user-attachments/assets/9c37c97c-304c-487f-9ad4-cf2236c5c374)

This design supports:

- **Assigning multiple roles to a single user.**
- **Defining reusable roles across different users.**
- **Adding/removing permissions dynamically from the DB.**

---

## 🧪 Key Features

- 🧩 **Modular architecture** with NestJS best practices
- 🔐 **JWT authentication** with AuthGuard
- 🎭 **Custom RBAC Guard** that checks user permissions based on roles
- 📥 **Dynamic seeding** for roles and permissions
- 📤 **Database-first control**: No need to change code to add/remove roles or permissions

