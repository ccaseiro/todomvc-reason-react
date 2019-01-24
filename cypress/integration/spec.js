describe("spec", () => {
  // setup these constants to match what TodoMVC does
  const TODO_ITEM_ONE = "buy some cheese";
  const TODO_ITEM_TWO = "feed the cat";
  const TODO_ITEM_THREE = "book a doctors appointment";

  const selectors = {
    newTodo: ".new-todo",
    todoItems: ".todo-list li",
    main: ".main",
    footer: ".footer"
  };

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

    it("should allow me to add todo items", function() {
      // create 1st todo
      cy.get(selectors.newTodo).type(`${TODO_ITEM_ONE}{enter}`);

      // make sure the 1st label contains the 1st todo text
      cy.get(selectors.todoItems)
        .eq(0)
        .find("label")
        .should("contain", TODO_ITEM_ONE);

      // create 2nd todo
      cy.get(selectors.newTodo).type(`${TODO_ITEM_TWO}{enter}`);

      // make sure the 2nd label contains the 2nd todo text
      cy.get(selectors.todoItems)
        .eq(1)
        .find("label")
        .should("contain", TODO_ITEM_TWO);
    });

    it("should clear text input field when an item is added", function() {
      cy.get(selectors.newTodo).type(`${TODO_ITEM_ONE}{enter}`);
      cy.get(selectors.newTodo).should("have.text", "");
    });

    it("should append new items to the bottom of the list", function() {
      // this is an example of a custom command
      // which is stored in tests/_support/spec_helper.js
      // you should open up the spec_helper and look at
      // the comments!
      cy.createDefaultTodos().as("todos");

      cy.get("@todos")
        .eq(0)
        .find("label")
        .should("contain", TODO_ITEM_ONE);
      cy.get("@todos")
        .eq(1)
        .find("label")
        .should("contain", TODO_ITEM_TWO);
      cy.get("@todos")
        .eq(2)
        .find("label")
        .should("contain", TODO_ITEM_THREE);
    });

    it("should trim text input", function() {
      // this is an example of another custom command
      // since we repeat the todo creation over and over
      // again. It's up to you to decide when to abstract
      // repetitive behavior and roll that up into a custom
      // command vs explicitly writing the code.
      cy.createTodo(`    ${TODO_ITEM_ONE}    `);

      // we use as explicit assertion here about the text instead of
      // using 'contain' so we can specify the exact text of the element
      // does not have any whitespace around it
      cy.get(selectors.todoItems)
        .eq(0)
        .find("label")
        .should("have.text", TODO_ITEM_ONE);
    });

    it("should show #main and #footer when items added", function() {
      cy.createTodo(TODO_ITEM_ONE);
      cy.get(selectors.main).should("be.visible");
      cy.get(selectors.footer).should("be.visible");
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
