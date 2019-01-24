describe("spec", () => {
  beforeEach(() => {
    cy.visit("build/index.html");
  });

  context("No Todos", () => {
    it("should hide #main and #footer", () => {
      cy.get(".header");
      cy.get(".main").should("not.exist");
      cy.get(".footer").should("not.exist");
    });
  });

  context("New todo", () => {});
  context("Mark all as complete", () => {});
  context("Item", () => {});
  context("Editing", () => {});
  context("Counter", () => {});
  context("Clear completed button", () => {});
  context("Persistence", () => {});
  context("Routing", () => {});
});
