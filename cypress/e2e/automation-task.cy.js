/// <reference types="cypress" />

describe("Test Automation", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", () => {
      return false;
    });
    cy.visit("https://useinsider.com/");
  });

  it("Visit the page and check Insider home page is opened", () => {
    Cypress.on("uncaught:exception", () => {
      return false;
    });
    cy.visit("https://useinsider.com/");
    cy.url().should("include", "useinsider.com");
    cy.xpath(
      '//body/div[@id="revamp-head-desktop"]/div[1]/div[1]/div[1]/div[1]/h1[1]'
    ).should("be.visible");
  });

  it("Select the “Company” menu in the navigation bar, select “Careers” and check Career page, its Locations, Teams, and Life at Insider blocks are open or not", () => {
    cy.visit("https://useinsider.com/");
    cy.xpath('//a[contains(text(),"Company")]').should("be.visible");
    cy.xpath('//a[contains(text(),"Company")]').click();
    cy.xpath('//a[contains(text(),"Careers")]').click();
    cy.xpath('//a[contains(text(),"See all teams")]').should("be.visible");
    cy.xpath('//a[contains(text(),"See all teams")]').should(
      "have.attr",
      "href"
    );
    cy.xpath('//h3[contains(text(),"Our Locations")]').should("be.visible");
    cy.xpath('//p[contains(text(),"New York")]').should(
      "not.have.attr",
      "href"
    );
    cy.xpath('//h2[contains(text(),"Life at Insider")]').should("be.visible");
    cy.xpath(
      "//body/div[1]/section[4]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[5]/div[1]"
    ).should("not.have.attr", "href");
  });

  it("Filter and check the results of job list according to the Location: 'Istanbul, Turkey', and Department: 'Quality Assurance'", () => {
    cy.visit("https://useinsider.com/careers/quality-assurance/");
    cy.xpath('//a[contains(text(),"See all QA jobs")]').should("be.visible");
    cy.xpath('//a[contains(text(),"See all QA jobs")]').click({ force: true });
    cy.xpath(
      '//body/section[@id="career-position-filter"]/div[1]/div[1]/div[2]/div[1]/form[1]/div[1]/span[1]/span[1]/span[1]'
    ).should("be.visible");
    cy.xpath(
      '//body/section[@id="career-position-filter"]/div[1]/div[1]/div[2]/div[1]/form[1]/div[1]/span[1]/span[1]/span[1]'
    ).click();

    // Filter jobs by Location: “Istanbul, Turkey”

    cy.get('[id="select2-filter-by-location-container"]').should("be.visible");
    cy.get('[id="select2-filter-by-location-container"]').click();
    cy.wait(2000);
    cy.get("select#filter-by-location").select("Istanbul, Turkey", {
      force: true,
    });

    // Check that all jobs' Department contains “Quality Assurance”, and Location contains “Istanbul, Turkey”
    // Click the “View Role” button and check that this action redirects us to the Lever Application form page

    cy.get('[data-team="qualityassurance"]')
      .its("length")
      .then((count) => {
        for (let index = 1; index <= count; index++) {
          cy.get(`#jobs-list > div:nth-child(${index}) > div > div`).should(
            "have.text",
            "Istanbul, Turkey"
          );
          cy.get(`#jobs-list > div:nth-child(${index}) > div > span`).should(
            "have.text",
            "Quality Assurance"
          );
          cy.get(`#jobs-list > div:nth-child(${index}) > div > a`)
            .should("have.attr", "href")
            .and("include", "https://jobs.lever.co/");
          cy.get(`#jobs-list > div:nth-child(${index}) > div > a`).click();
        }
      });
  });

  it("Check sample FAILED CASE screenshot should be under the screenshot folder", () => {
    cy.xpath(
      "//body[1]/section[3]/div[1]/div[1]/div[2]/div[1]/div[1]/a[1]"
    ).click();
  });
});

