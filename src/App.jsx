
import { useState,useEffect, useRef } from "react";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  BrainCircuit,
  ChartNoAxesColumnIncreasing,
  Settings,
  Bell,
  Search,
  Clock3,
  ArrowUpRight,
  Play,
  Sparkles,
  Target,
  Flame,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import Assessment from "./Assessment"
import AITutor from "./AITutor";
import Auth from "./Auth";
import { lessonContentData } from "./lessonContent";
import { generateRecommendations } from "./recommendationEngine";
import { generateLearningPath } from "./learningPathEngine";

function App() {
const [studyHours, setStudyHours] = useState(
  Number(localStorage.getItem("studyHours")) || 0
);
  const [studentName, setStudentName] = useState(
  localStorage.getItem("studentName") || "Alex"
);

const [studentEmail, setStudentEmail] = useState(
  localStorage.getItem("studentEmail") || ""
);

const [isAuthenticated, setIsAuthenticated] = useState(
  localStorage.getItem("isAuthenticated") === "true"
);


  const [activePage, setActivePage] = useState(
  localStorage.getItem("activePage") || "Dashboard"
);

const [selectedCourse, setSelectedCourse] = useState(
  localStorage.getItem("selectedCourse") || null
);
const [assessmentCourse, setAssessmentCourse] = useState(
  localStorage.getItem("activeAssessmentCourse") || null
);
const [selectedLesson, setSelectedLesson] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("selectedLesson")) || null;
  } catch {
    return null;
  }
});

const [lessonContentOpen, setLessonContentOpen] = useState(
  localStorage.getItem("lessonContentOpen") === "true"
);
const lessonContentRef = useRef(null);
useEffect(() => {
  localStorage.setItem("activePage", activePage);

  if (selectedCourse) {
    localStorage.setItem("selectedCourse", selectedCourse);
  }

  if (selectedLesson) {
    localStorage.setItem("selectedLesson", JSON.stringify(selectedLesson));
  } else {
    localStorage.removeItem("selectedLesson");
  }

  localStorage.setItem(
    "lessonContentOpen",
    String(lessonContentOpen)
  );
}, [activePage, selectedCourse, selectedLesson, lessonContentOpen]);
useEffect(() => {
  if (lessonContentOpen && selectedLesson) {
    requestAnimationFrame(() => {
      lessonContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }
}, [lessonContentOpen, selectedLesson]);
const [completedLessons, setCompletedLessons] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem("completedLessons") || "{}"
    );
  } catch {
    return {};
  }
});

const toggleLessonComplete = (courseName, lesson) => {
  setCompletedLessons((previous) => {
    const courseLessons = previous[courseName] || [];

    const updatedLessons = courseLessons.includes(lesson)
      ? courseLessons.filter((item) => item !== lesson)
      : [...courseLessons, lesson];

    const updated = {
      ...previous,
      [courseName]: updatedLessons,
    };
    
    localStorage.setItem("completedLessons", JSON.stringify(updated));

    return updated;
  });
};

const getCourseProgress = (courseName) => {
  const totalLessons = courseDetails[courseName]?.length || 0;
  const completed = completedLessons[courseName]?.length || 0;

  return totalLessons > 0
    ? Math.round((completed / totalLessons) * 100)
    : 0;
};
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");

  const [notifications, setNotifications] = useState([
  {
    id: 1,
    title: "Welcome to LearnAI!",
    message: "Start learning and explore your courses.",
    read: false,
  },
  {
    id: 2,
    title: "Learning reminder",
    message: "Complete your daily study goal today.",
    read: false,
  },
  {
    id: 3,
    title: "Assessment update",
    message: "Check your latest assessment performance.",
    read: true,
  },
]);
const [assessmentHistory, setAssessmentHistory] = useState(() => {
  try {
    return JSON.parse(
      localStorage.getItem("assessmentHistory") || "[]"
    );
  } catch (error) {
    console.error("Unable to load assessment history:", error);
    return [];
  }
});

  useEffect(() => {
  localStorage.setItem("activePage", activePage);
}, [activePage]);

