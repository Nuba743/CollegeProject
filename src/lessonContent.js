
export const lessonContentData = {
  "Introduction to HTML": {
    heading: "Introduction to HTML",
    sections: [
      {
        title: "What is HTML?",
        content: "HTML stands for HyperText Markup Language. It is the standard markup language used to create and structure web pages. HTML describes the content of a webpage using elements and tags."
      },
      {
        title: "Basic HTML Structure",
        content: "An HTML document contains a DOCTYPE declaration, html element, head element and body element. The head contains metadata, while the body contains visible webpage content."
      },
      {
        title: "Important Concepts",
        content: "HTML is not a programming language. It is a markup language. Browsers read HTML and display its elements as a webpage."
      }
    ],
    code: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Welcome to HTML.</p>
</body>
</html>`
  },

  "HTML Elements and Tags": {
    heading: "HTML Elements and Tags",
    sections: [
      { title: "HTML Tags", content: "Tags are keywords enclosed in angle brackets. Most elements have an opening tag and a closing tag." },
      { title: "HTML Elements", content: "An HTML element consists of an opening tag, content and closing tag. Examples include headings, paragraphs and links." },
      { title: "Void Elements", content: "Some elements do not need closing tags, such as br, img, hr and input." }
    ],
    code: `<h1>Main Heading</h1>
<p>This is a paragraph.</p>
<br>
<hr>
<img src="image.jpg" alt="Example">`
  },

  "HTML Attributes": {
    heading: "HTML Attributes",
    sections: [
      { title: "What are Attributes?", content: "Attributes provide additional information about HTML elements. They are written inside the opening tag." },
      { title: "Common Attributes", content: "id identifies a unique element, class groups elements, href specifies a link destination, and src specifies a resource location." },
      { title: "Global Attributes", content: "The id, class, title and style attributes can be used on many HTML elements." }
    ],
    code: `<a href="https://example.com" target="_blank">
  Visit Website
</a>

<p id="intro" class="text">
  Hello Student
</p>`
  },

  "HTML Forms and Input Elements": {
    heading: "HTML Forms and Input Elements",
    sections: [
      { title: "HTML Forms", content: "Forms collect user information and send it for processing. The form element contains input controls." },
      { title: "Input Types", content: "Common input types include text, email, password, number, radio, checkbox and submit." },
      { title: "Form Validation", content: "Attributes such as required, minlength, maxlength and pattern help validate user input." }
    ],
    code: `<form>
  <label>Name:</label>
  <input type="text" required>

  <label>Email:</label>
  <input type="email" required>

  <button type="submit">Submit</button>
</form>`
  },

  "HTML Tables and Semantic Elements": {
    heading: "HTML Tables and Semantic Elements",
    sections: [
      { title: "HTML Tables", content: "Tables display data in rows and columns. The table element contains tr, th and td elements." },
      { title: "Table Structure", content: "Use thead for header rows, tbody for main data and tfoot for footer information." },
      { title: "Semantic Elements", content: "Semantic elements describe their meaning. Examples include header, nav, main, section, article, aside and footer." }
    ],
    code: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alex</td>
    <td>21</td>
  </tr>
</table>

<header>Website Header</header>
<main>Main Content</main>
<footer>Website Footer</footer>`
  },

  "Introduction to CSS": {
    heading: "Introduction to CSS",
    sections: [
      { title: "What is CSS?", content: "CSS stands for Cascading Style Sheets. It controls the appearance and layout of HTML elements." },
      { title: "Types of CSS", content: "Inline CSS is written inside an element, internal CSS is written in a style element, and external CSS is stored in a separate file." },
      { title: "CSS Syntax", content: "A CSS rule contains a selector and a declaration block with property-value pairs." }
    ],
    code: `h1 {
  color: blue;
  font-size: 30px;
  text-align: center;
}`
  },

  "CSS Selectors": {
    heading: "CSS Selectors",
    sections: [
      { title: "Element Selector", content: "Selects elements using their tag name, such as p or h1." },
      { title: "Class and ID Selectors", content: "A class selector begins with a dot, while an ID selector begins with a hash symbol." },
      { title: "Other Selectors", content: "CSS also supports universal, group, descendant, child and pseudo-class selectors." }
    ],
    code: `p {
  color: black;
}

.box {
  padding: 20px;
}

#heading {
  color: blue;
}

button:hover {
  background: gray;
}`
  },

  "Colors and Backgrounds": {
    heading: "Colors and Backgrounds",
    sections: [
      { title: "CSS Colors", content: "CSS supports named colors, hexadecimal values, RGB, RGBA, HSL and HSLA color formats." },
      { title: "Background Properties", content: "Background properties control background color, image, position, size and repetition." },
      { title: "Transparency", content: "RGBA and HSLA allow transparency through an alpha value." }
    ],
    code: `body {
  background-color: #f1f5f9;
}

.card {
  background-color: rgba(0, 0, 255, 0.1);
  background-image: url("image.jpg");
  background-size: cover;
}`
  },

  "Flexbox and Grid": {
    heading: "Flexbox and Grid",
    sections: [
      { title: "Flexbox", content: "Flexbox is a one-dimensional layout system. It arranges items in a row or column." },
      { title: "Grid", content: "CSS Grid is a two-dimensional layout system that manages rows and columns." },
      { title: "When to Use", content: "Use Flexbox for arranging items along one axis and Grid for complex two-dimensional layouts." }
    ],
    code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`
  },

  "Responsive Web Design": {
    heading: "Responsive Web Design",
    sections: [
      { title: "Introduction", content: "Responsive web design makes websites adapt to different screen sizes and devices." },
      { title: "Media Queries", content: "Media queries apply CSS rules depending on screen characteristics such as viewport width." },
      { title: "Flexible Layouts", content: "Relative units, flexible images and responsive layouts help websites work across devices." }
    ],
    code: `img {
  max-width: 100%;
  height: auto;
}

@media (max-width: 600px) {
  .container {
    grid-template-columns: 1fr;
  }
}`
  },

  "Introduction to JavaScript": {
    heading: "Introduction to JavaScript",
    sections: [
      { title: "What is JavaScript?", content: "JavaScript is a programming language used to add dynamic and interactive behaviour to websites." },
      { title: "Where It Runs", content: "JavaScript runs in web browsers and also outside browsers using environments such as Node.js." },
      { title: "Basic Output", content: "console.log() displays information in the developer console." }
    ],
    code: `let message = "Hello World";
console.log(message);`
  },

  "Variables and Data Types": {
    heading: "Variables and Data Types",
    sections: [
      { title: "Variables", content: "Variables store values. JavaScript provides let, const and var for declaring variables." },
      { title: "Primitive Types", content: "Primitive data types include string, number, bigint, boolean, undefined, null and symbol." },
      { title: "Type Checking", content: "The typeof operator helps identify the type of a value." }
    ],
    code: `let name = "Alex";
const age = 21;
let isStudent = true;

console.log(typeof name);
console.log(typeof age);`
  },

  "Functions and Scope": {
    heading: "Functions and Scope",
    sections: [
      { title: "Functions", content: "Functions are reusable blocks of code that perform specific tasks." },
      { title: "Parameters and Return", content: "Parameters receive input values, and return sends a result back to the caller." },
      { title: "Scope", content: "Scope determines where a variable can be accessed. Common types include global, function and block scope." }
    ],
    code: `function add(a, b) {
  return a + b;
}

const result = add(5, 3);
console.log(result);`
  },

  "DOM Manipulation": {
    heading: "DOM Manipulation",
    sections: [
      { title: "What is DOM?", content: "DOM stands for Document Object Model. It represents an HTML document as a tree of objects." },
      { title: "Selecting Elements", content: "JavaScript can select elements using getElementById, querySelector and querySelectorAll." },
      { title: "Changing Content", content: "JavaScript can change text, HTML, styles and attributes of selected elements." }
    ],
    code: `const heading = document.querySelector("h1");

heading.textContent = "Updated Heading";
heading.style.color = "blue";`
  },

  "Events and Event Handling": {
    heading: "Events and Event Handling",
    sections: [
      { title: "JavaScript Events", content: "Events are actions or occurrences detected by the browser, such as clicks, typing and form submission." },
      { title: "Event Listeners", content: "addEventListener attaches a function that runs when a specified event occurs." },
      { title: "Event Object", content: "The event object provides information about the event, including its target element." }
    ],
    code: `const button = document.querySelector("button");

button.addEventListener("click", () => {
  alert("Button clicked!");
});`
  },

  "Introduction to React": {
    heading: "Introduction to React",
    sections: [
      { title: "What is React?", content: "React is a JavaScript library for building user interfaces, especially component-based interfaces." },
      { title: "Components", content: "Components are reusable pieces of UI. They help divide an application into smaller parts." },
      { title: "Virtual DOM", content: "React uses a virtual representation of the UI to calculate and apply necessary updates to the actual DOM." }
    ],
    code: `function App() {
  return <h1>Hello React!</h1>;
}

export default App;`
  },

  "Components and JSX": {
    heading: "Components and JSX",
    sections: [
      { title: "React Components", content: "Components are usually JavaScript functions that return React elements." },
      { title: "JSX", content: "JSX is a syntax extension that lets developers describe UI using HTML-like syntax inside JavaScript." },
      { title: "Component Reuse", content: "Components can be reused throughout an application to maintain consistent UI." }
    ],
    code: `function Welcome() {
  return <h2>Welcome Student</h2>;
}

function App() {
  return <Welcome />;
}`
  },

  "Props and State": {
    heading: "Props and State",
    sections: [
      { title: "Props", content: "Props are read-only inputs passed from a parent component to a child component." },
      { title: "State", content: "State stores data that can change over time and cause a component to re-render." },
      { title: "useState", content: "The useState Hook allows functional components to manage state." }
    ],
    code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`
  },

  "React Hooks": {
    heading: "React Hooks",
    sections: [
      { title: "What are Hooks?", content: "Hooks are functions that let React function components use features such as state and lifecycle-related behaviour." },
      { title: "useEffect", content: "useEffect runs side-effect logic after rendering. It can be used for data fetching and subscriptions." },
      { title: "Rules of Hooks", content: "Call Hooks at the top level of React components or custom Hooks, not inside loops or conditions." }
    ],
    code: `import { useEffect, useState } from "react";

function Example() {
  const [message, setMessage] = useState("Hello");

  useEffect(() => {
    document.title = message;
  }, [message]);

  return <h1>{message}</h1>;
}`
  },

  "React Router": {
    heading: "React Router",
    sections: [
      { title: "Introduction", content: "React Router is a routing library used to navigate between views in a React application." },
      { title: "Routes", content: "Routes map URL paths to the components that should be displayed." },
      { title: "Navigation", content: "Link and NavLink provide navigation without a full browser page reload." }
    ],
    code: `import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
      </Routes>
    </BrowserRouter>
  );
}`
  }
};
