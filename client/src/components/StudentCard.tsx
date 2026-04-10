export default function StudentCard({ student, onReview }: any) {
  return (
    <div className="student-card">
      <div className="card-header">
        <h3>{student.name}</h3>
        <span className={`status-badge ${student.status?.toLowerCase()}`}>
          {student.status || "Active"}
        </span>
      </div>

      <p className="email">{student.email}</p>

      {onReview && (
        <button 
          className="review-btn"
          onClick={() => onReview(student)}
        >
          Submit Review
        </button>
      )}
    </div>
  );
}