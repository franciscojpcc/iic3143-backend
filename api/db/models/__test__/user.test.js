const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../tu_app"); // Reemplaza con la ruta correcta a tu aplicación

const User = require("../ruta_al_modelo/User"); // Reemplaza con la ruta correcta a tu modelo

describe("User API", () => {
  // Antes de ejecutar las pruebas, puedes configurar la base de datos de prueba si es necesario

  it("debería crear un nuevo usuario", async () => {
    const userData = {
      name: "John Doe",
      phone: "123456789",
      address: "123 Main St",
      email: "john@example.com",
      rut: "123456789",
      role: "user",
      username: "john_doe",
      password: "password123",
      token: "token123",
    };

    const response = await supertest(app)
      .post("/user/create")
      .send(userData)
      .expect(201);

    // Verifica que la respuesta sea la esperada
    expect(response.body).to.have.property("id");
    expect(response.body.name).to.equal(userData.name);
    // Agrega más expectativas según tus necesidades
  });

  // Agrega más pruebas según sea necesario

  // Después de ejecutar las pruebas, puedes realizar tareas de limpieza si es necesario
});
