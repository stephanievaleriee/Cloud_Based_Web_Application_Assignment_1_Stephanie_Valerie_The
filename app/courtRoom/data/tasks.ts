export type Requirement = {
  id: string;
  label: string;
  hint: string;
};

export type Task = {
  id: number;
  title: string;
  requirements: Requirement[];
  starterCode: string;
  validator: (code: string) => boolean;
  punishment: "disability" | "tort" | "bankruptcy";
};

export const tasks: Task[] = [
  {
    id: 1,
    title: "Fix ALT in Image",
    requirements: [
      {
        id: "alt",
        label: "Add alt attribute",
        hint: "Use alt=\"your description\" inside the image tag."
      }
    ],
    starterCode: `<img src="cat.png">`,
    validator: (code: string) => {
      return code.includes("alt=");
    },
    punishment: "disability" // matches assignment brief
  },

  {
    id: 2,
    title: "Fix Input Validation",
    requirements: [
      {
        id: "empty",
        label: "Check for empty field",
        hint: "Use if (!value) { ... } to detect empty input."
      },
      {
        id: "number",
        label: "Validate numeric input",
        hint: "Use isNaN(value) to ensure the input is a number."
      }
    ],
    starterCode: `function submit() {
  const age = document.getElementById("age").value
  alert("Your age is " + age)
}`,
    validator: (code: string) => {
      return code.includes("isNaN") && code.includes("!");
    },
    punishment: "tort"
  },

  {
    id: 3,
    title: "Fix User Login",
    requirements: [
      {
        id: "equals",
        label: "Correct comparison operator",
        hint: "Use === instead of = inside your if condition."
      },
      {
        id: "password",
        label: "Check password validity",
        hint: "Ensure pass === '1234' is used."
      }
    ],
    starterCode: `function login(user, pass) {
  if (user = "admin") {
    return "Logged in"
  }
  return "Wrong"
}`,
    validator: (code: string) => {
      return code.includes("===") && code.includes("1234");
    },
    punishment: "bankruptcy" // matches assignment brief
  },

  {
    id: 4,
    title: "Secure the Database",
    requirements: [
      {
        id: "prep",
        label: "Use prepared statements",
        hint: "Use a placeholder like ? in your SQL query."
      },
      {
        id: "bind",
        label: "Bind parameters",
        hint: "Use [userId] when executing the query."
      }
    ],
    starterCode: `const query = "SELECT * FROM users WHERE id = " + userId;
db.execute(query);`,
    validator: (code: string) => {
      return code.includes("?") && code.includes("[userId]");
    },
    punishment: "tort"
  }
];
