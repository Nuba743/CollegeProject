
import { useState, useEffect, useMemo } from "react";
import {
  BrainCircuit,
  CheckCircle,
  XCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Target,
  BookOpen,
  Sparkles
} from "lucide-react"; 
import {calculateNextDifficulty} from "./adaptiveEngine";
import {
  generateRecommendations,
  getRecommendedLesson,
  getConceptFromQuestion
} from "./recommendationEngine";
import { advancedChallenges } from "./advancedChallenges";

// Assessment question bank
const questions = [
  {
    id: 1,
    topic: "HTML",
    difficulty:"Beginner",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    id: 2,
    topic: "HTML",
    difficulty:"Beginner",
    question: "Which tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1
  },


{
  id: 17,
  topic: "HTML",
  difficulty: "Beginner",
  question: "Which tag is used to create a paragraph?",
  options: ["<h1>", "<p>", "<div>", "<br>"],
  answer: 1
},
{
  id: 18,
  topic: "HTML",
  difficulty: "Beginner",
  question: "Which is the largest HTML heading?",
  options: ["<h6>", "<head>", "<h1>", "<header>"],
  answer: 2
},
{
  id: 19,
  topic: "HTML",
  difficulty: "Beginner",
  question: "Which attribute specifies an image's file path?",
  options: ["href", "alt", "src", "link"],
  answer: 2
},
{
  id: 20,
  topic: "HTML",
  difficulty: "Beginner",
  question: "Which tag creates an unordered list?",
  options: ["<ol>", "<ul>", "<li>", "<list>"],
  answer: 1
},
{
  id: 21,
  topic: "HTML",
  difficulty: "Beginner",
  question: "Which tag is used to create a line break?",
  options: ["<break>", "<lb>", "<br>", "<hr>"],
  answer: 2
},
{
  id: 22,
  topic: "HTML",
  difficulty: "Beginner",
  question: "Which tag defines a table row?",
  options: ["<td>", "<th>", "<tr>", "<table>"],
  answer: 2
},
{
  id: 23,
  topic: "HTML",
  difficulty: "Beginner",
  question: "Which tag creates a text input field?",
  options: ["<input>", "<text>", "<textarea-only>", "<field>"],
  answer: 0
},
{
  id: 24,
  topic: "HTML",
  difficulty: "Beginner",
  question: "Which tag represents the main content of a webpage?",
  options: ["<footer>", "<main>", "<aside>", "<head>"],
  answer: 1
},

  {
    id: 3,
    topic: "CSS",
    difficulty:"Beginner",
    question: "Which property changes text color?",
    options: ["font-style", "background", "color", "text-size"],
    answer: 2
  },
  {
    id: 4,
    topic: "CSS",
    difficulty:"Beginner",
    question: "Which CSS property controls element spacing inside its border?",
    options: ["margin", "padding", "border", "display"],
    answer: 1
  },


{
  id: 25,
  topic: "CSS",
  difficulty: "Beginner",
  question: "Which property changes the background color?",
  options: ["color", "background-color", "font-color", "bg"],
  answer: 1
},
{
  id: 26,
  topic: "CSS",
  difficulty: "Beginner",
  question: "Which symbol is used to select an element by ID?",
  options: [".", "#", "*", "&"],
  answer: 1
},
{
  id: 27,
  topic: "CSS",
  difficulty: "Beginner",
  question: "Which property makes text bold?",
  options: ["font-style", "font-weight", "text-decoration", "font-size"],
  answer: 1
},
{
  id: 28,
  topic: "CSS",
  difficulty: "Beginner",
  question: "Which property controls the space outside an element's border?",
  options: ["padding", "margin", "border-spacing", "width"],
  answer: 1
},
{
  id: 29,
  topic: "CSS",
  difficulty: "Beginner",
  question: "Which CSS property is used to change the font size?",
  options: ["font-size", "text-style", "font-weight", "size"],
  answer: 0
},
{
  id: 30,
  topic: "CSS",
  difficulty: "Beginner",
  question: "Which value of display makes an element a flex container?",
  options: ["block", "inline", "flex", "none"],
  answer: 2
},
{
  id: 31,
  topic: "CSS",
  difficulty: "Beginner",
  question: "Which property rounds the corners of an element?",
  options: ["border-style", "border-radius", "corner", "outline"],
  answer: 1
},
{
  id: 32,
  topic: "CSS",
  difficulty: "Beginner",
  question: "Which selector targets all HTML elements?",
  options: ["#", ".", "*", "all"],
  answer: 2
},

  {
    id: 5,
    topic: "JavaScript",
    difficulty:"Beginner",
    question: "Which keyword declares a block-scoped variable?",
    options: ["var", "let", "define", "static"],
    answer: 1
  },
  {
    id: 6,
    topic: "JavaScript",
    difficulty:"Beginner",
    question: "Which operator checks strict equality?",
    options: ["=", "==", "===", "!="],
    answer: 2
  },


{
  id: 33,
  topic: "JavaScript",
  difficulty: "Beginner",
  question: "Which function displays a message in the browser console?",
  options: ["alert()", "console.log()", "print()", "display()"],
  answer: 1
},
{
  id: 34,
  topic: "JavaScript",
  difficulty: "Beginner",
  question: "Which data type represents true or false?",
  options: ["String", "Number", "Boolean", "Object"],
  answer: 2
},
{
  id: 35,
  topic: "JavaScript",
  difficulty: "Beginner",
  question: "Which symbol is used for single-line comments?",
  options: ["<!-- -->", "//", "/* */", "#"],
  answer: 1
},
{
  id: 36,
  topic: "JavaScript",
  difficulty: "Beginner",
  question: "Which method converts JSON text into a JavaScript object?",
  options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.object()"],
  answer: 1
},
{
  id: 37,
  topic: "JavaScript",
  difficulty: "Beginner",
  question: "Which operator is used for addition?",
  options: ["+", "-", "*", "/"],
  answer: 0
},
{
  id: 38,
  topic: "JavaScript",
  difficulty: "Beginner",
  question: "Which keyword is used to declare a constant?",
  options: ["let", "var", "const", "static"],
  answer: 2
},
{
  id: 39,
  topic: "JavaScript",
  difficulty: "Beginner",
  question: "Which method adds an element to the end of an array?",
  options: ["pop()", "push()", "shift()", "slice()"],
  answer: 1
},
{
  id: 40,
  topic: "JavaScript",
  difficulty: "Beginner",
  question: "What does typeof return?",
  options: ["A variable's data type", "A variable's value", "A function result", "An array length"],
  answer: 0
},

  {
    id: 7,
    topic: "React",
    difficulty:"Beginner",
    question: "What is React primarily used for?",
    options: [
      "Database management",
      "Building user interfaces",
      "Operating systems",
      "Server hardware"
    ],
    answer: 1
  },
  {
    id: 8,
    topic: "React",
    difficulty:"Beginner",
    question: "Which React Hook manages component state?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    answer: 1
  },
  {
  id: 41,
  topic: "React",
  difficulty: "Beginner",
  question: "Which syntax is used to write HTML-like code in React?",
  options: ["XML", "JSX", "JSON", "CSS"],
  answer: 1
},
{
  id: 42,
  topic: "React",
  difficulty: "Beginner",
  question: "What is a React component?",
  options: [
    "A reusable UI building block",
    "A database table",
    "A CSS selector",
    "A browser extension"
  ],
  answer: 0
},
{
  id: 43,
  topic: "React",
  difficulty: "Beginner",
  question: "Which prop is used to pass data from parent to child?",
  options: ["state", "props", "hooks", "refs"],
  answer: 1
},
{
  id: 44,
  topic: "React",
  difficulty: "Beginner",
  question: "What does JSX stand for?",
  options: [
    "JavaScript XML",
    "Java Syntax Extension",
    "JSON XML",
    "JavaScript Extra"
  ],
  answer: 0
},
{
  id: 45,
  topic: "React",
  difficulty: "Beginner",
  question: "Which command commonly starts a Vite development server?",
  options: [
    "npm run dev",
    "npm start server",
    "react run",
    "vite build"
  ],
  answer: 0
},
{
  id: 46,
  topic: "React",
  difficulty: "Beginner",
  question: "Which hook is used to perform side effects in a function component?",
  options: ["useState", "useEffect", "useMemo", "useId"],
  answer: 1
},
{
  id: 47,
  topic: "React",
  difficulty: "Beginner",
  question: "What should a React component return?",
  options: [
    "A database query",
    "JSX or renderable content",
    "A CSS file",
    "A package.json file"
  ],
  answer: 1
},
{
  id: 48,
  topic: "React",
  difficulty: "Beginner",
  question: "Why should list items have a key prop?",
  options: [
    "To apply CSS",
    "To help React identify items between renders",
    "To store passwords",
    "To navigate pages"
  ],
  answer: 1
},

    {
    id: 9,
    topic: "HTML",
    difficulty: "Intermediate",
    question: "Which HTML attribute is used to provide alternative text for an image?",
    options: ["title", "alt", "src", "href"],
    answer: 1
  },
  {
    id: 10,
    topic: "CSS",
    difficulty: "Intermediate",
    question: "Which CSS layout system is primarily designed for two-dimensional layouts?",
    options: ["Flexbox", "Grid", "Float", "Inline"],
    answer: 1
  },
  {
    id: 11,
    topic: "JavaScript",
    difficulty: "Intermediate",
    question: "What does the map() method return?",
    options: [
      "A new array",
      "A single number",
      "The original array only",
      "A boolean value"
    ],
    answer: 0
  },
  {
    id: 12,
    topic: "React",
    difficulty: "Intermediate",
    question: "What is the purpose of the useEffect Hook?",
    options: [
      "To create CSS styles",
      "To handle side effects",
      "To create components",
      "To define routes"
    ],
    answer: 1
  },

    {
    id: 13,
    topic: "HTML",
    difficulty: "Advanced",
    question: "Which attribute makes a form control mandatory before submission?",
    options: ["validate", "required", "mandatory", "checked"],
    answer: 1
  },
  {
    id: 14,
    topic: "CSS",
    difficulty: "Advanced",
    question: "Which CSS property defines the stacking order of positioned elements?",
    options: ["position", "display", "z-index", "overflow"],
    answer: 2
  },
  {
    id: 15,
    topic: "JavaScript",
    difficulty: "Advanced",
    question: "What is a closure in JavaScript?",
    options: [
      "A function bundled with its lexical environment",
      "A method that closes a browser window",
      "A loop that never ends",
      "A CSS property"
    ],
    answer: 0
  },
  {
    id: 16,
    topic: "React",
    difficulty: "Advanced",
    question: "Why are keys used when rendering lists in React?",
    options: [
      "To style list items",
      "To help React identify changed elements",
      "To create unique CSS classes",
      "To store component state"
    ],
    answer: 1
  },

// Additional Intermediate and Advanced Questions

// HTML - Intermediate
{ id: 49, topic: "HTML", difficulty: "Intermediate", question: "Which element is used to group related form controls?", options: ["<fieldset>", "<section>", "<group>", "<formgroup>"], answer: 0 },
{ id: 50, topic: "HTML", difficulty: "Intermediate", question: "Which attribute opens a link in a new tab?", options: ["target='_blank'", "newtab", "open='new'", "tab='new'"], answer: 0 },
{ id: 51, topic: "HTML", difficulty: "Intermediate", question: "Which element provides metadata about a webpage?", options: ["<body>", "<meta>", "<footer>", "<article>"], answer: 1 },
{ id: 52, topic: "HTML", difficulty: "Intermediate", question: "Which element is used to embed a video?", options: ["<media>", "<movie>", "<video>", "<source>"], answer: 2 },
{ id: 53, topic: "HTML", difficulty: "Intermediate", question: "Which attribute connects a label to an input?", options: ["name", "for", "connect", "idref"], answer: 1 },
{ id: 54, topic: "HTML", difficulty: "Intermediate", question: "Which element represents navigation links?", options: ["<nav>", "<navigate>", "<links>", "<menuitem>"], answer: 0 },
{ id: 55, topic: "HTML", difficulty: "Intermediate", question: "Which attribute specifies that an image is important for accessibility?", options: ["src", "alt", "width", "title"], answer: 1 },
{ id: 56, topic: "HTML", difficulty: "Intermediate", question: "Which element defines a caption for a table?", options: ["<caption>", "<label>", "<summary>", "<title>"], answer: 0 },
{ id: 57, topic: "HTML", difficulty: "Intermediate", question: "Which input type is designed for email addresses?", options: ["text", "mail", "email", "address"], answer: 2 },

// CSS - Intermediate
{ id: 58, topic: "CSS", difficulty: "Intermediate", question: "Which property controls the direction of a flex container?", options: ["flex-wrap", "flex-direction", "justify-content", "align-items"], answer: 1 },
{ id: 59, topic: "CSS", difficulty: "Intermediate", question: "Which pseudo-class selects an element when the mouse is over it?", options: [":focus", ":active", ":hover", ":visited"], answer: 2 },
{ id: 60, topic: "CSS", difficulty: "Intermediate", question: "Which property controls the space between grid columns?", options: ["gap", "padding", "margin", "spacing"], answer: 0 },
{ id: 61, topic: "CSS", difficulty: "Intermediate", question: "What does position: absolute do?", options: ["Keeps an element in normal flow", "Positions relative to its nearest positioned ancestor", "Always fixes it to the viewport", "Hides the element"], answer: 1 },
{ id: 62, topic: "CSS", difficulty: "Intermediate", question: "Which unit is relative to the root element's font size?", options: ["em", "px", "rem", "%"], answer: 2 },
{ id: 63, topic: "CSS", difficulty: "Intermediate", question: "Which property controls content overflow?", options: ["overflow", "visibility", "display", "clip-path"], answer: 0 },
{ id: 64, topic: "CSS", difficulty: "Intermediate", question: "Which rule is used to apply styles at different screen sizes?", options: ["@font-face", "@keyframes", "@media", "@import"], answer: 2 },
{ id: 65, topic: "CSS", difficulty: "Intermediate", question: "Which property aligns flex items along the cross axis?", options: ["justify-content", "align-items", "flex-direction", "order"], answer: 1 },
{ id: 66, topic: "CSS", difficulty: "Intermediate", question: "Which selector targets direct child elements?", options: ["A B", "A + B", "A > B", "A ~ B"], answer: 2 },

// JavaScript - Intermediate
{ id: 67, topic: "JavaScript", difficulty: "Intermediate", question: "Which array method creates a new array by transforming each element?", options: ["filter()", "map()", "reduce()", "forEach()"], answer: 1 },
{ id: 68, topic: "JavaScript", difficulty: "Intermediate", question: "What does the filter() method return?", options: ["A new array of matching elements", "A single number", "The first element", "A boolean only"], answer: 0 },
{ id: 69, topic: "JavaScript", difficulty: "Intermediate", question: "Which keyword is used to handle errors?", options: ["error", "catch", "throwonly", "finallyonly"], answer: 1 },
{ id: 70, topic: "JavaScript", difficulty: "Intermediate", question: "What does JSON.stringify() do?", options: ["Converts JSON into an object", "Converts a JavaScript value into a JSON string", "Deletes an object", "Creates an array"], answer: 1 },
{ id: 71, topic: "JavaScript", difficulty: "Intermediate", question: "Which method removes the last array element?", options: ["shift()", "slice()", "pop()", "spliceFirst()"], answer: 2 },
{ id: 72, topic: "JavaScript", difficulty: "Intermediate", question: "What is the result of typeof null?", options: ["null", "undefined", "object", "boolean"], answer: 2 },
{ id: 73, topic: "JavaScript", difficulty: "Intermediate", question: "Which method converts a string to an integer?", options: ["parseInt()", "toString()", "parseFloatOnly()", "NumberText()"], answer: 0 },
{ id: 74, topic: "JavaScript", difficulty: "Intermediate", question: "Which statement skips the current loop iteration?", options: ["break", "continue", "return", "exit"], answer: 1 },
{ id: 75, topic: "JavaScript", difficulty: "Intermediate", question: "Which operator provides a fallback when the left value is null or undefined?", options: ["||", "??", "&&", "==="], answer: 1 },

// React - Intermediate
{ id: 76, topic: "React", difficulty: "Intermediate", question: "How do you pass data from a parent component to a child?", options: ["Props", "State only", "CSS", "DOM"], answer: 0 },
{ id: 77, topic: "React", difficulty: "Intermediate", question: "What is the purpose of useState?", options: ["Manage component state", "Create routes", "Fetch CSS", "Directly modify the DOM"], answer: 0 },
{ id: 78, topic: "React", difficulty: "Intermediate", question: "What does useEffect commonly handle?", options: ["Side effects", "Component styling", "HTML parsing", "Database creation"], answer: 0 },
{ id: 79, topic: "React", difficulty: "Intermediate", question: "Why are React keys important in lists?", options: ["They add CSS", "They help identify list items between renders", "They create state", "They handle routing"], answer: 1 },
{ id: 80, topic: "React", difficulty: "Intermediate", question: "What is JSX?", options: ["A JavaScript syntax extension", "A database", "A CSS framework", "A testing tool"], answer: 0 },
{ id: 81, topic: "React", difficulty: "Intermediate", question: "What is a controlled input?", options: ["An input whose value is managed by React state", "An input without a value", "An input managed only by CSS", "An input that cannot be edited"], answer: 0 },
{ id: 82, topic: "React", difficulty: "Intermediate", question: "Which hook stores a mutable value without causing a re-render when changed?", options: ["useState", "useRef", "useEffect", "useMemo"], answer: 1 },
{ id: 83, topic: "React", difficulty: "Intermediate", question: "What does lifting state up mean?", options: ["Moving shared state to a common parent", "Deleting component state", "Moving CSS upward", "Creating a new route"], answer: 0 },
{ id: 84, topic: "React", difficulty: "Intermediate", question: "What is the purpose of React.Fragment?", options: ["Group elements without an extra DOM element", "Create a form", "Fetch data", "Add CSS"], answer: 0 },

// HTML - Advanced
{ id: 85, topic: "HTML", difficulty: "Advanced", question: "What is the purpose of the defer attribute on a script?", options: ["Execute before HTML parsing", "Execute after HTML parsing while preserving script order", "Disable JavaScript", "Load CSS asynchronously"], answer: 1 },
{ id: 86, topic: "HTML", difficulty: "Advanced", question: "Which attribute helps load an image only when it approaches the viewport?", options: ["async", "defer", "loading='lazy'", "preload"], answer: 2 },
{ id: 87, topic: "HTML", difficulty: "Advanced", question: "What does the aria-label attribute provide?", options: ["A CSS class", "An accessible name for an element", "A form validation rule", "A page title"], answer: 1 },
{ id: 88, topic: "HTML", difficulty: "Advanced", question: "Which element is used to provide multiple image sources for responsive images?", options: ["<picture>", "<canvas>", "<figure>", "<source-list>"], answer: 0 },
{ id: 89, topic: "HTML", difficulty: "Advanced", question: "What is the purpose of the sandbox attribute on an iframe?", options: ["Improve image quality", "Apply security restrictions to embedded content", "Enable CSS Grid", "Store browser cookies"], answer: 1 },
{ id: 90, topic: "HTML", difficulty: "Advanced", question: "Which attribute associates a form control with a form when it is outside the form element?", options: ["form", "action", "for", "method"], answer: 0 },
{ id: 91, topic: "HTML", difficulty: "Advanced", question: "Which element is intended for machine-readable dates or times?", options: ["<time>", "<date>", "<clock>", "<datetime>"], answer: 0 },
{ id: 92, topic: "HTML", difficulty: "Advanced", question: "What does the rel='noopener' value help prevent?", options: ["Image loading", "Access to the opener window from a newly opened page", "Form submission", "CSS inheritance"], answer: 1 },
{ id: 93, topic: "HTML", difficulty: "Advanced", question: "Which API is associated with the HTML canvas element for drawing?", options: ["CanvasRenderingContext2D", "HTMLTableElement", "FormData", "History"], answer: 0 },

// CSS - Advanced
{ id: 94, topic: "CSS", difficulty: "Advanced", question: "Which CSS concept determines which declaration wins when rules conflict?", options: ["Specificity and cascade", "Box sizing only", "Flex wrapping", "Media loading"], answer: 0 },
{ id: 95, topic: "CSS", difficulty: "Advanced", question: "What does box-sizing: border-box do?", options: ["Includes padding and border in the declared width and height", "Removes all margins", "Makes every element a flexbox", "Hides borders"], answer: 0 },
{ id: 96, topic: "CSS", difficulty: "Advanced", question: "Which property creates a new stacking context in common cases when set to a value less than 1?", options: ["opacity", "font-size", "padding", "letter-spacing"], answer: 0 },
{ id: 97, topic: "CSS", difficulty: "Advanced", question: "Which function is commonly used to create responsive values between a minimum and maximum?", options: ["clamp()", "repeat()", "rotate()", "translate()"], answer: 0 },
{ id: 98, topic: "CSS", difficulty: "Advanced", question: "What does grid-template-areas define?", options: ["Named regions in a CSS Grid layout", "Font families", "Animation timing", "Border styles"], answer: 0 },
{ id: 99, topic: "CSS", difficulty: "Advanced", question: "Which selector has the highest specificity?", options: [".card", "#main", "div", "*"], answer: 1 },
{ id: 100, topic: "CSS", difficulty: "Advanced", question: "What does transform: translateX(20px) do?", options: ["Moves an element horizontally", "Changes its width", "Changes its font", "Adds a shadow"], answer: 0 },
{ id: 101, topic: "CSS", difficulty: "Advanced", question: "Which property controls whether an element participates in pointer events?", options: ["pointer-events", "cursor-style", "user-select", "visibility"], answer: 0 },
{ id: 102, topic: "CSS", difficulty: "Advanced", question: "What is the main purpose of CSS containment?", options: ["Limit layout, style, or paint work to an element", "Increase image resolution", "Create HTML elements", "Manage JavaScript state"], answer: 0 },

// JavaScript - Advanced
{ id: 103, topic: "JavaScript", difficulty: "Advanced", question: "What is a Promise used for?", options: ["Represent an eventual result of an asynchronous operation", "Create CSS styles", "Declare constants only", "Replace arrays"], answer: 0 },
{ id: 104, topic: "JavaScript", difficulty: "Advanced", question: "What does the event loop coordinate?", options: ["Synchronous CSS rendering only", "Execution of queued callbacks and asynchronous tasks", "Database schemas", "HTML attributes"], answer: 1 },
{ id: 105, topic: "JavaScript", difficulty: "Advanced", question: "What does Object.freeze() do?", options: ["Prevents modification of an object's own properties", "Deletes an object", "Converts it to JSON", "Creates a deep clone"], answer: 0 },
{ id: 106, topic: "JavaScript", difficulty: "Advanced", question: "What is the purpose of Promise.all()?", options: ["Wait for all promises to fulfill, or reject if one rejects", "Run only the first promise", "Cancel all promises", "Convert promises to callbacks"], answer: 0 },
{ id: 107, topic: "JavaScript", difficulty: "Advanced", question: "What does the spread syntax do with an array?", options: ["Expands its elements in a context", "Sorts the array", "Deletes duplicates automatically", "Makes it immutable"], answer: 0 },
{ id: 108, topic: "JavaScript", difficulty: "Advanced", question: "What is event delegation?", options: ["Handling events on a common ancestor for descendant elements", "Creating a new event for every click", "Stopping all browser events", "Removing event listeners"], answer: 0 },
{ id: 109, topic: "JavaScript", difficulty: "Advanced", question: "Which statement about let and var is correct?", options: ["Both are always global", "let is block-scoped while var is function-scoped", "var is block-scoped", "let cannot be reassigned"], answer: 1 },
{ id: 110, topic: "JavaScript", difficulty: "Advanced", question: "What does the finally block do in try/catch?", options: ["Runs after try/catch regardless of the outcome", "Runs only when an error occurs", "Prevents errors", "Repeats the try block"], answer: 0 },
{ id: 111, topic: "JavaScript", difficulty: "Advanced", question: "What is the purpose of a JavaScript module?", options: ["Organize and share code using imports and exports", "Style HTML elements", "Store browser history", "Create database tables"], answer: 0 },

// React - Advanced
{ id: 112, topic: "React", difficulty: "Advanced", question: "What problem does React.memo help reduce?", options: ["Unnecessary component re-renders when props are unchanged", "Network requests", "CSS compilation", "Route creation"], answer: 0 },
{ id: 113, topic: "React", difficulty: "Advanced", question: "What is the purpose of useMemo?", options: ["Memoize a calculated value between renders", "Update the DOM directly", "Create a route", "Store browser cookies"], answer: 0 },
{ id: 114, topic: "React", difficulty: "Advanced", question: "What is the purpose of useCallback?", options: ["Memoize a function reference between renders", "Fetch an image", "Create HTML elements", "Delete state"], answer: 0 },
{ id: 115, topic: "React", difficulty: "Advanced", question: "Why should state updates based on previous state use a functional updater?", options: ["To use the latest queued state value safely", "To avoid JSX", "To disable rendering", "To create CSS variables"], answer: 0 },
{ id: 116, topic: "React", difficulty: "Advanced", question: "What is a custom Hook?", options: ["A reusable function that uses React Hooks", "A built-in HTML tag", "A CSS animation", "A browser plugin"], answer: 0 },
{ id: 117, topic: "React", difficulty: "Advanced", question: "What is the purpose of an Error Boundary?", options: ["Catch rendering errors in descendant components", "Catch every server error", "Validate CSS", "Manage user passwords"], answer: 0 },
{ id: 118, topic: "React", difficulty: "Advanced", question: "What does React.StrictMode help identify?", options: ["Potential problems in a React application during development", "Production database errors", "CSS syntax errors", "Network speed"], answer: 0 },
{ id: 119, topic: "React", difficulty: "Advanced", question: "Why should side effects not be performed directly during rendering?", options: ["Rendering should remain pure and predictable", "React cannot use functions", "JSX does not support effects", "Components cannot access props"], answer: 0 },
{ id: 120, topic: "React", difficulty: "Advanced", question: "What is reconciliation in React?", options: ["The process of comparing UI changes and updating the DOM", "The process of compiling CSS", "The process of installing packages", "The process of creating routes"], answer: 0 },

];
// JavaScript Beginner Question Explanations
const questionExplanations = {
  5: "The let keyword declares a block-scoped variable. It can be reassigned but cannot be redeclared in the same scope.",
  6: "The === operator checks both value and data type without performing type conversion. This is called strict equality.",
  33: "console.log() displays messages and values in the browser developer console. It is commonly used for debugging.",
  34: "Boolean is a primitive JavaScript data type that has only two possible values: true and false.",
  35: "The double forward slash (//) starts a single-line comment. JavaScript ignores the comment when executing code.",
  36: "JSON.parse() converts a valid JSON string into a JavaScript value or object. JSON.stringify() performs the reverse operation.",
  37: "The plus (+) operator performs addition when used with numbers. It can also concatenate strings.",
  38: "The const keyword declares a block-scoped variable that cannot be reassigned after initialization.",
  39: "The push() method adds one or more elements to the end of an array and returns the new array length.",
  40: "The typeof operator returns a string indicating the type of a value, such as 'string', 'number', or 'boolean'.",
  

  // HTML Beginner Explanations
  1: "HTML stands for HyperText Markup Language. It is the standard markup language used to structure content on web pages, such as headings, paragraphs, images and links.",

  2: "The <a> tag creates hyperlinks in HTML. Its href attribute specifies the destination URL. Example: <a href='https://example.com'>Visit</a>.",

  17: "The <p> tag defines a paragraph in HTML. Browsers usually add spacing before and after paragraphs to separate blocks of text.",

  18: "The <h1> tag represents the highest-level HTML heading. HTML provides six heading levels, from <h1> (most important) to <h6> (least important).",

  19: "The src attribute specifies the path or URL of an image file in the <img> element. Example: <img src='photo.jpg' alt='Photo'>.",

  20: "The <ul> tag creates an unordered list, usually displayed with bullet points. Each list item is placed inside an <li> tag.",

  21: "The <br> tag inserts a line break in HTML. It moves the following content to a new line without starting a new paragraph.",

  22: "The <tr> tag defines a table row. Inside it, <td> creates data cells and <th> creates header cells.",

  23: "The <input> tag creates an interactive input field in an HTML form. Its type attribute determines the kind of input, such as text, email or password.",

  24: "The <main> element represents the main content of a webpage. It helps browsers and assistive technologies identify the primary content.",


  // CSS Beginner Explanations

  3: "The color property changes the text color of an HTML element. Example: color: red; makes the text red.",

  4: "The padding property controls the space inside an element, between its content and border. It helps create space around the content.",

  25: "The background-color property sets the background color of an element. Example: background-color: blue; gives the element a blue background.",

  26: "The # symbol is used to select an HTML element by its unique ID in CSS. Example: #header { color: blue; } selects the element with id='header'.",

  27: "The font-weight property controls the thickness of text. For example, font-weight: bold; makes text bold.",

  28: "The margin property controls the space outside an element's border. It separates an element from neighboring elements.",

  29: "The font-size property controls the size of text. It can use units such as px, em, rem or percentages.",

  30: "The display: flex property makes an element a flex container. It allows its direct child elements to be arranged and aligned using Flexbox.",

  31: "The border-radius property rounds the corners of an element's border. Example: border-radius: 10px; creates rounded corners.",

  32: "The universal selector (*) selects all HTML elements on a page. It is commonly used for applying global CSS styles.",


  // React Beginner Explanations

  7: "React is a JavaScript library primarily used for building user interfaces. It allows developers to create reusable components for interactive web applications.",

  8: "The useState Hook manages state in functional components. It returns the current state value and a setter function that updates the state and triggers a re-render.",

  41: "JSX is the syntax used to write HTML-like code inside JavaScript in React. It makes UI code easier to read and allows JavaScript expressions inside markup.",

  42: "A React component is a reusable building block of a user interface. Components can contain their own logic, state and JSX to create different parts of an application.",

  43: "Props are used to pass data from a parent component to a child component. They allow components to receive information and remain reusable.",

  44: "JSX stands for JavaScript XML. It is a syntax extension for JavaScript that allows developers to describe the structure of React user interfaces.",

  45: "The command npm run dev commonly starts the Vite development server. It runs the application locally so developers can view and test their changes.",

  46: "The useEffect Hook is used to perform side effects in functional components, such as fetching data, setting up subscriptions or updating document-related behavior.",

  47: "A React component should return JSX or other renderable content that describes what should appear in the user interface.",

  48: "React uses the key prop to identify list items between renders. Stable unique keys help React detect which items have changed, been added or removed.",


  // HTML Intermediate Explanations

  9: "The alt attribute provides alternative text for an image. Screen readers use this text to describe images to visually impaired users. It also appears when an image cannot load.",

  49: "The fieldset element groups related form controls together. It is often used with the legend element to provide a caption for the group.",

  50: "The target='_blank' attribute opens a hyperlink in a new browsing context, usually a new tab. For external links, rel='noopener' is also a useful security measure.",

  51: "The meta element provides metadata about an HTML document, such as character encoding, viewport settings and page descriptions. It is generally placed inside the head element.",

  52: "The video element embeds video content in an HTML webpage. The controls attribute can provide playback controls, while source elements can specify video files.",

  53: "The for attribute of a label connects it to a form control using the control's id. Clicking the label can then focus or activate the associated control.",

  54: "The nav element represents a section containing important navigation links, such as links to the main pages or sections of a website.",

  55: "The alt attribute provides alternative text for images. It improves accessibility by allowing screen readers to communicate the image's meaning to users.",

  56: "The caption element defines a title or caption for an HTML table. It helps users understand what information the table contains.",

  57: "The email input type is designed for email addresses. Browsers can provide email-specific validation and suitable input behavior.",

  // HTML Advanced Explanations

  13: "The required attribute makes a form control mandatory. The browser prevents normal form submission until the required field has an acceptable value.",

  85: "The defer attribute tells the browser to download an external script while parsing HTML and execute it after HTML parsing is complete. Deferred scripts preserve their document order.",

  86: "The loading='lazy' attribute delays loading an image until it is near the visible viewport. This can reduce unnecessary network requests and improve initial page loading performance.",

  87: "The aria-label attribute provides an accessible name for an element. Screen readers can use it to communicate the element's purpose when visible text is unavailable.",

  88: "The picture element allows different image sources to be selected depending on screen size or image format. It commonly contains source elements and an img fallback.",

  89: "The sandbox attribute applies security restrictions to content embedded inside an iframe. Specific permissions can be enabled using sandbox values when necessary.",

  90: "The form attribute associates a form control with a form using the form's id. This works even when the control is located outside the form element.",

  91: "The time element represents dates or times in HTML. Its datetime attribute can provide a machine-readable date or time value.",

  92: "The rel='noopener' value prevents a newly opened page from accessing the original page through window.opener. This helps protect against certain reverse tabnabbing attacks.",

  93: "CanvasRenderingContext2D is the 2D drawing context API for an HTML canvas. It provides methods for drawing shapes, text, paths and images.",


  // CSS Intermediate Explanations

  10: "CSS Grid is a two-dimensional layout system. It allows developers to arrange elements in both rows and columns, making it useful for complex page layouts.",


  58: "The flex-direction property determines the main axis and direction of flex items. Common values include row, column, row-reverse and column-reverse.",

  59: "The :hover pseudo-class selects an element while the mouse pointer is over it. It is commonly used to create interactive hover effects.",

  60: "The gap property controls the spacing between rows and columns in CSS Grid and Flexbox layouts. It can also be specified separately using row-gap and column-gap.",

  61: "position: absolute removes an element from normal document flow and positions it relative to its nearest positioned ancestor. If none exists, it uses the initial containing block.",

  62: "The rem unit is relative to the font size of the root HTML element. Unlike em, which depends on the relevant parent or element font size, rem uses the root font size.",

  63: "The overflow property controls what happens when content is larger than its containing element. Values include visible, hidden, scroll and auto.",

  64: "The @media rule applies CSS styles based on conditions such as screen width, orientation or device preferences. It is commonly used for responsive web design.",

  65: "The align-items property aligns flex items along the cross axis. For a row-direction flex container, it commonly controls vertical alignment.",

  66: "The child combinator (>) selects elements that are direct children of another element. For example, div > p selects paragraphs directly inside div elements.",

  // CSS Advanced Explanations

  14: "The z-index property controls the stacking order of elements within a stacking context. A higher z-index can place an element above another element.",

  94: "The CSS cascade determines which declaration applies when multiple rules target the same element. Specificity, source order, importance and cascade layers help determine the winning declaration.",

  95: "box-sizing: border-box makes the declared width and height include the content, padding and border. This makes element sizing easier to calculate.",

  96: "An opacity value below 1 creates a stacking context in common cases. This affects how the element and its descendants are layered relative to other elements.",

  97: "The clamp() function sets a value between a minimum and maximum, with a preferred value in between. It is commonly used for fluid responsive typography and layouts.",

  98: "The grid-template-areas property defines named regions in a CSS Grid layout. Grid items can be assigned to these regions using grid-area.",

  99: "An ID selector such as #main has higher specificity than a class selector, type selector or universal selector. Specificity helps determine which CSS rule takes precedence.",

  100: "transform: translateX(20px) moves an element 20 pixels horizontally along the X-axis without changing its normal document-flow position.",

  101: "The pointer-events property controls whether an element can be the target of pointer interactions. For example, pointer-events: none prevents the element from receiving pointer events.",

  102: "CSS containment limits the effects of layout, style or paint operations to an element. It can help improve rendering performance in suitable applications.",


  // JavaScript Intermediate Explanations

  11: "The map() method creates and returns a new array by applying a callback function to every element of the original array. The original array is not modified by map itself.",

  67: "The map() method transforms every element of an array using a callback function and returns the transformed values in a new array.",

  68: "The filter() method returns a new array containing only the elements that satisfy the condition specified by its callback function.",

  69: "The catch keyword handles errors from a try block. It allows the program to respond to exceptions instead of stopping unexpectedly.",

  70: "JSON.stringify() converts a JavaScript value, such as an object or array, into a JSON-formatted string. This is useful for data storage and transmission.",

  71: "The pop() method removes the last element from an array and returns the removed element. It modifies the original array.",

  72: "typeof null returns 'object'. This is a long-standing behavior in JavaScript and is considered a historical language quirk.",

  73: "parseInt() converts a string into an integer. It parses the value from the beginning of the string and can accept a radix to specify the number system.",

  74: "The continue statement skips the remaining statements in the current loop iteration and proceeds to the next iteration.",

  75: "The nullish coalescing operator (??) returns the right-hand value only when the left-hand value is null or undefined. Unlike ||, it does not treat 0, false or an empty string as missing.",

  // JavaScript Advanced Explanations

  15: "A closure is created when a function retains access to variables from its lexical environment even after the outer function has finished executing. Closures are useful for data privacy and maintaining state.",

  103: "A Promise represents the eventual completion or failure of an asynchronous operation. It can be pending, fulfilled or rejected.",

  104: "The event loop coordinates JavaScript execution by managing queued callbacks and asynchronous tasks. It allows non-blocking operations to work alongside the main execution thread.",

  105: "Object.freeze() prevents changes to an object's own properties, such as adding, deleting or modifying them. It is shallow, so nested objects are not automatically frozen.",

  106: "Promise.all() accepts an iterable of promises and fulfills when all of them fulfill. It rejects as soon as one input promise rejects.",

  107: "The spread syntax (...) expands elements of an array into individual values. It is commonly used for copying arrays, combining arrays and passing arguments to functions.",

  108: "Event delegation handles events through a common ancestor instead of attaching separate listeners to every child. Event bubbling makes this technique possible.",

  109: "let is block-scoped, while var is function-scoped or globally scoped depending on where it is declared. let also cannot be redeclared in the same block.",

  110: "The finally block executes after the try and catch blocks, regardless of whether an exception occurred. It is commonly used for cleanup operations.",

  111: "JavaScript modules organize code into separate files and allow functionality to be shared through export and import statements.",


  // React Intermediate Explanations

  12: "The useEffect Hook handles side effects in functional components. It can run after rendering and is commonly used for data fetching, subscriptions and synchronization with external systems.",

  76: "Props allow a parent component to pass data to a child component. They are read-only inputs that help components share information.",

  77: "The useState Hook adds state to a functional component. Calling its setter function requests a re-render with the updated state.",

  78: "The useEffect Hook synchronizes a component with external systems and handles side effects such as subscriptions, timers and network requests.",

  79: "React keys help identify list items between renders. Stable and unique keys help React correctly track items when a list changes.",

  80: "JSX is a JavaScript syntax extension that allows developers to describe UI using HTML-like syntax. React transforms JSX into JavaScript instructions.",

  81: "A controlled input is an input whose value is managed by React state. Its value is updated through an event handler such as onChange.",

  82: "The useRef Hook stores a mutable value that persists between renders. Changing ref.current does not trigger a component re-render.",

  83: "Lifting state up means moving shared state into the closest common parent component. This allows multiple child components to use and update the same data.",

  84: "React.Fragment groups multiple JSX elements without adding an unnecessary wrapper element to the DOM.",

  // React Advanced Explanations

  16: "React keys help React identify which list items have changed, been added or removed between renders. Stable unique keys improve correct list reconciliation.",

  112: "React.memo is a higher-order component that can skip re-rendering a component when its props have not changed according to its comparison behavior. It is a performance optimization.",

  113: "The useMemo Hook memoizes the result of a calculation between renders. React recalculates the value when its dependencies change.",

  114: "The useCallback Hook memoizes a function reference between renders until its dependencies change. It can help avoid unnecessary renders in memoized child components.",

  115: "A functional state updater receives the previous state and calculates the next state from it. This is useful when updates depend on the latest queued state value.",

  116: "A custom Hook is a reusable JavaScript function that uses React Hooks. Its name should begin with 'use', and it allows stateful logic to be shared between components.",

  117: "An Error Boundary catches JavaScript errors during rendering and lifecycle methods in its descendant component tree. It can display fallback UI instead of crashing that part of the application.",

  118: "React.StrictMode helps identify potential problems in an application during development. It performs additional checks and may re-run certain functions to reveal unsafe behavior.",

  119: "Side effects should not run directly during rendering because React rendering should remain pure and predictable. Effects should generally be handled using appropriate Hooks or event handlers.",

  120: "Reconciliation is the process React uses to compare the previous and new UI descriptions and determine the necessary updates to the DOM."



};
const shuffleQuestions = (items) => {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

function getSavedProgress(storageKey) {



  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Unable to load saved progress:", error);
    return {};
  }
}


