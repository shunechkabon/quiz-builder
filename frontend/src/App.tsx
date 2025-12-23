import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import QuizCreationPage from './pages/QuizCreationPage/QuizCreationPage';
import QuizListPage from './pages/QuizListPage/QuizListPage';
import QuizDetailPage from './pages/QuizDetailPage/QuizDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/quizzes" replace />} />
        <Route path="create" element={<QuizCreationPage />} />
        <Route path="quizzes" element={<QuizListPage />} />
        <Route path="quizzes/:id" element={<QuizDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
