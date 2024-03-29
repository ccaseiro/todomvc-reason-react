describe("spec", () => {
  // setup these constants to match what TodoMVC does
  const TODO_ITEM_ONE = "buy some cheese";
  const TODO_ITEM_TWO = "feed the cat";
  const TODO_ITEM_THREE = "book a doctors appointment";

  const selectors = {
    newTodo: ".new-todo",
    todoItems: ".todo-list li",
    todoItemsVisible: ".todo-list li:visible",
    main: ".main",
    footer: ".footer",
    toggleAll: ".toggle-all",
    count: "span.todo-count",
    clearCompleted: ".clear-completed"
  };

  const visibleTodos = () => cy.get(selectors.todoItemsVisible);

  const safeBlur = $el => {
    const event = new Event("blur", { force: true });
    $el.get(0).dispatchEvent(event);
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

  context("Item", () => {
    it("should allow me to mark items as complete", function() {
      // we are aliasing the return value of
      // our custom command 'createTodo'
      //
      // the return value is the <li> in the <ul.todos-list>
      cy.createTodo(TODO_ITEM_ONE).as("firstTodo");
      cy.createTodo(TODO_ITEM_TWO).as("secondTodo");

      cy.get("@firstTodo")
        .find(".toggle")
        .check();
      cy.get("@firstTodo").should("have.class", "completed");

      cy.get("@secondTodo").should("not.have.class", "completed");
      cy.get("@secondTodo")
        .find(".toggle")
        .check();

      cy.get("@firstTodo").should("have.class", "completed");
      cy.get("@secondTodo").should("have.class", "completed");
    });

    it("should allow me to un-mark items as complete", function() {
      cy.createTodo(TODO_ITEM_ONE).as("firstTodo");
      cy.createTodo(TODO_ITEM_TWO).as("secondTodo");

      cy.get("@firstTodo")
        .find(".toggle")
        .check();
      cy.get("@firstTodo").should("have.class", "completed");
      cy.get("@secondTodo").should("not.have.class", "completed");

      cy.get("@firstTodo")
        .find(".toggle")
        .uncheck();
      cy.get("@firstTodo").should("not.have.class", "completed");
      cy.get("@secondTodo").should("not.have.class", "completed");
    });

    it("should allow me to edit an item", function() {
      cy.createDefaultTodos();

      visibleTodos()
        .eq(1)
        // TODO: fix this, dblclick should
        // have been issued to label
        .find("label")
        .dblclick();

      // clear out the inputs current value
      // and type a new value
      visibleTodos()
        .eq(1)
        .find(".edit")
        .should("have.value", TODO_ITEM_TWO)
        // clear + type text + enter key
        .clear()
        .type("buy some sausages{enter}")
        .then(safeBlur);

      // explicitly assert about the text value
      visibleTodos()
        .eq(0)
        .should("contain", TODO_ITEM_ONE);
      visibleTodos()
        .eq(1)
        .should("contain", "buy some sausages");
      visibleTodos()
        .eq(2)
        .should("contain", TODO_ITEM_THREE);
    });
  });

  context("Editing", () => {
    // New commands used here:
    // - cy.blur    https://on.cypress.io/api/blur

    beforeEach(function() {
      cy.createDefaultTodos().as("todos");
    });

    it("should hide other controls when editing", function() {
      cy.get("@todos")
        .eq(1)
        .find("label")
        .dblclick();

      cy.get(selectors.todoItems)
        .eq(1)
        .find(".toggle")
        .should("not.be.visible");
      cy.get(selectors.todoItems)
        .eq(1)
        .find("label")
        .should("not.be.visible");
    });

    it("should save edits on blur", function() {
      cy.get("@todos")
        .eq(1)
        .find("label")
        .dblclick();

      cy.get(selectors.todoItems)
        .eq(1)
        .find(".edit")
        .clear()
        .type("buy some sausages")
        // we can just send the blur event directly
        // to the input instead of having to click
        // on another button on the page. though you
        // could do that its just more mental work
        .blur();

      visibleTodos()
        .eq(0)
        .should("contain", TODO_ITEM_ONE);
      visibleTodos()
        .eq(1)
        .should("contain", "buy some sausages");
      visibleTodos()
        .eq(2)
        .should("contain", TODO_ITEM_THREE);
    });

    it("should trim entered text", function() {
      cy.get("@todos")
        .eq(1)
        .find("label")
        .dblclick();

      cy.get(selectors.todoItems)
        .eq(1)
        .find(".edit")
        .type("{selectall}{backspace}    buy some sausages    {enter}")
        .then(safeBlur);

      visibleTodos()
        .eq(0)
        .should("contain", TODO_ITEM_ONE);
      visibleTodos()
        .eq(1)
        .should("contain", "buy some sausages");
      visibleTodos()
        .eq(2)
        .should("contain", TODO_ITEM_THREE);
    });

    it("should remove the item if an empty text string was entered", function() {
      cy.get("@todos")
        .eq(1)
        .find("label")
        .dblclick();

      cy.get(selectors.todoItems)
        .eq(1)
        .find(".edit")
        .clear()
        .type("{enter}")
        .then(safeBlur);

      visibleTodos().should("have.length", 2);
    });

    it("should cancel edits on escape", function() {
      visibleTodos()
        .eq(1)
        .find("label")
        .dblclick();

      cy.get(selectors.todoItems)
        .eq(1)
        .find(".edit")
        .type("{selectall}{backspace}foo{esc}");

      visibleTodos()
        .eq(0)
        .should("contain", TODO_ITEM_ONE);
      visibleTodos()
        .eq(1)
        .should("contain", TODO_ITEM_TWO);
      visibleTodos()
        .eq(2)
        .should("contain", TODO_ITEM_THREE);
    });
  });

  context("Counter", () => {
    it("should display the current number of todo items", function() {
      cy.createTodo(TODO_ITEM_ONE);
      cy.get(selectors.count).contains("1");
      cy.createTodo(TODO_ITEM_TWO);
      cy.get(selectors.count).contains("2");
    });
  });

  context("Clear completed button", () => {
    beforeEach(function() {
      cy.createDefaultTodos().as("todos");
    });

    it("should display the correct text", function() {
      cy.get("@todos")
        .eq(0)
        .find(".toggle")
        .check();
      cy.get(selectors.clearCompleted).contains("Clear completed");
    });

    it("should remove completed items when clicked", function() {
      cy.get("@todos")
        .eq(1)
        .find(".toggle")
        .check();
      cy.get(selectors.clearCompleted).click();
      cy.get("@todos").should("have.length", 2);
      cy.get("@todos")
        .eq(0)
        .should("contain", TODO_ITEM_ONE);
      cy.get("@todos")
        .eq(1)
        .should("contain", TODO_ITEM_THREE);
    });

    it("should be hidden when there are no items that are completed", function() {
      cy.get("@todos")
        .eq(1)
        .find(".toggle")
        .check();
      cy.get(selectors.clearCompleted)
        .should("be.visible")
        .click();
      cy.get(selectors.clearCompleted).should("not.be.visible");
    });
  });

  context("Persistence", () => {});
  context("Routing", () => {});
});