useEffect(() => {
  try {
    const savedHistory = JSON.parse(
      localStorage.getItem("assessmentHistory") || "[]"
    );

    setAssessmentHistory(savedHistory);
  } catch (error) {
    console.error("Unable to refresh assessment history:", error);
    setAssessmentHistory([]);
  }
}, [activePage]);

const handleLogin = (user) => {
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("studentName", user.name);
  localStorage.setItem("studentEmail", user.email);

  setStudentName(user.name);
  setStudentEmail(user.email);
  setIsAuthenticated(true);
};

const handleLogout = () => {
  localStorage.removeItem("isAuthenticated");
  setIsAuthenticated(false);
};

const topicNames = ["HTML", "CSS", "JavaScript", "React"];

const topicPerformance = topicNames.map((topic) => {
  const correct = assessmentHistory.reduce(
    (sum, record) => {
      const result = record.topicResults?.find(
        (item) => item.topic === topic
      );

      return sum + (result?.correct || 0);
    },
    0
  );

  const total = assessmentHistory.reduce(
    (sum, record) => {
      const result = record.topicResults?.find(
        (item) => item.topic === topic
      );

      return sum + (result?.total || 0);
    },
    0
  );

  return {
    topic,
    correct,
    total,
    percentage: total > 0
      ? Math.round((correct / total) * 100)
      : 0,
  };
});
const recommendations = generateRecommendations(topicPerformance);
const learningPath = generateLearningPath(topicPerformance);

const completedAssessments = assessmentHistory.length;

const averageScore =
  completedAssessments > 0
    ? Math.round(
        assessmentHistory.reduce(
          (total, record) => total + record.percentage,
          0
        ) / completedAssessments
      )
    : 0;

const recentAssessmentTrend = [...assessmentHistory]
  .filter((record) => typeof record.percentage === "number")
  .sort(
    (a, b) =>
      new Date(a.completedAt) - new Date(b.completedAt)
  )
  .slice(-7);

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Courses", icon: BookOpen },
    { name: "Assessment", icon: ClipboardCheck },
    { name: "AI Tutor", icon: BrainCircuit },
    { name: "My Progress", icon: ChartNoAxesColumnIncreasing },
  ];

  

const courses = [
  {
    title: "HTML Fundamentals",
    courseName: "HTML Fundamentals",
    category: "Web Development",
    color: "bg-orange-500",
    icon: "HTML",
    bg: "bg-orange-100",
  },
  {
    title: "CSS Fundamentals",
    courseName: "CSS Fundamentals",
    category: "Web Design",
    color: "bg-blue-500",
    icon: "CSS",
    bg: "bg-blue-100",
  },
  {
    title: "JavaScript Fundamentals",
    courseName: "JavaScript",
    category: "Programming",
    color: "bg-violet-500",
    icon: "JS",
    bg: "bg-violet-100",
  },
  {
    title: "React Development",
    courseName: "React Development",
    category: "Frontend Development",
    color: "bg-emerald-500",
    icon: "RE",
    bg: "bg-emerald-100",
  },
];



  const courseDetails = {
  "HTML Fundamentals": [
    "Introduction to HTML",
    "HTML Elements and Tags",
    "HTML Attributes",
    "HTML Forms and Input Elements",
    "HTML Tables and Semantic Elements",
  ],

  "CSS Fundamentals": [
    "Introduction to CSS",
    "CSS Selectors",
    "Colors and Backgrounds",
    "Flexbox and Grid",
    "Responsive Web Design",
  ],

  "JavaScript": [
    "Introduction to JavaScript",
    "Variables and Data Types",
    "Functions and Scope",
    "DOM Manipulation",
    "Events and Event Handling",
  ],

  "React Development": [
    "Introduction to React",
    "Components and JSX",
    "Props and State",
    "React Hooks",
    "React Router",
  ],
};

  const dashboardRecommendations = recommendations.map((item) => ({
  title: `${item.topic} Practice`,
  reason: item.suggestion,
  level: item.priority,
}));

  return (
  !isAuthenticated ? (
    <Auth onLogin={handleLogin} />
  ) : (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <aside className="h-full w-72 bg-white p-6">
            <button
              onClick={() => setMenuOpen(false)}
              className="mb-8"
            >
              <X />
            </button>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActivePage(item.name);
                    setMenuOpen(false);
                  }}
                  className="mb-3 flex w-full items-center gap-3 rounded-xl p-3 hover:bg-violet-50"
                >
                  <Icon size={19} />
                  {item.name}
                </button>
              );
            })}
          </aside>
        </div>
      )}

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-6 lg:block">

          <div className="mb-10 flex items-center gap-3">
            <div className="rounded-xl bg-violet-600 p-3 text-white">
              <BrainCircuit size={25} />
            </div>
            <div>
              <h1 className="text-lg font-bold">LearnAI</h1>
              <p className="text-xs text-slate-400">
                Personalized Learning
              </p>
            </div>
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const selected = activePage === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActivePage(item.name)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    selected
                      ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                      : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                </button>
              );
            })}
          </nav>

          <div className="mt-12 rounded-2xl bg-violet-50  p-4">
            <Sparkles className="mb-3 text-violet-600" size={24} />
            <h3 className="font-semibold ">
  AI Learning Assistant
