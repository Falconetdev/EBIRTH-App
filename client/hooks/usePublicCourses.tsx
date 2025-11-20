import { useEffect, useState } from 'react';
import type { PublicCourse } from '@shared/api';
import { fetchPublicCourses } from '@/lib/publicCourses';

interface UsePublicCoursesResult {
  data: PublicCourse[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePublicCourses(): UsePublicCoursesResult {
  const [data, setData] = useState<PublicCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchPublicCourses(controller.signal)
      .then((courses) => {
        setData(courses);
      })
      .catch((e: unknown) => {
        if ((e as any).name === 'AbortError') return;
        setError(e instanceof Error ? e.message : 'Unknown error');
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  };

  useEffect(() => {
    const cleanup = load();
    return cleanup;
  }, []);

  return {
    data,
    loading,
    error,
    refetch: load,
  };
}