function Assessment({ selectedCourse = null }) {
  const storageKey = selectedCourse
    ? `adaptiveLearningProgress_${selectedCourse}`
    : "adaptiveLearningProgress_general";

  const savedProgress = getSavedProgress(storageKey);
  const [current, setCurrent] = useState(savedProgress.current ?? 0);
const [answers, setAnswers] = useState(savedProgress.answers ?? {});
const [submitted, setSubmitted] = useState(savedProgress.submitted ?? false);

const [difficulty, setDifficulty] = useState(
  savedProgress.difficulty ?? "Beginner"
);

const [challengeStage, setChallengeStage] = useState(
  savedProgress.challengeStage ?? 1
);

const [isChallenge, setIsChallenge] = useState(
  savedProgress.isChallenge ?? false
);

const [questionOrder, setQuestionOrder] = useState(
  savedProgress.questionOrder ?? []
);

const [quizSeed, setQuizSeed] = useState(0);

useEffect(() => {
  const progress = {
    current,
    answers,
    submitted,
    difficulty,
    challengeStage,
    isChallenge,
    questionOrder,
    quizSeed,
  };

  localStorage.setItem(
  storageKey,
  JSON.stringify(progress)
);
}, [
  current,
  answers,
  submitted,
  difficulty,
  challengeStage,
  isChallenge,
  storageKey,
  questionOrder,
  quizSeed,
]);


const courseTopicMap = {
  "HTML Fundamentals": "HTML",
  "CSS Fundamentals": "CSS",
  "JavaScript": "JavaScript",
  "React Development": "React",
};

const selectedTopic = courseTopicMap[selectedCourse];

const quizQuestions = useMemo(() => {
  const availableQuestions = isChallenge
    ? advancedChallenges[challengeStage]
    : questions.filter(
        (q) =>
          q.difficulty === difficulty &&
          (!selectedCourse ||
            q.topic === courseTopicMap[selectedCourse])
      );

  const isSavedOrderValid =
    questionOrder.length === availableQuestions.length &&
    questionOrder.every((id) =>
      availableQuestions.some((q) => q.id === id)
    );

  if (isSavedOrderValid) {
    return questionOrder.map((id) =>
      availableQuestions.find((q) => q.id === id)
    );
  }

  return shuffleQuestions(availableQuestions);
}, [
  selectedCourse,
  difficulty,
  isChallenge,
  challengeStage,
  questionOrder,
  quizSeed,
]);

useEffect(() => {
  const newOrder = quizQuestions.map((q) => q.id);

  if (newOrder.join(",") !== questionOrder.join(",")) {
    setQuestionOrder(newOrder);
  }
}, [quizQuestions, questionOrder]);


  const question = quizQuestions[current];

  const score = quizQuestions.filter(
  (q) => answers[q.id] === q.answer
).length;

const percentage = Math.round(
  (score / quizQuestions.length) * 100
);

  const adaptiveResult = calculateNextDifficulty(
  score,
  quizQuestions.length,
  difficulty
);

// Advanced Challenge conditions
const challengePassed = isChallenge && percentage === 100;

const canStartChallenge =
  !isChallenge &&
  difficulty === "Advanced" &&
  percentage === 100;

const finalChallengeCompleted =
  isChallenge &&
  challengeStage === 3 &&
  challengePassed;

  // Calculate topic-wise performance
  // Calculate topic-wise performance
const topicsToAnalyze = selectedTopic
  ? [selectedTopic]
  : ["HTML", "CSS", "JavaScript", "React"];

const topicResults = topicsToAnalyze.map((topic) => {
  const topicQuestions = quizQuestions.filter(
    (q) => q.topic === topic
  );

  const correct = topicQuestions.filter(
    (q) => answers[q.id] === q.answer
  ).length;

  return {
    topic,
    correct,
    total: topicQuestions.length,
    percentage: topicQuestions.length > 0
      ? Math.round((correct / topicQuestions.length) * 100)
      : 0,
  };
});

      
const weakTopics=topicResults.filter(
  (item) => item.percentage < 60
);
  
  const recommendations= generateRecommendations(topicResults);

// Personalized AI-style Feedback Logic

const incorrectQuestions = quizQuestions.filter(
  (q) => answers[q.id] !== q.answer
);

const strongTopics = topicResults.filter(
  (item) => item.percentage >= 80
);

const personalizedFeedback =
  percentage >= 80
    ? {
        title: "Outstanding Performance!",
        message: "You have demonstrated excellent understanding. Continue challenging yourself with advanced concepts.",
        action: "Move to more challenging questions and apply your knowledge in practical projects."
      }
    : percentage >= 70
    ? {
        title: "Good Progress!",
        message: "You understand most of the concepts, but a few areas need additional practice.",
        action: "Review incorrect answers and practise the concepts where you lost marks."
      }
    : percentage >= 50
    ? {
        title: "Keep Improving!",
        message: "You have a basic understanding, but some important concepts need more attention.",
        action: "Revise the recommended topics and attempt another assessment."
      }
    : {
        title: "Let's Strengthen Your Basics!",
        message: "You need more practice with the fundamental concepts before progressing.",
        action: "Revisit the beginner lessons, study the explanations and retake the assessment."
      };


  
const handleSubmit = () => {
  if (Object.keys(answers).length !== quizQuestions.length) {
    alert("Please answer all questions before submitting.");
    return;
  }

  const newRecord = {
    id: Date.now(),
    type: isChallenge ? "Advanced Challenge" : "Assessment",
    difficulty,
    challengeStage: isChallenge ? challengeStage : null,
    score,
    totalQuestions: quizQuestions.length,
    percentage,
    topicResults,
    completedAt: new Date().toISOString(),
  };

  try {
    const previousHistory = JSON.parse(
      localStorage.getItem("assessmentHistory") || "[]"
    );

    const updatedHistory = [...previousHistory, newRecord];

    localStorage.setItem(
      "assessmentHistory",
      JSON.stringify(updatedHistory)
    );

    setSubmitted(true);
  } catch (error) {
    console.error("Unable to save assessment history:", error);
    alert("Unable to save your assessment history.");
  }
};


    
    

  const restartQuiz = () => {
  setCurrent(0);
  setAnswers({});
  setSubmitted(false);
  setQuestionOrder([]);
setQuizSeed((previous) => previous + 1);

  if (isChallenge) {
    setIsChallenge(true);
  } else {
    setDifficulty(adaptiveResult.level);
  }
};

const startAdvancedChallenge = () => {
  setChallengeStage(1);
  setIsChallenge(true);
  setDifficulty("Advanced");
  setCurrent(0);
  setAnswers({});
  setSubmitted(false);
  setQuestionOrder([]);
setQuizSeed((previous) => previous + 1);
};

const goToNextChallenge = () => {
  setChallengeStage((previous) => previous + 1);
  setCurrent(0);
  setAnswers({});
  setSubmitted(false);
  setQuestionOrder([]);
setQuizSeed((previous) => previous + 1);
  setIsChallenge(true);
};

  // Results screen
  if (submitted) {
    return (
      <div className="space-y-7">

        <div className="rounded-3xl bg-gradient-to-r from-violet-700 to-indigo-600 p-8 text-white">
          <Trophy size={40} className="mb-4" />

          <p className="text-violet-200">Assessment Completed</p>

          <h2 className="mt-2 text-3xl font-bold">
            Your Performance Report
          </h2>

          <div className="mt-6 flex flex-wrap items-center gap-8">
            <div>
              <p className="text-sm text-violet-200">Your Score</p>
              <h3 className="text-5xl font-bold">
                {percentage}%
              </h3>
            </div>

            <div>
              <p className="text-sm text-violet-200">Correct Answers</p>
              <h3 className="text-3xl font-bold">
                {score}/{quizQuestions.length}
              </h3>
            </div>
          </div>
        </div>
{/* Answer Review */}
<div className="rounded-2xl border border-slate-100 bg-white p-6">
  <h3 className="mb-5 text-xl font-bold">
    Answer Review
  </h3>

  <div className="space-y-5">
    {quizQuestions.map((q, index) => {
      const selectedAnswer = answers[q.id];
      const isCorrect = selectedAnswer === q.answer;

      return (
        <div
          key={q.id}
          className="rounded-xl border border-slate-200 p-4"
        >
          <p className="font-semibold">
            {index + 1}. {q.question}
          </p>

          <p className={`mt-3 text-sm font-medium ${
            isCorrect ? "text-emerald-600" : "text-red-600"
          }`}>
            {isCorrect ? "✓ Correct" : "✗ Incorrect"}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Your answer: {q.options[selectedAnswer]}
          </p>

          <p className="mt-1 text-sm font-semibold text-emerald-700">
            Correct answer: {q.options[q.answer]}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Explanation: {questionExplanations[q.id] || q.explanation ||
              `The correct answer is ${q.options[q.answer]}. Review this concept to strengthen your understanding.`}
          </p>
        </div>
      );
    })}
  </div>
</div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div className="assessment-card rounded-2xl border border-slate-100 bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <Target className="text-violet-600" />
              <h3 className="text-lg font-bold">
                Topic-wise Analysis
              </h3>
            </div>

            <div className="space-y-5">
              {topicResults.map((item) => (
                <div key={item.topic}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">
                      {item.topic}
                    </span>
                    <span className="font-semibold">
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${
                        item.percentage >= 60
                          ? "bg-emerald-500"
                          : "bg-orange-500"
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <div className="mb-5 flex items-center gap-3">
              <BrainCircuit className="text-violet-600" />
              <h3 className="text-lg font-bold">
                Learning Analysis
              </h3>
            </div>

            {percentage >= 80 ? (
              <div className="rounded-xl bg-emerald-50 p-4 text-emerald-800">
                <CheckCircle className="mb-2" />
                <p className="font-semibold">Excellent performance!</p>
                <p className="mt-2 text-sm">
                  You have demonstrated strong understanding.
                  Try more advanced questions.
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-orange-50 p-4 text-orange-800">
                <Target className="mb-2" />
                <p className="font-semibold">
                  Areas for improvement
                </p>
                <p className="mt-2 text-sm">
                  Revise your weaker topics and practice
                  additional questions.
                </p>
              </div>
            )}

            <h4 className="mb-3 mt-5 font-semibold">
              Recommended topics
            </h4>

            {weakTopics.length > 0 ? (
              weakTopics.map((item) => (
                <div
                  key={item.topic}
                  className="mb-2 flex items-center gap-2 text-sm text-slate-600"
                >
                  <BookOpen size={16} className="text-violet-600" />
                  {item.topic} – needs revision
                </div>
              ))
            ) : (
              <p className="text-sm text-emerald-700">
                No major weak topics identified. Keep progressing!
              </p>
            )}
          </div>

        </div>

        <div className="flex flex-wrap gap-3">
          

{/* Personalized Recommendation Engine */}
<div className="rounded-2xl border border-violet-100 bg-white p-6">
  <div className="mb-5 flex items-center gap-3">
    <Sparkles className="text-violet-600" />
    <div>
      <h3 className="text-lg font-bold">
        Personalized Learning Recommendations
      </h3>
      <p className="text-sm text-slate-500">
        Suggestions based on your assessment performance
      </p>
    </div>
  </div>

  <div className="space-y-4">
    {recommendations.map((item) => (
      <div
        key={item.topic}
        className="rounded-xl border border-slate-100 bg-slate-50 p-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-semibold text-slate-800">
            {item.topic}
          </h4>

          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
            item.priority === "High"
              ? "bg-red-100 text-red-700"
              : item.priority === "Medium"
              ? "bg-orange-100 text-orange-700"
              : "bg-emerald-100 text-emerald-700"
          }`}>
            {item.priority} Priority
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-600">
          Score: {item.percentage}%
        </p>

        <p className="mt-2 text-sm text-slate-700">
          {item.message}
        </p>

        <p className="mt-2 text-sm text-violet-700">
          <BookOpen size={15} className="mr-1 inline" />
          {item.suggestion}
        </p>
      </div>
    ))}
  </div>
</div>
{/* Personalized Feedback */}
<div className="rounded-2xl border border-violet-100 bg-white p-6">
  <div className="mb-4 flex items-center gap-3">
    <Sparkles className="text-violet-600" size={22} />
    <div>
      <h3 className="text-lg font-bold">Personalized Feedback</h3>
      <p className="text-sm text-slate-500">
        Generated from your assessment answers
      </p>
    </div>
  </div>

  <h4 className="text-lg font-semibold text-violet-800">
    {personalizedFeedback.title}
  </h4>

  <p className="mt-2 text-sm text-slate-700">
    {personalizedFeedback.message}
  </p>

  <div className="mt-4 rounded-xl bg-violet-50 p-4">
    <p className="font-semibold text-violet-900">Your next step</p>
    <p className="mt-1 text-sm text-violet-800">
      {personalizedFeedback.action}
    </p>
  </div>

  <div className="mt-4 grid gap-3 sm:grid-cols-2">
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">Questions to review</p>
      <p className="mt-1 text-2xl font-bold">
        {incorrectQuestions.length}
      </p>
    </div>

    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">Strong topics</p>
      <p className="mt-1 text-2xl font-bold">
        {strongTopics.length}
      </p>
    </div>
  </div>

  {incorrectQuestions.length > 0 && (
    <div className="mt-4">
      <p className="mb-2 text-sm font-semibold">Concepts to revisit</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
        {incorrectQuestions.map((q) => (
          <li key={q.id} className="mb-3">
  <p className="font-medium">
    {q.topic}: {q.question}
  </p>

  <p className="mt-1 text-violet-700">
    Concept: {getConceptFromQuestion(q.question, q.topic)}
  </p>

  <p className="text-sm text-indigo-700">
    Recommended lesson: {
      getRecommendedLesson(
        getConceptFromQuestion(q.question, q.topic)
      ) || getRecommendedLesson(q.topic) || "Review this topic"
    }
  </p>
</li>
        ))}
      </ul>
    </div>
  )}

  {strongTopics.length > 0 && (
    <p className="mt-4 text-sm text-emerald-700">
      Strong performance:{" "}
      {strongTopics.map((item) => item.topic).join(", ")}
    </p>
  )}
</div>

{/* Adaptive Learning Result */}
<div className="rounded-2xl border border-indigo-100 bg-white p-6">
  <div className="mb-4 flex items-center gap-3">
    <BrainCircuit className="text-indigo-600" size={24} />
    <h3 className="text-lg font-bold">
      Adaptive Learning Analysis
    </h3>
  </div>

  <div className="rounded-xl bg-indigo-50 p-4">
    <p className="text-sm font-medium text-indigo-700">
      Recommended Next Difficulty
    </p>

    <h4 className="mt-2 text-2xl font-bold text-indigo-900">
      {adaptiveResult.level}
    </h4>

    <p className="mt-2 text-sm text-indigo-700">
      {adaptiveResult.message}
    </p>

    <p className="mt-3 text-xs text-indigo-500">
      Based on your accuracy of {percentage}%
    </p>
  </div>
</div>

{finalChallengeCompleted && (
  <div className="rounded-2xl border border-yellow-300 bg-yellow-50 p-6 text-center">
    <div className="text-5xl mb-3">🏆</div>

    <h2 className="text-2xl font-bold text-yellow-800">
      Advanced Master!
    </h2>

    <p className="mt-2 text-yellow-700 font-medium">
      Outstanding achievement! You scored {percentage}% at the Advanced level.
    </p>

    <p className="mt-3 text-sm text-yellow-700">
      You have successfully mastered this assessment.
      Keep learning with new challenges!
    </p>

    <div className="mt-4 inline-block rounded-full bg-yellow-200 px-4 py-2 text-sm font-semibold text-yellow-900">
      Achievement Unlocked
    </div>
  </div>
)}

{canStartChallenge && (
  <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6 text-center">
    <h3 className="text-xl font-bold text-violet-900">
      Advanced Challenge Unlocked!
    </h3>

    <p className="mt-2 text-sm text-violet-700">
      You scored 100% in the Advanced assessment. Ready for a tougher challenge?
    </p>

    <button
      onClick={startAdvancedChallenge}
      className="mt-4 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
    >
      Start Challenge 1
    </button>
  </div>
)}

{/* Next Challenge Button */}
{isChallenge && challengePassed && challengeStage < 3 && (
  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
    <h3 className="text-xl font-bold text-emerald-900">
      Challenge {challengeStage} Completed!
    </h3>

    <p className="mt-2 text-sm text-emerald-700">
      Excellent! You scored 100%. The next challenge is unlocked.
    </p>

    <button
      onClick={goToNextChallenge}
      className="mt-4 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
    >
      Start Challenge {challengeStage + 1}
    </button>
  </div>
)}




<div className="flex w-full items-start">
  <button
    onClick={restartQuiz}
    style={{
      width: "fit-content",
      height: "auto",
      alignSelf: "flex-start"
    }}
    className="inline-flex flex-none items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
  >
    <RotateCcw size={17} />
    Retake Assessment
  </button>
</div>

        </div>

      </div>
    );
  }

  // Quiz screen
  return (
    <div className="space-y-6">

      <div className="rounded-2xl border border-slate-100 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-violet-600">
              <Sparkles size={18} />
              <span className="text-sm font-semibold">
                KNOWLEDGE ASSESSMENT
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold">
              {selectedCourse
  ? `${selectedCourse} Assessment`
  : "Computer Science Assessment"}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Test your knowledge of HTML, CSS, JavaScript and React.
            </p>
          </div>

          <div className="rounded-xl bg-violet-50 px-4 py-3 text-center">
            <p className="text-xs text-violet-500">Total Questions</p>
            <p className="text-xl font-bold text-violet-700">
              {quizQuestions.length}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6">

        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-semibold text-violet-600">
            Question {current + 1} of {quizQuestions.length}
          </span>

          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-600">
            {question.topic}
          </span>
        </div>

        <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-violet-600 transition-all"
            style={{
              width: `${((current + 1) / quizQuestions.length) * 100}%`
            }}
          />
        </div>

        <h3 className="mb-7 text-xl font-bold leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const selected = answers[question.id] === index;

            return (
              <button
                key={index}
                onClick={() =>
                  setAnswers((previous) => ({
                    ...previous,
                    [question.id]: index
                  }))
                }
                className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-violet-600 bg-violet-50 text-violet-800"
                    : "border-slate-200 hover:border-violet-300 hover:bg-slate-50"
                }`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                  selected
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>

                <span className="text-sm font-medium">
                  {option}
                </span>

                {selected && (
                  <CheckCircle
                    className="ml-auto text-violet-600"
                    size={19}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">

          <button
            onClick={() => setCurrent((value) => value - 1)}
            disabled={current === 0}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={17} />
            Previous
          </button>

          {current < quizQuestions.length - 1 ? (
            <button
              onClick={() => setCurrent((value) => value + 1)}
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700"
            >
              Next Question
              <ArrowRight size={17} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Submit Assessment
              <CheckCircle size={17} />
            </button>
          )}

        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          {Object.keys(answers).length} of {quizQuestions.length} questions answered
        </p>

      </div>

    </div>
  );
}

export default Assessment;
