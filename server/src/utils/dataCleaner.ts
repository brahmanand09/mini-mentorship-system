export const cleanStudents = (data: any) => {
  const unique = new Map();

  data.students.forEach((student: any) => {
    if (!unique.has(student.id)) {

      // Standardize date
      const rawDate =
        student.created_at ||
        student.createdAt ||
        new Date();

      const formattedDate = new Date(rawDate);

      unique.set(student.id, {
        studentId: student.id,
        name: student.name?.trim(),
        email: student.email?.toLowerCase(),
        createdAt: formattedDate,
        status: student.status || "active"
      });
    }
  });

  return Array.from(unique.values());
};