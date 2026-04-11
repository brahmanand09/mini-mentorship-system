import { useEffect, useState } from "react";
import { api } from "../api/axios";
import StudentCard from "../components/StudentCard";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";

export default function Dashboard() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState<any[]>([]);

  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [reviewText, setReviewText] = useState("");
  const [success, setSuccess] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchStudents();

    if (role === "student") {
      const studentId = localStorage.getItem("studentId");
      if (studentId) fetchReviews(studentId);
    }
  }, [role]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/students");
      setStudents(res.data.data || []);
    } catch (err: any) {
      setError("Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (studentId: string) => {
    try {
      const res = await api.get(`/reviews/${studentId}`);

      if (role === "student") {
        const studentId = localStorage.getItem("studentId");
        if (studentId) fetchReviews(studentId);
      }

      setReviews(res.data || []);
    } catch {
      setError("Failed to load your reviews");
    }
  };

  const openModal = (student: any) => {
    setSelectedStudent(student);
    setReviewText("");
    setSuccess("");
  };

  const submitReview = async () => {
    if (!reviewText.trim()) return;

    try {
      await api.post("/reviews", {
        studentId: selectedStudent.studentId,
        review: reviewText,
      });

      setSuccess("Review submitted successfully!");
      fetchStudents();
      setTimeout(() => {
        setSelectedStudent(null);
        setSuccess("");
      }, 1200);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit review");
    }
  };

  if (loading) return <Loader />;
  { error && <ErrorBox message={error} /> }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="role-badge">{role === "mentor" ? "Mentor View" : "Student View"}</p>
      </div>

      {/* Mentor View */}
      {role === "mentor" && (
        <>
          <div className="section-header">
            <h2>All Students</h2>
            <p>Review and guide your students</p>
          </div>

          <div className="students-grid">
            {students.map((student) => (
              <StudentCard
                key={student.studentId}
                student={student}
                onReview={openModal}
              />
            ))}
          </div>
        </>
      )}

      {/* Student View */}
      {role === "student" && (
        <>
          <div className="section-header">
            <h2>Your Reviews</h2>
            <p>Track your growth and mentor feedback</p>
          </div>

          {/* Progress Summary */}
          <div className="progress-cards">
            <div className="progress-card">
              <h3>Total Reviews</h3>
              <p>{reviews.length}</p>
            </div>

            <div className="progress-card">
              <h3>Latest Status</h3>
              <p>
                {reviews.length > 0 ? "Improving 📈" : "No Data"}
              </p>
            </div>
          </div>

          {/* Latest Review Highlight */}
          {reviews.length > 0 && (
            <div className="latest-review">
              <h3>Latest Review</h3>
              <p>{reviews[0].review}</p>

              {reviews[0].aiSummary && (
                <div className="ai-summary">
                  <strong>AI Summary</strong>
                  <pre>{reviews[0].aiSummary}</pre>
                </div>
              )}
            </div>
          )}

          <div className="reviews-container">
            {reviews.length === 0 ? (
              <div className="empty-state">
                <p>No reviews yet. Your mentor will review your progress soon.</p>
              </div>
            ) : (
              reviews.map((review: any) => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <p className="review-text"><strong>Feedback:</strong> {review.review}</p>

                  {review.aiSummary && (
                    <div className="ai-summary">
                      <strong>AI Summary</strong>
                      <pre>{review.aiSummary}</pre>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Review Modal */}
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Review for {selectedStudent.name}</h3>
              <button className="close-btn" onClick={() => setSelectedStudent(null)}>
                ✕
              </button>
            </div>

            {success && <p className="success-message">{success}</p>}

            <textarea
              placeholder="Write your detailed review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={6}
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setSelectedStudent(null)}>
                Cancel
              </button>
              <button
                className="submit-btn"
                onClick={submitReview}
                disabled={!reviewText.trim()}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}