</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500 ">
              Get personalized guidance and improve your learning.
            </p>
            <button
              onClick={() => setActivePage("AI Tutor")}
              className="mt-4 flex items-center gap-2 text-sm font-semibold text-violet-700"
            >
              Ask AI Tutor <ArrowUpRight size={16} />
            </button>
          </div>

          <button
            onClick={() => setActivePage("Settings")}
            className="mt-10 flex items-center gap-3 text-sm text-slate-500 hover:text-violet-700"
          >
            <Settings size={19} /> Settings
          </button>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">

          {/* Header */}
          <header className="mb-9 flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <button
                className="lg:hidden"
                onClick={() => setMenuOpen(true)}
              >
                <Menu size={24} />
              </button>

              <div>
                <h2 className="text-2xl font-bold">
                  {activePage === "Dashboard"
                    ? "Dashboard"
                    : activePage}
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Welcome back! Continue your learning journey.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
  <button
    onClick={() => {
      setSearchOpen(!searchOpen);
      setSearchQuery("");
    }}
    className="rounded-xl border border-slate-200 bg-white p-3"
  >
    <Search size={19} />
  </button>

  {searchOpen && (
    <div className="absolute right-0 top-14 z-50 w-72 rounded-xl border bg-white p-3 shadow-xl">
      <input
        type="text"
        autoFocus
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search courses or topics..."
        className="w-full rounded-lg border p-3 text-sm outline-none focus:border-violet-500"
      />

      {searchQuery.trim() && (
        <div className="mt-2 space-y-1">
          {["HTML Fundamentals", "CSS Fundamentals", "JavaScript", "React Development"]
            .filter((item) =>
              item.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActivePage("My Courses");
                  setSearchOpen(false);
                }}
                className="block w-full rounded-lg p-2 text-left text-sm hover:bg-violet-50"
              >
                {item}
              </button>
            ))}

          {!["HTML Fundamentals", "CSS Fundamentals", "JavaScript", "React Development"]
            .some((item) =>
              item.toLowerCase().includes(searchQuery.toLowerCase())
            ) && (
              <p className="p-2 text-sm text-slate-500">
                No results found.
              </p>
            )}
        </div>
      )}
    </div>
  )}
</div>

              
<div className="relative">
  <button
    onClick={() => setNotificationOpen(!notificationOpen)}
    className="relative rounded-xl border border-slate-200 bg-white p-3"
  >
    <Bell size={19} />

    {notifications.some((item) => !item.read) && (
      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
    )}
  </button>

  {notificationOpen && (
    <div className="absolute right-0 top-14 z-50 w-80 max-w-[90vw] rounded-2xl border bg-white p-4 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Notifications</h3>

        <button
  type="button"
  onClick={() => {
    setNotifications(
      notifications.map((item) => ({
        ...item,
        read: true,
      }))
    );
  }}
  className="text-xs font-semibold text-violet-600"
>
  Mark all read
</button>
      </div>

      <div className="space-y-3 max-h-72 overflow-y-auto">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              setNotifications((previous) =>
                previous.map((notification) =>
                  notification.id === item.id
                    ? { ...notification, read: true }
                    : notification
                )
              )
            }
            className={`cursor-pointer rounded-xl p-3 ${
              item.read ? "bg-slate-50" : "bg-violet-50"
            }`}
          >
            <div className="flex justify-between gap-2">
              <h4 className="text-sm font-semibold">{item.title}</h4>
              {!item.read && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-violet-600 mt-1" />
              )}
            </div>

            <p className="mt-1 text-xs text-slate-500">
              {item.message}
            </p>
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="py-5 text-center text-sm text-slate-500">
            No notifications yet.
          </p>
        )}
      </div>
    </div>
  )}
