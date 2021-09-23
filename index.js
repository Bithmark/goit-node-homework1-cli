const { Command } = require("commander");
const contactOperation = require("./contacts");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactOperation.listContacts().then((data) => console.log(data));
      break;

    case "get":
      contactOperation.getContactById(id).then((data) => console.table(data));
      break;

    case "add":
      contactOperation
        .addContact(name, email, phone)
        .then((data) => console.table(data));
      break;

    case "remove":
      contactOperation.removeContact(id).then((data) => console.table(data));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
