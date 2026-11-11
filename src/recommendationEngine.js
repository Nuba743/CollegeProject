const topicResources = {
  HTML: "Revise HTML tags, forms, semantic elements, and page structure.",
  CSS: "Practice selectors, box model, Flexbox, Grid, and responsive design.",
  JavaScript: "Revise variables, functions, arrays, objects, and DOM manipulation.",
  React: "Practice components, props, state, hooks, and event handling.",
};

export function generateRecommendations(topicResults) {
  if (!Array.isArray(topicResults) || topicResults.length === 0) {
    return [];
  }

  return topicResults
    .map((result) => {
      const percentage =
        result.total > 0
          ? Math.round((result.correct / result.total) * 100)
          : 0;

      let priority;
      let message;

      if (percentage < 50) {
        priority = "High";
        message = "You need more practice in this topic.";
      } else if (percentage < 80) {
  priority = "Medium";
  message = "Good effort! Keep practising at your current difficulty level.";
} else {
  priority = "Low";
  message = "Excellent performance! You may be ready for the next difficulty level.";
}

      return {
        topic: result.topic,
        percentage,
        priority,
        message,
        suggestion:
          topicResources[result.topic] ||
          `Revise ${result.topic} and practise more questions.`,
      };
    })
    .sort((a, b) => a.percentage - b.percentage);
}
// Map weak concepts to their corresponding lessons
export const getRecommendedLesson = (topic) => {
  const lessonMap = {
    HTML: "HTML Elements and Tags",
    "HTML Attributes": "HTML Attributes",
    "HTML Forms": "HTML Forms and Input Elements",
    CSS: "Introduction to CSS",
    "CSS Selectors": "CSS Selectors",
    "CSS Colors": "Colors and Backgrounds",
    "Flexbox": "Flexbox and Grid",
    "Grid": "Flexbox and Grid",
    JavaScript: "Introduction to JavaScript",
    Variables: "Variables and Data Types",
    Functions: "Functions and Scope",
    DOM: "DOM Manipulation",
    Events: "Events and Event Handling",
    React: "Introduction to React",
    JSX: "Components and JSX",
    Props: "Props and State",
    State: "Props and State",
    Hooks: "React Hooks",
    Routing: "React Router"
  };

  return lessonMap[topic] || null;
};

// Identify concepts from assessment question text
export const getConceptFromQuestion = (question, topic) => {
  const text = question.toLowerCase();

  const rules = [
    [/selector/, "CSS Selectors"],
    [/background|color/, "CSS Colors"],
    [/flexbox/, "Flexbox"],
    [/cross axis|align-items|aligns flex items/, "Flexbox"],
[/screen sizes|different screen sizes|media quer|responsive/, "Responsive Design"],
[/two-dimensional|2d layout|css grid/, "Grid"],
    [/\bgrid\b/, "Grid"],
    [/box model|margin|padding|border/, "CSS"],
    [/form|input/, "HTML Forms"],
    [/attribute/, "HTML Attributes"],
    [/semantic|tag|element/, "HTML"],
    [/variable|datatype/, "Variables"],
    [/function|scope/, "Functions"],
    [/dom|document/, "DOM"],
    [/event|onclick/, "Events"],
    [/hook|useeffect|usestate/, "Hooks"],
    [/props/, "Props"],
    [/state/, "State"],
    [/jsx|component/, "JSX"],
    [/react/, "React"],
    [/array|object/, "JavaScript"],
  ];

  const match = rules.find(([pattern]) => pattern.test(text));

  return match ? match[1] : topic;
};