</div>


              
                <div className="relative group">
  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
    {studentName.charAt(0).toUpperCase()}
  </button>

  <div className="absolute right-0 top-full z-50 hidden w-48 pt-2 group-hover:block">
  <div className="rounded-xl border bg-white p-2 shadow-lg">
    <p className="px-3 py-2 text-sm font-semibold">
      {studentName}
    </p>

    <button
      onClick={() => setActivePage("Settings")}
      className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-violet-50"
    >
      Settings
    </button>

    <button
      onClick={handleLogout}
      className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
    >
      Logout
    </button>
  </div>
</div>
            </div>
</div>
          </header>
          {activePage === "Assessment" ? (
  <Assessment selectedCourse={assessmentCourse} />

  ) : activePage === "AI Tutor" ? (
  <AITutor />
) : activePage === "My Courses" && selectedCourse ? (
  <div className="space-y-6">
    <button
      onClick={() => setSelectedCourse(null)}
      className="rounded-xl bg-violet-50 px-4 py-2 font-semibold text-violet-700 hover:bg-violet-100"
    >
      ← Back to My Courses
    </button>

    <section className="rounded-2xl border bg-white p-6">
      <h2 className="text-2xl font-bold">{selectedCourse}</h2>

      <p className="mt-2 text-sm text-slate-500">
        Complete lessons to improve your course progress.
      </p>

      <div className="mt-5 flex justify-between">
        <span className="font-semibold">Course Progress</span>
        <span className="font-bold text-violet-600">
          {getCourseProgress(selectedCourse)}%
        </span>
      </div>

      <div className="mt-3 h-3 rounded-full bg-slate-100">
        <div
          className="h-3 rounded-full bg-violet-600 transition-all"
          style={{ width: `${getCourseProgress(selectedCourse)}%` }}
        />
      </div>


<div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
  <div className="rounded-xl bg-green-50 p-4">
    <p className="text-sm text-green-700">Completed</p>
    <h3 className="text-2xl font-bold text-green-700">
      {(completedLessons[selectedCourse] || []).length}
    </h3>
  </div>

  <div className="rounded-xl bg-orange-50 p-4">
    <p className="text-sm text-orange-700">Remaining</p>
    <h3 className="text-2xl font-bold text-orange-700">
      {courseDetails[selectedCourse].length -
        (completedLessons[selectedCourse] || []).length}
    </h3>
  </div>

  <div className="rounded-xl bg-violet-50 p-4">
    <p className="text-sm text-violet-700">Total Lessons</p>
    <h3 className="text-2xl font-bold text-violet-700">
      {courseDetails[selectedCourse].length}
    </h3>
  </div>
</div>

    </section>

    <section className="rounded-2xl border bg-white p-6">
      <h3 className="mb-5 text-lg font-bold">Course Lessons</h3>

      <div className="space-y-4">
        {courseDetails[selectedCourse].map((lesson, index) => (
          <div
  key={lesson}
  onClick={() => {
  setSelectedLesson(lesson);
  setLessonContentOpen(true);
}}
  className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
  (completedLessons[selectedCourse] || []).includes(lesson)
    ? "bg-green-50 border-green-300"
    : "bg-white hover:bg-violet-50"
}`}
>
            <input
              type="checkbox"
              checked={(completedLessons[selectedCourse] || []).includes(lesson)}
              onChange={() => toggleLessonComplete(selectedCourse, lesson)}
              className="h-5 w-5 accent-violet-600"
            />

            <span className="font-medium">
              {index + 1}. {lesson}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border bg-white p-6 mt-6">
  <h3 className="text-lg font-bold">
    Test Your Knowledge
  </h3>

  <p className="mt-2 text-slate-500">
    Complete an assessment to evaluate your understanding.
  </p>

  <button
    
  onClick={() => {
  localStorage.removeItem(
    `adaptiveLearningProgress_${selectedCourse}`
  );

  setAssessmentCourse(selectedCourse);
  localStorage.setItem("activeAssessmentCourse", selectedCourse);
  setSelectedCourse(null);
  setSelectedLesson(null);
  setLessonContentOpen(false);
  setActivePage("Assessment");
}}
    className="mt-4 rounded-xl bg-violet-600 px-6 py-3 text-white font-semibold hover:bg-violet-700 transition"
  >
    Start Assessment →
  </button>
</div>
    </section>
    
{lessonContentOpen && selectedLesson && (
  <section
  ref={lessonContentRef}
  className="rounded-2xl border bg-white p-6 space-y-6"
>
    <div>
      <button
        onClick={() => setLessonContentOpen(false)}
        className="mb-4 text-violet-600 font-semibold"
      >
        ← Back to Lessons
      </button>

      <h2 className="text-2xl font-bold text-slate-800">
        {lessonContentData[selectedLesson]?.heading || selectedLesson}
      </h2>
    </div>

    {lessonContentData[selectedLesson]?.sections?.map((section, index) => (
      <div key={index}>
        <h3 className="text-lg font-bold mb-2">{section.title}</h3>
        <p className="text-slate-600 leading-7">{section.content}</p>
      </div>
    ))}

    {lessonContentData[selectedLesson]?.code && (
      <div>
        <h3 className="font-bold mb-3">Practical Example</h3>
        <pre className="bg-slate-900 text-green-300 p-4 rounded-xl overflow-x-auto text-sm">
          <code>{lessonContentData[selectedLesson].code}</code>
        </pre>
      </div>
    )}

    
<button
  onClick={() => {
    toggleLessonComplete(selectedCourse, selectedLesson);
  }}
  className={`rounded-xl px-5 py-3 font-semibold transition-all duration-300 flex items-center gap-2 ${
    (completedLessons[selectedCourse] || []).includes(selectedLesson)
      ? "bg-green-100 text-green-700 border border-green-300"
      : "bg-violet-600 text-white hover:bg-violet-700 hover:scale-105"
  }`}
>
  {(completedLessons[selectedCourse] || []).includes(selectedLesson) ? (
    <>
      <span>✓</span>
      Completed
    </>
  ) : (
    <>
      <span>✓</span>
      Mark Complete
    </>
  )}
</button>


    <div className="flex justify-between gap-3">
  <button
    disabled={courseDetails[selectedCourse].indexOf(selectedLesson) === 0}
    onClick={() => {
      const lessons = courseDetails[selectedCourse];
      const index = lessons.indexOf(selectedLesson);
      setSelectedLesson(lessons[index - 1]);
    }}
    className="rounded-xl border px-5 py-3 disabled:opacity-40"
  >
    ← Previous
  </button>

  <button
    disabled={
      courseDetails[selectedCourse].indexOf(selectedLesson) ===
      courseDetails[selectedCourse].length - 1
    }
    onClick={() => {
      const lessons = courseDetails[selectedCourse];
      const index = lessons.indexOf(selectedLesson);
      setSelectedLesson(lessons[index + 1]);
    }}
    className="rounded-xl bg-violet-600 px-5 py-3 text-white disabled:opacity-40"
  >
    Next →
  </button>
</div>
  </section>
)}

  </div>
) : activePage === "My Courses" ? (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold">My Courses</h2>
      <p className="text-slate-500">
        Explore your enrolled learning courses.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      
{Object.keys(courseDetails).map((courseName) => {
  const progress = getCourseProgress(courseName);

  return (
    <div
      key={courseName}
      onClick={() => {
        setActivePage("My Courses");
        setSelectedCourse(courseName);
      }}
      className="bg-white border rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:border-violet-400 transition"
    >
      <h3 className="font-bold text-lg">{courseName}</h3>
      <p className="text-sm text-slate-500 mt-3">
        {progress}% completed
      </p>
      <div className="w-full bg-slate-100 rounded-full h-2 mt-3">
        <div
          className="bg-violet-600 h-2 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
})}

        
    </div>
  </div>
) : activePage === "My Progress" ? (

  <div className="space-y-6">

    <div>
      <h2 className="text-2xl font-bold text-slate-800">
        My Learning Progress
      </h2>
      <p className="text-slate-500 mt-1">
        Track your performance and learning journey.
      </p>
    </div>

    {/* Progress statistics */}
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">

      <div className="bg-white rounded-2xl border p-5">
        <p className="text-slate-500 text-sm">
          Total Assessments
        </p>
        <h3 className="text-3xl font-bold mt-3">
          {completedAssessments}
        </h3>
      </div>

      <div className="bg-white rounded-2xl border p-5">
        <p className="text-slate-500 text-sm">
          Average Score
        </p>
        <h3 className="text-3xl font-bold mt-3 text-violet-600">
          {averageScore}%
        </h3>
      </div>

      <div className="bg-white rounded-2xl border p-5">
        <p className="text-slate-500 text-sm">
          Best Score
        </p>
        <h3 className="text-3xl font-bold mt-3 text-emerald-600">
          {completedAssessments > 0
            ? Math.max(...assessmentHistory.map((record) => record.percentage))
            : 0}%
        </h3>
      </div>

    </section>

    {/* Topic-wise Performance */}
<section className="bg-white rounded-2xl border p-6">

  <h3 className="text-lg font-bold mb-2">
    Topic-wise Performance
  </h3>

  <p className="text-sm text-slate-500 mb-6">
    Track your accuracy in each learning topic.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

    {topicPerformance.map((item) => (

      <div key={item.topic}>

        <div className="flex justify-between mb-2">

          <span className="font-medium text-slate-700">
            {item.topic}
          </span>

          <span className="font-semibold text-violet-600">
            {item.percentage}%
          </span>

        </div>

        <div className="w-full bg-slate-100 rounded-full h-3">

          <div
            className="bg-violet-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${item.percentage}%` }}
          />

        </div>

        <p className="text-xs text-slate-400 mt-2">
          {item.correct} correct out of {item.total} questions
        </p>

      </div>

    ))}

  </div>

