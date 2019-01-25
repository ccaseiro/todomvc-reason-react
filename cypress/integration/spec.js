describe("spec", () => {
  // setup these constants to match what TodoMVC does
  const TODO_ITEM_ONE = "buy some cheese";
  const TODO_ITEM_TWO = "feed the cat";
  const TODO_ITEM_THREE = "book a doctors appointment";

  const selectors = {
    newTodo: ".new-todo",
    todoItems: ".todo-list li",
    main: ".main",
    footer: ".footer",
    toggleAll: ".toggle-all"
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
      // does not have any whitespace around itjkk
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

  context("Mark all as complete", () => {
    beforeEach(function() {
      // This is an example of aliasing
      // within a hook (beforeEach).
      // Aliases will automatically persist
      // between hooks and are available
      // in your tests below
      cy.createDefaultTodos().as("todos");
    });

    it("should allow me to mark all items as completed", function() {
      // complete all todos
      // we use 'check' instead of 'click'
      // because that indicates our intention much clearer
      cy.get(selectors.toggleAll).check({ force: true });

      // get each todo li and ensure its class is 'completed'
      cy.get("@todos")
        .eq(0)
        .should("have.class", "completed");
      cy.get("@todos")
        .eq(1)
        .should("have.class", "completed");
      cy.get("@todos")
        .eq(2)
        .should("have.class", "completed");
    });

    it("should allow me to clear the complete state of all items", function() {
      // check and then immediately uncheck
      cy.get(selectors.toggleAll).check({ force: true });
      cy.get(selectors.toggleAll).uncheck({ force: true });

      cy.get("@todos")
        .eq(0)
        .should("not.have.class", "completed");
      cy.get("@todos")
        .eq(1)
        .should("not.have.class", "completed");
      cy.get("@todos")
        .eq(2)
        .should("not.have.class", "completed");
    });

    it("complete all checkbox should update state when items are completed / cleared", function() {
      cy.get(selectors.toggleAll).check({ force: true });
      // this assertion is silly here IMO but
      // it is what TodoMVC does
      cy.get(selectors.toggleAll).should("be.checked");

      // alias the first todo and then click it
      cy.get(selectors.todoItems)
        .eq(0)
        .as("firstTodo")
        .find(".toggle")
        .uncheck({ force: true });

      // reference the .toggle-all element again
      // and make sure its not checked
      cy.get(selectors.toggleAll).should("not.be.checked");

      // reference the first todo again and now toggle it
      cy.get("@firstTodo")
        .find(".toggle")
        .check({ force: true });

      // assert the toggle all is checked again
      cy.get(selectors.toggleAll).should("be.checked");
    });
  });
  context("Item", () => {});
  context("Editing", () => {});
  context("Counter", () => {});
  context("Clear completed button", () => {});
  context("Persistence", () => {});
  context("Routing", () => {});
});
