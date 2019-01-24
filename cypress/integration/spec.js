describe("spec", () => {
  beforeEach(() => {
    cy.visit("build/index.html");
  });

  context("No Todos", () => {
    it("should hide #main and #footer", () => {
      cy.get(".header").should("exist");
      cy.get(".main").should("not.exist");
      cy.get(".footer").should("not.exist");
    });
  });

  context("New todo", () => {
    it("should focus on the todo input field", function() {
      cy.focused().should("have.class", "new-todo");
    });
  });

  context("Mark all as complete", () => {});
  context("Item", () => {});
  context("Editing", () => {});
  context("Counter", () => {});
  context("Clear completed button", () => {});
  context("Persistence", () => {});
  context("Routing", () => {});
});