</section>

{/* Assessment Performance Trend */}
<section className="bg-white rounded-2xl border p-6">
  <h3 className="text-lg font-bold mb-2">
    Assessment Performance Trend
  </h3>

  <p className="text-sm text-slate-500 mb-6">
    Your scores across the last 7 assessments.
  </p>

  {recentAssessmentTrend.length === 0 ? (
    <p className="text-sm text-slate-500">
      Complete assessments to see your performance trend.
    </p>
  ) : (
    <div className="flex items-end gap-3 h-56 border-b border-slate-200 pb-2">
      {recentAssessmentTrend.map((record, index) => (
        <div
          key={record.id}
          className="flex-1 h-full flex flex-col items-center justify-end gap-2"
        >
          <span className="text-xs font-semibold text-violet-600">
            {record.percentage}%
          </span>

          <div
            className="w-full max-w-12 rounded-t-lg bg-violet-500 hover:bg-violet-700 transition-all"
            style={{
              height: `${Math.max(record.percentage, 3)}%`,
            }}
            title={`Assessment ${index + 1}: ${record.percentage}%`}
          />

          <span className="text-xs text-slate-500">
            {index + 1}
          </span>
        </div>
      ))}
    </div>
  )}
</section>


{/* Personalized Learning Path */}
<section className="bg-white rounded-2xl border p-6">

  <h3 className="text-lg font-bold mb-2">
    Your Personalized Learning Path
  </h3>

  <p className="text-sm text-slate-500 mb-6">
    Follow these steps to improve your weaker topics.
  </p>

  {learningPath.length === 0 ? (
    <p className="text-sm text-slate-500">
      Complete an assessment to generate your learning path.
    </p>
  ) : (
    <div className="space-y-5">

      {learningPath.map((item) => (
        <div
  key={item.topic}
  onClick={() => {
  const courseMap = {
    HTML: "HTML Fundamentals",
    CSS: "CSS Fundamentals",
    JavaScript: "JavaScript",
    React: "React Development",
  };

  const courseKey = courseMap[item.topic];

  if (!courseKey || !courseDetails[courseKey]) return;

  setSelectedCourse(courseKey);
  setSelectedLesson(null);
  setLessonContentOpen(false);
  setActivePage("My Courses");
}}
  className="flex gap-4 border-b border-slate-100 pb-5 last:border-0 cursor-pointer hover:bg-violet-50 rounded-lg transition-all"
>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
            {item.step}
          </div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-semibold">
                {item.topic}
              </h4>

              <span className="text-sm font-semibold text-violet-600">
                {item.percentage}%
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {item.action}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {item.priority} Priority
              </span>

              <span className="text-xs text-slate-400">
  <Clock3 size={14} className="inline mr-1" />
  {item.estimatedTime}
</span>
            </div>

          </div>
        </div>
      ))}

    </div>
  )}