describe("Test Automation - API", () => {
  it("Upload an image with an empty image", () => {
    const petId = Math.floor(Math.random() * 101);
    cy.postPet(petId).then((response) => {
      expect(response.status).to.eql(415);
    });
  });

  it("Upload an image", () => {
    const petId = Math.floor(Math.random() * 101);
    const formData = new FormData();

    cy.fixture("logo.png", "binary")
      .then((image) => Cypress.Blob.binaryStringToBlob(image))
      .then((blob) => {
        formData.append("file", blob, "logo.png");
      });

    cy.postPetWithImage(petId, formData).then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("Add a new pet to the store", () => {
    let reqBody = {
      id: 0,
      category: {
        id: 0,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("Check invalid input for adding a new pet in the store", () => {
    let reqBody = {
      id: 0,
      category: {
        id: 0,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    cy.checkAddInvalidNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(405);
    });
  });

  it("Update an existing pet", () => {
    let reqBody = {
      id: 0,
      category: {
        id: 0,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    cy.updatePet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("Find Pets by status is available", () => {
    cy.getPetsByFilter("status=available").then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("Find Pets by status is pending", () => {
    let reqBody = {
      id: 1,
      category: {
        id: 1,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "pending",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });

    cy.getPetsByFilter("status=pending").then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("Find Pets by status is sold", () => {
    let reqBody = {
      id: 1,
      category: {
        id: 1,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "sold",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });

    cy.getPetsByFilter("status=sold").then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("Find Pet by ID", () => {
    let reqBody = {
      id: 5,
      category: {
        id: 5,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "sold",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });

    cy.findPetById(reqBody.id).then((response) => {
      expect(response.status).to.eql(200);
      expect(reqBody.id).to.eql(response.body.id);
    });
  });

  it("Check 'NOT FOUND' Pet by ID", () => {
    let reqBody = {
      id: 5,
      category: {
        id: 5,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "sold",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });

    cy.findPetById("999999").then((response) => {
      expect(response.status).to.eql(404);
      expect(response.body.message).to.eql("Pet not found");
    });
  });

  it("Check 'INVALID ID' Pet by ID", () => {
    let reqBody = {
      id: 5,
      category: {
        id: 5,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "sold",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });

    cy.findPetById("+%").then((response) => {
      expect(response.status).to.eql(400);
    });
  });

  it("Updates a pet in the store with form data", () => {
    let reqBody = {
      id: 6,
      category: {
        id: 6,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });

    let formData = {
      name: "cat",
    };

    cy.updatePetById(reqBody.id, formData.name).then((response) => {
      expect(response.status).to.eql(200);
      console.log(response.body.message);
    });
  });

  it("Check invalid input for updating a pet in the store with form data", () => {
    let reqBody = {
      id: 6,
      category: {
        id: 6,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    let formData = {
      name: "cat",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });

    cy.checkInvalidPetById(reqBody.id, formData.name).then((response) => {
      expect(response.status).to.eql(405);
      console.log(response.body.message);
    });
  });

  it("Deletes a pet", () => {
    let reqBody = {
      id: 8,
      category: {
        id: 8,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });

    cy.deletePet(reqBody.id).then((response) => {
      expect(response.status).to.eql(200);
    });
  });

  it("Check 'NOT FOUND' Pet for deleting a pet", () => {
    let reqBody = {
      id: 8,
      category: {
        id: 8,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });

    cy.deletePet("999999").then((response) => {
      expect(response.status).to.eql(404);
    });
  });

  it("Check 'INVALID ID' Pet for deleting a pet", () => {
    let reqBody = {
      id: 8,
      category: {
        id: 8,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: "available",
    };

    cy.addNewPet(reqBody).then((response) => {
      expect(response.status).to.eql(200);
    });

    cy.deletePet("+%").then((response) => {
      expect(response.status).to.eql(400);
    });
  });
});
