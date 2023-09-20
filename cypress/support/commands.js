// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("postPet", (petId) => {
  cy.request({
    method: "POST",
    url: `https://petstore.swagger.io/v2/pet/${petId}/uploadImage`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("postPetWithImage", (petId, formData) => {
  cy.request({
    method: "POST",
    url: `https://petstore.swagger.io/v2/pet/${petId}/uploadImage`,
    body: formData,
    headers: {
        'content-type': 'multipart/form-data'
      },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("addNewPet", (reqBody) => {
  cy.request({
    method: "POST",
    url: "https://petstore.swagger.io/v2/pet",
    body: reqBody,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("checkAddInvalidNewPet", (reqBody) => {
    cy.request({
      method: "PATCH",
      url: "https://petstore.swagger.io/v2/pet",
      body: reqBody,
      failOnStatusCode: false,
    });
  });

Cypress.Commands.add("updatePet", (reqBody) => {
  cy.request({
    method: "PUT",
    url: "https://petstore.swagger.io/v2/pet",
    body: reqBody,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("getPetsByFilter", (status) => {
  cy.request({
    method: "GET",
    url: `https://petstore.swagger.io/v2/pet/findByStatus?${status}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("findPetById", (petId) => {
  cy.request({
    method: "GET",
    url: `https://petstore.swagger.io/v2/pet/${petId}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("updatePetById", (petId, formData) => {
  cy.request({
    method: "POST",
    url: `https://petstore.swagger.io/v2/pet/${petId}`,
    body: formData,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("checkInvalidPetById", (petId, formData) => {
    cy.request({
      method: "PATCH",
      url: `https://petstore.swagger.io/v2/pet/${petId}`,
      body: formData,
      failOnStatusCode: false,
    });
  });

Cypress.Commands.add("deletePet", (petId) => {
  cy.request({
    method: "DELETE",
    url: `https://petstore.swagger.io/v2/pet/${petId}`,
    failOnStatusCode: false,
  });
});