</section>

{/* Assessment history */}
<section className="bg-white rounded-2xl border p-6">

  <h3 className="text-lg font-bold mb-5">
        Assessment History
      </h3>

      {assessmentHistory.length === 0 ? (
        <p className="text-slate-500">
          No assessments completed yet.
        </p>
      ) : (
        <div className="space-y-4">

          {[...assessmentHistory].reverse().map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4"
            >
              <div>
                <h4 className="font-semibold text-slate-800">
                  {record.type}
                </h4>

                <p className="text-sm text-slate-500">
                  {record.difficulty}
                  {record.challengeStage
                    ? ` - Challenge ${record.challengeStage}`
                    : ""}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  {new Date(record.completedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold text-lg text-violet-600">
                  {record.percentage}%
                </p>
                <p className="text-xs text-slate-500">
                  {record.score}/{record.totalQuestions} correct
                </p>
              </div>
            </div>
          ))}

        </div>
      )}

    </section>

  </div>


) : activePage === "Settings" ? (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold">Settings</h2>
      <p className="text-slate-500 mt-1">
        Manage your learning platform preferences.
      </p>
    </div>

    <section className="bg-white rounded-2xl border p-6 space-y-5">
      <h3 className="text-lg font-bold">Account Settings</h3>

      <div>
        <label className="block text-sm font-medium mb-2">
          Student Name
        </label>
        <input
  type="text"
  value={studentName}
  onChange={(e) => setStudentName(e.target.value)}
  className="w-full rounded-xl border p-3"
/>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Email Address
        </label>
        
        <input
  type="email"
  value={studentEmail}
  onChange={(e) => setStudentEmail(e.target.value)}
  placeholder="Enter your email"
  className="w-full rounded-xl border p-3"
/>
      </div>

      <button
  onClick={() => {
    localStorage.setItem("studentName", studentName);
    localStorage.setItem("studentEmail", studentEmail);
    alert("Profile saved successfully!");
  }}
  className="bg-violet-600 text-white px-6 py-3 rounded-xl hover:bg-violet-700"
>
  Save Profile
</button>




    </section>
  </div>
) : (
  <>
    {/* Welcome banner */}
          <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 to-indigo-600 p-7 text-white shadow-lg sm:p-9">

            <div className="max-w-xl">
              <p className="mb-3 text-sm text-violet-200">
                YOUR PERSONAL LEARNING SPACE
              </p>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Hello, {studentName} 👋
              </h2>

              <p className="mt-3 text-sm leading-6 text-violet-100">
                Every student learns differently. Your AI learning
                assistant is here to help you achieve your goals.
              </p>

              <button
                onClick={() => setActivePage("My Courses")}
                className="mt-6 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50"
              >
                Continue Learning <ArrowUpRight size={17} />
              </button>
            </div>

          </section>

          {/* Statistics */}
          <section className="mb-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {[
              {
                title: "Enrolled Courses",
                value: Object.keys(courseDetails).length,
                icon: BookOpen,
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                title: "Completed Lessons",
value: Object.values(completedLessons).reduce(
  (total, lessons) => total + lessons.length,
  0
),
                icon: ClipboardCheck,
                color: "text-emerald-600",
                bg: "bg-emerald-50",
              },
              {
                title: "Average Score",
                value: `${averageScore}%`,
                icon: Target,
                color: "text-violet-600",
                bg: "bg-violet-50",
              },
              {
                title: "Assessments Taken",
value: completedAssessments,
                icon: Flame,
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-500">
                      {stat.title}
                    </p>
                    <div className={`rounded-xl p-3 ${stat.bg}`}>
                      <Icon size={21} className={stat.color} />
                    </div>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold">
                    {stat.value}
                  </h3>
                </div>
              );
            })}

          </section>

          {/* Courses and recommendations */}
          <section className="grid grid-cols-1 gap-7 xl:grid-cols-3">

            <div className="xl:col-span-2">

              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">My Courses</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Continue where you left off
                  </p>
                </div>

                <button
                  onClick={() => setActivePage("My Courses")}
                  className="text-sm font-semibold text-violet-600"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">

                {courses.map((course) => {
  const progress = getCourseProgress(course.courseName);

  return (
                  <div
                    key={course.title}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                  >
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${course.bg}`}>
                      {course.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-400">
                        {course.category}
                      </p>
                      <h3 className="mt-1 font-semibold">
                        {course.title}
                      </h3>

                      <div className="mt-4 flex items-center justify-between text-xs">
                        <span className="text-slate-400">
                          Course Progress
                        </span>
                        <span className="font-semibold">
                          {progress}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className={`h-full rounded-full ${course.color}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
  setSelectedCourse(course.courseName);
  setActivePage("My Courses");
}}
                      className="flex items-center justify-center gap-2 rounded-xl bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-100"
                    >
                      <Play size={15} /> Continue
                    </button>

                  </div>
  );
})}

              </div>
            </div>

            {/* Recommendations */}
            <div>

              <div className="mb-5">
                <h2 className="text-lg font-bold">
                  AI Recommendations
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Personalized for your learning
                </p>
              </div>

              <div className="space-y-4">

                {dashboardRecommendations.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <Sparkles size={17} className="text-violet-600" />
                      <span className="text-xs font-semibold text-violet-600">
                        AI SUGGESTION
                      </span>
                    </div>

                    <h3 className="font-semibold">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.reason}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        {item.level}
                      </span>

                      <button
                        onClick={() => {
  const courseMap = {
    "CSS Practice": "CSS Fundamentals",
    "HTML Practice": "HTML Fundamentals",
    "React Practice": "React Development",
    "JavaScript Practice": "JavaScript",
  };

  const courseName = courseMap[item.title];

  if (courseName && courseDetails[courseName]) {
    setSelectedCourse(courseName);
    setSelectedLesson(null);
    setLessonContentOpen(false);
    setActivePage("My Courses");
  }
}}
                        className="text-sm font-semibold text-violet-600"
                      >
                        Explore <ChevronRight size={15} className="inline" />
                      </button>
                    </div>
                  </div>
                ))}

              </div>

              {/* Study time */}
              <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Clock3 size={20} />
                  <h3 className="font-semibold">Daily Study Goal</h3>
                </div>

                <p className="mt-3 text-2xl font-bold text-emerald-800">
                  {studyHours.toFixed(1)} / 2 Hours
                </p>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-emerald-100">
                  <div
  className="h-full rounded-full bg-emerald-500 transition-all duration-300"
  style={{ width: `${Math.min((studyHours / 2) * 100, 100)}%` }}
/>
                </div>
<button
  onClick={() => {
    const updated = Math.min(studyHours + 0.5, 2);
    setStudyHours(updated);
    localStorage.setItem("studyHours", updated);
  }}
  className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-white"
>
  + 30 Minutes
</button>
                <p className="mt-3 text-xs text-emerald-700">
                  {studyHours >= 2
  ? "Daily study goal completed! Excellent work!"
  : studyHours > 0
  ? "Good progress! Keep going!"
  : "Start studying to achieve your daily goal!"}
                </p>
              </div>

            </div>
          </section>

          <footer className="mt-10 border-t border-slate-200 py-6 text-center text-xs text-slate-400">
            © 2026 LearnAI – Personalized Learning Platform
          </footer>
          </>
              )}

        </main>
      </div>
    </div>
  )
  );
}

export default App;
