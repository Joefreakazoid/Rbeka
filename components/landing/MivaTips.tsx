const paperTips = [
  {
    number: "01",
    title: "Follow the submission format",
    tip: "Use the required font (typically Times New Roman 12pt or Arial 11pt), 1-inch margins, and double spacing unless stated otherwise in the course guide.",
  },
  {
    number: "02",
    title: "Cite every source",
    tip: "MIVA papers require proper referencing. Use APA 7th edition unless your module specifies otherwise. Every in-text citation must appear in your reference list.",
  },
  {
    number: "03",
    title: "Answer the question directly",
    tip: "Markers reward direct answers. State your argument in the introduction, support it in the body, and summarise in the conclusion. Avoid padding.",
  },
  {
    number: "04",
    title: "Submit before the deadline",
    tip: "Late submissions attract penalties. Upload your paper at least 24 hours early to avoid last-minute technical issues on the portal.",
  },
  {
    number: "05",
    title: "Use academic language",
    tip: "Avoid colloquialisms and first-person opinion statements like 'I think'. Instead write 'the evidence suggests' or 'this analysis indicates'.",
  },
  {
    number: "06",
    title: "Check plagiarism before submission",
    tip: "Run your paper through a plagiarism checker. MIVA uses similarity detection tools — aim for under 15% similarity on your report.",
  },
];

const studyTips = [
  {
    icon: "📚",
    title: "Use Rbeka to prep for exams",
    tip: "Ask Rbeka to summarise key concepts from your course notes before exams. It cites the exact document so you can go back to the source.",
  },
  {
    icon: "🗂️",
    title: "Organise by module",
    tip: "Upload notes per module so Rbeka can retrieve specific course content when you ask module-specific questions.",
  },
  {
    icon: "✍️",
    title: "Use it as a writing aid",
    tip: "Paste your paper topic into the chat and ask Rbeka to find relevant concepts from your notes to support your argument.",
  },
  {
    icon: "🔗",
    title: "Cross-reference your answers",
    tip: "Every Rbeka answer shows the source document. Always go back to the original notes to verify before including in your paper.",
  },
];

export default function MivaTips() {
  return (
    <section className="py-20 px-4 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto">

        {/* Paper Submission Tips */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              MIVA Paper Submissions
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Tips for Submitting Papers at MIVA
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Key things to know before you submit your next assignment or research paper.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paperTips.map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 hover:border-blue-200 hover:bg-blue-50/30 transition-all"
              >
                <span className="text-3xl font-black text-blue-100 block mb-3 leading-none">
                  {item.number}
                </span>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to use Rbeka tips */}
        <div>
          <div className="text-center mb-10">
            <span className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Study Smarter
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              How to Get the Most Out of Rbeka
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Make Rbeka work harder for your MIVA coursework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {studyTips.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 flex gap-4 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
